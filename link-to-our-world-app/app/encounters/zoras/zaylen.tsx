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
            <SceneFocus asset="zaylen" label="Zaylen" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ `The Water Temple is locked.`, `You will need to see Nerali, the Captain of the Bridge.` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
