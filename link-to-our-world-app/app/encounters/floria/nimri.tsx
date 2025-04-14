import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, useSequence } from "app/shared";
import { router } from "expo-router";
import { Answer1B } from "./intro";
import { isLoading, useResult } from "@triframe/utils-react";
import { isAnyFailure } from "@triframe/ambassador";

export default function () {

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'nimrisIntro',
        'iLikeYourDress',
        'thankYou',
        'imFayflutter',
        'niceToMeetYou',
        'bogDobber',
        'ohDear',
        'weShouldGo',
        'yourRight'
    ])

    function handleFinished() {
        resolveEncounter('floria/nimri', {})
        router.push('/map')
    }

    const intro = useResult(getEncounter, 'floria/intro');

     if (isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1B = (intro.state as any).answer1B as Answer1B;

    const weShouldGo: Record<Answer1B, string> = {
        "We have a job to do": "That's our job!",
        "We should see if the Faries need help ": "But what if the bog-dobber hurts some other Faries?",
        "If we work a little more now, then we can rest ": "We should address the bog-dobber first, then we can talk some more."
    }

    const youreRight: Record<Answer1B, string> = {
        "We have a job to do": "You're right, Fayflutter.",
        "We should see if the Faries need help ": "That would be terrible! You're right, Fayflutter.",
        "If we work a little more now, then we can rest ": "You're right Fayflutter, we should take care of the bog-dobber first."
    }

    return (
        <Scene>
            <SceneFocus asset={!sequence.isAt('bogDobber') ? "nimri" : 'bog-dobber'} />
            <Dialog
                tree={dialog('Oh, greetings to you, kind soul! I am Nimri, at your service! And who might you be, fluttering through this realm?', {
                    'We\'re on a mission from the goddess': dialog(`Oh- I haven't heard of the goddess in a very long time. How nice!`),
                    "We're on an adventure": dialog("How magnificent!", ),
                    "We're out for a stroll": dialog("Oh, what a lovely day for a stroll...")
                })}
                hasStarted={sequence.hasReached('nimrisIntro')}
                onFinished={sequence.next}
            />
            <SpeechCard 
                hasStarted={sequence.hasReached('iLikeYourDress')}
                asset="fayflutter"
                text={['I like your dress!']}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYou')}
                groups={[[ 'Thank you!', `What's your name?` ]]}
                onFinished={sequence.next}
            />
            <SpeechCard 
                hasStarted={sequence.hasReached('imFayflutter')}
                asset="fayflutter"
                text={[`I'm Fayflutter`]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('niceToMeetYou')}
                groups={[[ `It's nice to meet you Fayflutter-` ]]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('bogDobber')}
                groups={[[ `Bragggghhhhhhh!` ]]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('ohDear')}
                groups={[[ `Oh dear! It looks like the far side of the fountain has drawn the attention of a Bog-Dobber! We're much too busy talking, but I hope SOMEONE is able to deal with that...` ]]}
                onFinished={sequence.next}
            />
            <SpeechCard 
                hasStarted={sequence.hasReached('weShouldGo')}
                asset="fayflutter"
                text={[weShouldGo[answer1B]]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('yourRight')}
                groups={[[ youreRight[answer1B] ], [ `Let's go see what we can do!` ]]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}