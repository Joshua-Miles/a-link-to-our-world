import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, ItemGet, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";
import { Answer1A } from "../lurelin/intro";

export default function () {
    const playerName = usePlayerName();

    const intro = useResult(getEncounter, 'lurelin/intro')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet',
        'seeYouAround'
    ])

    function handleFinished() {
        resolveEncounter('eldin/bouldan', {});
        router.push('/map');
    }

    if (isLoading(playerName)) {
        return null
    }

    if (isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1A = (intro.state as any).answer1A as Answer1A;

    const chiefDarvok = `Chief Darvok is the youngest chief in Goron history, and he's been digging faster and deeper into Death Mountain than any past chief to prove his stout. Has me a little worried...`

    const wouldYouDoMeAFavor = `Would you do me a favor? Would you bring this milk to Darvok if you get the chance? Maybe it will calm him.`

    const imWorried: Record<Answer1A, string> = {
        "It's dangerous to go alone": `Darvok is leading a small squad a ways ahead of the rest of the tribe- I'm worried he'll get himself hurt, without support. ${wouldYouDoMeAFavor}`,
        "You should look before running into new areas": `Darvok isn't always as observant as he should be... I wish he would pause and WATCH before running into things sometimes. ${wouldYouDoMeAFavor}`,
        "We need you to keep us safe": `Darvok is leading a small squad a ways ahead of the rest of the tribe- I'm worried the rest of the tribe may get in trouble without him there to lead them. ${wouldYouDoMeAFavor}`
    }

    const responses: Record<string, DialogNode> = {};
    responses['Where is everybody?'] = dialog(`Everyone is down at the mines delving. ${chiefDarvok}`, {
        'Why?': dialog(imWorried[answer1A], {
            "I'll try!": dialog('Thank you.')
        })
    });
    responses['Its so quiet...'] = dialog(`Yep, that would be because everyone is down at the mines delving. ${chiefDarvok}`, {
        'Why?': dialog(imWorried[answer1A], {
            "I'll try!": dialog('Thank you.')
        })
    })
    responses[`I'm looking for the Fire Temple`] = dialog(`That's a ways up the mountain- but to get into the temple, you'll need to get the key from Chief Darvok.`, {
        'Where is Chief Darvok?': dialog(`Down at the mines. ${chiefDarvok}`, {
            'Why?': dialog(imWorried[answer1A], {
                "I'll try!": dialog('Thank you.')
            })
        }),
        'Thanks for the tip!': dialog(`You're welcome.`, responses)
    });

    return (
        <Scene>
            <SceneFocus asset="bouldan" />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`Hey there, Goro.`, responses)}
                onFinished={sequence.next}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset="milk"
                title="Milk"
                description="A cold treat for Darvok"
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('seeYouAround')}
                groups={[
                    [`See you around, Goro!`]
                ]}
                onFinished={sequence.next}
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
