import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro'
    ])

    const bouldan = useResult(getEncounter, 'eldin/bouldan')

    function handleFinished() {
        resolveEncounter('eldin/mines', {})
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(bouldan) || isAnyFailure(bouldan)) {
        return null;
    }

    const responses: Record<string, DialogNode> = {
        'I want to talk to the Goron tribe leader': dialog('Sorry bud, but we Gorons are too busy delving into the mines to let you interrupt our dig.'),
    }

    if (bouldan && bouldan.resolved) {
        responses[`I'm bringing Darvok some milk.`] = dialog(`Well, in that case, I guess you can go goro.`)
    }

    return (
        <Scene>
            <SceneFocus asset="kragan" />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`Hold up goro! What business brings you to the mines?`, responses)}
                onFinished={(selections) => {
                    if (selections.pop() === 'I want to talk to the Goron tribe leader') {
                        router.push('/map')
                    } else {
                        sequence.next()
                    }
                }}
            />
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
