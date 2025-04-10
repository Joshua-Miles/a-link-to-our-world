import { useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro'
    ])

    function handleFinished() {
        router.push('/map');
    }

    return (
        <Scene>
            <SceneFocus asset="lodron" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ `The Fire Temple is locked.`, `You will need to see Chief Darvok for entry.` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
