import { AudioPlayer, AudioSource, createAudioPlayer } from "expo-audio";
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
    private stack: AudioPlayer[] = [];
    private players: Map<AudioSource, AudioPlayer> = new Map();

    private currentPlayer: AudioPlayer | null = null;
    private currentFade: Fade | null = null;

    get cursor() {
        return this.stack.length > 0 ? this.stack.length -1 : null;
    }

    push(source: AudioSource, fadeDuration: number = 1500, options?: PlayOptions) {
        const newPlayer = this.getPlayer(source, fadeDuration);
        if (newPlayer === this.currentPlayer) return;

        this.stack.push(newPlayer);
        this.play(newPlayer, fadeDuration, options)
    }

    replace(source: AudioSource, fadeDuration: number = 1500, options?: PlayOptions){
        const newPlayer = this.getPlayer(source, fadeDuration);
        if (newPlayer === this.currentPlayer) return;

        const cursor = this.cursor;
        if (cursor !== null) this.stack[cursor] = newPlayer;
        else this.stack.push(newPlayer);

        this.play(newPlayer, fadeDuration, options);
    }

    pause(source: AudioSource, fadeDuration: number = 1500) {
        const targetPlayer = this.getPlayer(source);
        this.stack = this.stack.filter( player => player !== targetPlayer);
        if (targetPlayer !== this.currentPlayer) return;
        this.currentFade = fadeOut(targetPlayer, fadeDuration)
        this.currentPlayer = null;
    }

    private play(newPlayer: AudioPlayer, fadeDuration: number, options?: PlayOptions) {
        this.currentFade?.abort();

        const oldPlayer = this.currentPlayer;

        function handleTrackEnd({ didJustFinish }: { didJustFinish: boolean }) {
            if (didJustFinish) {
                options?.onFinished?.()
                if (options?.loop) {
                    newPlayer.seekTo(0)
                    newPlayer.play()
                }
            }
        }

        newPlayer.addListener('playbackStatusUpdate', handleTrackEnd)


        if (!options?.resume) {
            if (options?.offset) newPlayer.seekTo(options.offset);
            else newPlayer.seekTo(0)
        }

        if (!oldPlayer) {
            if (fadeDuration) this.currentFade = fadeIn(newPlayer, fadeDuration)
            else {
                newPlayer.volume = 1;
                newPlayer.play()
            }
        } else {
            if (fadeDuration) this.currentFade = crossFade(oldPlayer, newPlayer, fadeDuration);
            else {
                oldPlayer.pause()
                newPlayer.volume = 1;
                newPlayer.play()
            }
        }

        this.currentPlayer = newPlayer;
    }

    getPlayer(source: AudioSource, fadeDuration: number = 1500) {
        if (!this.players.has(source)) {
            const newPlayer = createAudioPlayer(source);
            this.players.set(source, newPlayer)
            newPlayer.addListener('playbackStatusUpdate', ({ didJustFinish }) => {
                if ((didJustFinish || newPlayer.paused) && (this.currentPlayer === newPlayer || this.currentPlayer === null)) {
                    this.currentPlayer = null;
                    this.stack.pop();
                    const cursor = this.cursor;
                    if (cursor !== null) {
                        const previousTrack = this.stack[cursor];
                        this.play(previousTrack, fadeDuration, { resume: true })
                    }
                }
            })
        }
        return this.players.get(source) as AudioPlayer;
    }

    releaseAllPlayers() {
        this.currentFade?.abort();
        this.players.forEach(player => player.release());
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
        return () => {
            if (!__DEV__) {
                player.releaseAllPlayers();
            }
        }
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
