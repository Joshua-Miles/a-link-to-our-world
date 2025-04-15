import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro'
    ])

    const tidebane = useResult(getEncounter, 'gerudo/tidebane')

    function handleFinished() {
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(tidebane) || isAnyFailure(tidebane)) {
        return null;
    }

    const responses: Record<string, DialogNode> = {
        'Have a good day!': dialog('Sav\'orq!'),
    }

    if (tidebane && tidebane.resolved) {
        responses['Why won\'t you let Tidebane in?'] = dialog(`I am under orders from Princess Ravia not to let Pirates in, bzrrrt.`)
    }

    return (
        <Scene>
            <SceneFocus asset="robot" label="GD-100" />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`Vasaaq! I am the guard of Gerudo bridge. Please note that Voe are not permitted within the city limits past 3pm.`, responses)}
                onFinished={(selections) => {
                    if (selections.pop() === 'Have a good day!') {
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
