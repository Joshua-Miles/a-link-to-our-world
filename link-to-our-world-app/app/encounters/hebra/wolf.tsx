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
            <SceneFocus asset="wolf" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ `Normally I would hunt much higher in the Hebra Mountains this time of year...`, 'But right now, there\'s WAY too much snow...' ],
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
