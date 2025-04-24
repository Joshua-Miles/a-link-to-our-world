import { resolveEncounter } from "api";
import { Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'impa',
        'lumina'
    ])

    function handleFinished() {
        resolveEncounter('interlude/intro', {})
        router.push('/map')
    }

    return (
        <Scene>
            <Soundtrack asset="gorruk-theme-2" />
            <SceneFocus asset="lumina" />
            <SpeechCard
                hasStarted={sequence.hasReached('impa')}
                asset="impa-avatar"
                text={[ 'Ahhhhh!', `${playerName}, hury!` ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('lumina')}
                onFinished={handleFinished}
                groups={[[
                    `It sounds like Impa is in trouble!`,
                    `Quickly, to the heart of the grove!`
                ]]}
            />
        </Scene>
    )
}