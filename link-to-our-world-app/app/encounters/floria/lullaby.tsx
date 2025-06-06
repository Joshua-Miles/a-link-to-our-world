import { resolveEncounter } from "api";
import { Scene, SceneFocus, SongPlayer, Soundtrack, SpeechCard, SpeechStepper, useSequence } from "shared";
import { fairyTheme } from "shared";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'playing',
        'thankYou',
        'toTheSoil'
    ])

    function handleFinished() {
        resolveEncounter('floria/lullaby', {})
        router.push('/map')
    }

    const song = fairyTheme;

    return (
        <Scene>
            <Soundtrack asset="floria" isPlaying={sequnece.hasNotReached('playing')}/>
            <Soundtrack isPlaying={sequnece.hasPassed('playing')} asset={song.src} offset={song.offset} fadeDuration={1000} />
            {sequnece.isAt('intro') && <>
                <SceneFocus asset="lumina" />
                <SpeechStepper
                    groups={[[ 'Are you ready to play?' ]]}
                    hasStarted={sequnece.hasReached('intro')}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('playing') && <>
                <SongPlayer
                    song={song}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('playing') && <>
                <SceneFocus asset="fayflutter" />
                <SpeechStepper
                    groups={[[ 'I think I can sleep now.' ]]}
                    hasStarted={sequnece.hasReached('thankYou')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('toTheSoil')}
                    asset="lumina-avatar"
                    text={[ "There is good soil to plant Fayflutter nearby, I've marked the location on your map." ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}