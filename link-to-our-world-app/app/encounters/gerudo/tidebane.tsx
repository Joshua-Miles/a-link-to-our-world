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
        resolveEncounter('gerudo/tidebane', {});
        router.push('/map');
    }

    if (isLoading(playerName)) {
        return null
    }

    return (
        <Scene>
            <SceneFocus asset="tidebane" label="Tidebane" />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`Arrr, what be the odds of crossin' paths with ye here, me ol' pal ${playerName}!`, {
                    'What are you doing here?': dialog(`Arrr, word on the waves be that a plot brews to topple Gerudo Town, and I sailed from Lurelin to warn Princess Ravia o' the treachery. But now they be refusin' me entry past the city gates, the scallywags! if ye be chattin' with the Gerudo, mind puttin' in a good word for me?`, {
                        'Of course!': dialog('Thank ye, matey!'),
                        'I\'ll try...': dialog('Thank ye, matey!'),
                    }),
                    'Crazy! See you around...': dialog(`Arrr, take care and don't let the sharks bite, ye landlubber!`)
                })}
                onFinished={(selecitons) => {
                    if (selecitons.pop() === 'Crazy! See you around...') {
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
