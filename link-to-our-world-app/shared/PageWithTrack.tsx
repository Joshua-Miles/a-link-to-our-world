import { Page } from 'designer-m3';
import { useAudioPlayer } from 'expo-audio';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { Assets } from './Assets';
import { fadeIn, fadeOut } from './Fade';

type PageWithTrackProps = {
    asset: string
    offset?: number
    isPlaying?: boolean
    fadeInDuration?: number;
    fadeOutDuration?: number;
    children: ReactNode
}

export function PageWithTrack({ asset,  offset = 0, isPlaying = true, fadeInDuration = 0, fadeOutDuration = 500, children }: PageWithTrackProps) {
    const trackPlayer = useAudioPlayer(Assets[asset]);
    const isPlayingRef = useRef(false)

    useEffect(() => {
        if (isPlaying && !trackPlayer.playing) {
            isPlayingRef.current = true;
            trackPlayer.seekTo(offset)
            if (fadeInDuration) {
                trackPlayer.volume = 0;
                trackPlayer.play()
                fadeIn(trackPlayer, fadeInDuration);
            }
            else trackPlayer.play();
            trackPlayer.addListener('playbackStatusUpdate', ({ didJustFinish }) => {
                if (didJustFinish) {
                    isPlayingRef.current = false;
                }
            })
        }
        if (!isPlaying && trackPlayer.playing) {
            isPlayingRef.current = false;
            if (fadeOutDuration) {
                fadeOut(trackPlayer, fadeOutDuration);
            }
            else trackPlayer.pause();
        }
    }, [ isPlaying ])

    function fadeOutTrack() {
        fadeOut(trackPlayer, fadeOutDuration)
    }

    function resumeTrack() {
        if (isPlayingRef.current) trackPlayer.play()
    }

    return (
        <Page navTransitionOutDuration={fadeOutDuration + 10} onBeforeNavigate={fadeOutTrack}>
            <TrackContext.Provider value={{ resumeTrack }}>
                {children}
            </TrackContext.Provider>
        </Page>
    )
}

type TrackContext = {
    resumeTrack: () => void
}

const TrackContext = createContext<TrackContext>({ resumeTrack: () => 0 });

export function usePageTrack() {
    return useContext(TrackContext)
}
