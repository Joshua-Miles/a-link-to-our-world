import { Audio, AVPlaybackSource, AVPlaybackStatus } from 'expo-av';
import { createContext, ReactNode, useContext, useRef, useEffect } from "react";
import { crossFade, Fade, fadeIn, fadeOut } from "./Fade";
import { Assets } from "./Assets";

type PlayOptions = {
    offset?: number
    loop?: boolean
    resume?: boolean
    onFinished?: () => any
}

class SoundtrackPlayer {
    private stack: Audio.Sound[] = [];
    private players: Map<AVPlaybackSource, Audio.Sound> = new Map();

    private currentPlayer: Audio.Sound | null = null;
    private currentFade: Fade | null = null;

    get cursor() {
        return this.stack.length > 0 ? this.stack.length -1 : null;
    }

    async push(source: AVPlaybackSource, fadeDuration: number = 1500, options?: PlayOptions) {
        const newPlayer = await this.getPlayer(source, fadeDuration);
        if (newPlayer === this.currentPlayer) return;

        this.stack.push(newPlayer);
        await this.play(newPlayer, fadeDuration, options)
    }

    async replace(source: AVPlaybackSource, fadeDuration: number = 1500, options?: PlayOptions){
        const newPlayer = await this.getPlayer(source, fadeDuration);
        if (newPlayer === this.currentPlayer) return;

        const cursor = this.cursor;
        if (cursor !== null) this.stack[cursor] = newPlayer;
        else this.stack.push(newPlayer);

        await this.play(newPlayer, fadeDuration, options);
    }

    async pause(source: AVPlaybackSource, fadeDuration: number = 1500) {
        const targetPlayer = await this.getPlayer(source);
        this.stack = this.stack.filter( player => player !== targetPlayer);
        if (targetPlayer !== this.currentPlayer) return;
        this.currentFade = fadeOut(targetPlayer, fadeDuration)
        this.currentPlayer = null;
    }

    private async play(newPlayer: Audio.Sound, fadeDuration: number, options?: PlayOptions) {
        this.currentFade?.abort();

        const oldPlayer = this.currentPlayer;

        const handleTrackEnd = (status: AVPlaybackStatus) => {
            if (!status.isLoaded) return;

            if (status.didJustFinish) {
                options?.onFinished?.()
            }
            if ((status.didJustFinish) && (this.currentPlayer === newPlayer || this.currentPlayer === null)) {
                this.currentPlayer = null;
                this.stack.pop();
                const cursor = this.cursor;
                if (cursor !== null) {
                    const previousTrack = this.stack[cursor];
                    this.play(previousTrack, fadeDuration, { resume: true })
                }
            }
        }

        newPlayer.setOnPlaybackStatusUpdate(handleTrackEnd)

        if (options?.loop) newPlayer.setIsLoopingAsync(true)

        if (!options?.resume) {
            // Make sure this works
            if (options?.offset) await newPlayer.setPositionAsync(options.offset * 1000);
            else newPlayer.setPositionAsync(0)
        }

        if (!oldPlayer) {
            if (fadeDuration) this.currentFade = fadeIn(newPlayer, fadeDuration)
            else {
                newPlayer.setVolumeAsync(1);
                newPlayer.playAsync()
            }
        } else {
            if (fadeDuration) this.currentFade = crossFade(oldPlayer, newPlayer, fadeDuration);
            else {
                oldPlayer.pauseAsync()
                newPlayer.setVolumeAsync(1);
                newPlayer.playAsync()
            }
        }

        this.currentPlayer = newPlayer;
    }

    async getPlayer(source: AVPlaybackSource, fadeDuration: number = 1500) {
        if (!this.players.has(source)) {
            const { sound: newPlayer } = await Audio.Sound.createAsync(source);
            // const newPlayer = createAudio.Sound(source);
            this.players.set(source, newPlayer)
        }
        return this.players.get(source) as Audio.Sound;
    }

    releaseAllPlayers() {
        this.currentFade?.abort();
        this.players.forEach(player => player.unloadAsync());
        this.players = new Map();
    }
}

const SoundtrackContext = createContext<SoundtrackPlayer | null>(null);

type SoundtrackProviderProps = {
    children: ReactNode
    preload?: string[]
}

export function SoundtrackProvider({ children, preload = [] }: SoundtrackProviderProps) {
    const { current: player } = useRef(new SoundtrackPlayer());

    useEffect(() => {
        for (let track of preload) {
            player.getPlayer(Assets[track])
        }
        // return () => {
        //     if (!__DEV__) {
        //         player.releaseAllPlayers();
        //     }
        // }
    }, [])

    return (
        <SoundtrackContext.Provider value={player}>
            {children}
        </SoundtrackContext.Provider>
    )
}

export function useSoundtrackPlayer() {
    const soundtrackPlayer = useContext(SoundtrackContext);
    if (soundtrackPlayer === null) throw Error('Cannot call useSoundtrackPlayer outside of SoundtrackProvider');
    return soundtrackPlayer;
}


export type SoundtrackProps = PlayOptions & {
    asset: string;
    push?: boolean;
    isPlaying?: boolean;
    loop?: boolean
    fadeDuration?: number
}

export function Soundtrack({ asset, push = false, isPlaying = true, fadeDuration = 1500, ...playOptions }: SoundtrackProps) {
    const player = useSoundtrackPlayer();

    const wasPlaying = useRef(false);

    if (playOptions.loop === undefined && !push) playOptions.loop = true

    useEffect(() => {
        if (isPlaying) {
            wasPlaying.current = true;
            if (push) {
                player.push(Assets[asset], fadeDuration, playOptions)
            } else {
                player.replace(Assets[asset], fadeDuration, playOptions)
            }
        } else if (wasPlaying.current && !push) {
            player.pause(Assets[asset], fadeDuration)
        }
    }, [ isPlaying, asset ])

    return null;
}
