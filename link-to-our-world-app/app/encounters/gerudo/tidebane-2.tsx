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
            <SceneFocus asset="tidebane" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [`Arr, I hope me travels haven't been in  vain I do...`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
