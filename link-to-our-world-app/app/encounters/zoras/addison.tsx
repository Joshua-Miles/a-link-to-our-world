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
            <SceneFocus asset="addison" label="Addison" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ `Hi! I'm Addison.`, `My dad and I came from our small village because a big scary whirlpool appeared in the lake nearby.` ],
                    [ `My dad thought that the Zoras would come help...`, `...But he's been in their court an awful long time.` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
