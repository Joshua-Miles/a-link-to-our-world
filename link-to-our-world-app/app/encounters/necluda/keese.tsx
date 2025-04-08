import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Scene, SceneFocus, SpeechCard, SpeechStepper, useSequence } from "app/shared";
import { router } from "expo-router";
import { Answer1D } from "./kyllis";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'squeakSqueak',
        'ignoreTheKeese',
        'weShouldListenToTheKeese',
        'doNotGoInTheCave',
        'thankYouMrKeese',
        'squeakSqueakSqueak',
        'iGuessWellGoTheLongWay'
    ])

    function handleFinished() {
        resolveEncounter('necluda/keese', {})
        router.push('/map')
    }

    const kyllis = useResult(getEncounter, 'necluda/kyllis');

    if (isLoading(kyllis) || isAnyFailure(kyllis)) {
        return null;
    }

    const answer1D = (kyllis.state as any).answer1D as Answer1D;  
    
    const ignoreTheKeese: Record<Answer1D, string> = {
        "The goddess made them": "Ugh! A Keese.",
        "People who are different have different strengths": "I don't care what a Keese has to say, sorry friends, I'll get us back underway.",
        "Just because someone's different doesn't mean you should be scared of them": "Ahhhh! A Keese!"
    }

    const weShouldListenToTheKeese: Record<Answer1D, string> = {
        "The goddess made them": "The goddess still made that Keese- it isn't attacking us, maybe we should listen to it? ",
        "People who are different have different strengths": "The Keese might know something about the cave we're headed for- maybe we should listen to it? ",
        "Just because someone's different doesn't mean you should be scared of them": "You don't have to be afraid of it Kyllis, the Keese isn't attacking us- maybe we should listen to it?"
    }

    return (
        <Scene>
            <SceneFocus asset="keese" />
            <SpeechStepper
                hasStarted={sequnece.hasReached('squeakSqueak')}
                groups={[[`Squeak! Squeak!`]]}
                onFinished={sequnece.next}
            />
            <SpeechCard
                hasStarted={sequnece.hasReached('ignoreTheKeese')}
                asset="kyllis-avatar"
                text={[ ignoreTheKeese[answer1D] ]}
                onFinished={sequnece.next}
            />
           <SpeechCard
                hasStarted={sequnece.hasReached('weShouldListenToTheKeese')}
                asset="tumblebreeze"
                text={[ weShouldListenToTheKeese[answer1D] ]}
                onFinished={sequnece.next}
            />
            <SpeechStepper
                hasStarted={sequnece.hasReached('doNotGoInTheCave')}
                groups={[ [`Squeak squeak! Don't go in the cave, squeak squeak!`] ]}
                onFinished={sequnece.next}
            />
            <SpeechCard
                hasStarted={sequnece.hasReached('thankYouMrKeese')}
                asset="tumblebreeze"
                text={[ 'I think we should listen to him. Thank you, Mr. Keese!' ]}
                onFinished={sequnece.next}
            />
            <SpeechStepper
                hasStarted={sequnece.hasReached('squeakSqueakSqueak')}
                groups={[ [`Squeak squeak-squeak!`] ]}
                onFinished={sequnece.next}
            />
            <SpeechCard
                hasStarted={sequnece.hasReached('iGuessWellGoTheLongWay')}
                asset="kyllis-avatar"
                text={[ `Well... fine... I guess we'll go the long way.` ]}
                onFinished={sequnece.next}
            />
        </Scene>
    )
}