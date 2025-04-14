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
        resolveEncounter('hebra/intro', {});
        router.push('/map');
    }

    return (
        <Scene>
            <SceneFocus asset="lumina" />
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [`${playerName}, before you are the formidable Hebra Peaks. These grand mountains glisten with a the slippery sheen of ice.`],
                    [`Unfortunately, it is impossible for us to scale the steep cliffs before us on foot.`]
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
