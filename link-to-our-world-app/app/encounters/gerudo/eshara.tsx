import { useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
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
            <SceneFocus asset="eshara" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ `The Lightning Temple is locked.`, `You will need to see Princess Ravia for entry.` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
