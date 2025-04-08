import { resolveEncounter } from "api";
import { Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
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