import { resolveEncounter } from "api";
import { Scene, SceneFocus, SongPlayer, Soundtrack, SpeechCard, SpeechStepper, useSequence } from "shared";
import { dragonRootTheme } from "shared";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'playing',
        'thankYou',
        'toTheSoil'
    ])

    function handleFinished() {
        resolveEncounter('lurelin/lullaby', {})
        router.push('/map')
    }

    const song = dragonRootTheme;

    return (
        <Scene>
            <Soundtrack asset="lurelin" isPlaying={sequnece.hasNotReached('playing')} />
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
                    song={dragonRootTheme}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('playing') && <>
                <SceneFocus asset="grinroot" />
                <SpeechStepper
                    groups={[[ 'I think I can sleep now.' ]]}
                    hasStarted={sequnece.hasReached('thankYou')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('toTheSoil')}
                    asset="lumina-avatar"
                    text={[ "There is good soil to plant Grinroot nearby, I've marked the location on your map." ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}