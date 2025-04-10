import { isLoading, useResult } from "@triframe/utils-react";
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

    if (isLoading(playerName)) {
        return null
    }

    return (
        <Scene>
            <SceneFocus asset="bouldan" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [`Please bring the milk to Darvok when you get a chance...`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
