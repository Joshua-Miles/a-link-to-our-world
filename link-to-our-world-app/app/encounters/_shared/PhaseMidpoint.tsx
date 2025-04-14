import { isAnyFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { Scene, SceneFocus, usePlayerName, useSequence } from "app/shared";

export type PhaseMidpointProps = {
    hasStarted: boolean
    onFinished: () => any
}

export function PhaseMidpoint ({ hasStarted, onFinished }: PhaseMidpointProps) {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted, onFinished }, [
        'intro'
    ])

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="x" />
            {/*  */}
        </Scene>
    )
}

/**

useResult(getEncounter, 'x/x')

<Dialog 
    hasStarted={sequence.hasReached('intro')}
    tree={dialog(`x`)}
    onFinished={sequence.next}
/>

<SpeechStepper
    hasStarted={sequence.hasReached('intro')}
    groups={[
        [ `x` ]
    ]}
    onFinished={sequence.next}
/>

<SpeechCard
    hasStarted={sequence.hasReached('intro')}
    text={[ 
        `x`
    ]}
    onFinished={sequence.next}
/>

*/
