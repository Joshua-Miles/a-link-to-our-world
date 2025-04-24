import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro'
    ])

    function handleFinished() {
        resolveEncounter('gerudo/intro', {});
        router.push('/map');
    }

    if (isLoading(playerName)) {
        return null
    }

    return (
        <Scene>
            <SceneFocus asset="lumina" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [`${playerName}, welcome to Gerudo Desert. These sweeping dunes are buzzing an electric hum.`],
                    [`I have marked the location of the Lightning Temple on your map.`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}

/**

useResult(getEncounter, 'x/x')

<Dialog 
    hasStarted={sequence.hasReached('x')}
    tree={dialog('x')}
    onFinished={sequence.next}
/>

<SpeechStepper
    hasStarted={sequence.hasReached('x')}
    groups={[
        [ 'x' ]
    ]}
    onFinished={sequence.next}
/>

<SpeechCard
    hasStarted={sequence.hasReached('x')}
    text={[ 
        'x'
    ]}
    onFinished={sequence.next}
/>

*/
