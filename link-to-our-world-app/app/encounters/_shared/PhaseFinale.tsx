import { isAnyFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { Scene, SceneFocus, SpeechCard, usePlayerName, useSequence } from "app/shared";

export type PhaseFinaleProps = {
    hasStarted: boolean
    onFinished: () => any
}

export function PhaseFinale({ hasStarted, onFinished }: PhaseFinaleProps) {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted, onFinished }, [
        'iSense',
        'finally',
        'combat',
        'glitch',
        'soIShallPlayMyOwn',
        'skullKidsTheme',
        'itAppears',
        'skullKidsTheme2',
        'leadingTheKoroksAstray',
        'outro'
    ])

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <>
            {/* <SceneFocus asset="x" /> */}
            <SpeechCard
                hasStarted={sequence.hasReached('iSense')}
                asset="lumina-avatar"
                text={[`I sense an enemy rapidly approaching `]}
                onFinished={sequence.next}
            />
        </>
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
