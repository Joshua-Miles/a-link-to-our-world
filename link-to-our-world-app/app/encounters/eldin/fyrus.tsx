import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

import { Answer1A } from "../lurelin/intro";
import { isAnyFailure } from "@triframe/ambassador";

export default function () {
    const playerName = usePlayerName();

    const intro = useResult(getEncounter, 'lurelin/intro')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'letsFightHimTogether',
        'combat',
        'thankYou'
    ])

    function handleFinished() {
        resolveEncounter('eldin/fyrus', {});
        router.push('/map');
    }

    if (isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1A = (intro.state as any).answer1A as Answer1A;

    const weMadeIt: Record<Answer1A, string> = {
        "It's dangerous to go alone": `Oh my gosh ${playerName}! It looks like our digging awakened a Fyrus- we rejoined the tribe in the nick of time; we'll need them for support.`,
        "You should look before running into new areas": "If we had delved any futher, we would have been gonners Goro!",
        "We need you to keep us safe": `Oh my gosh ${playerName!} It looks like our digging awakened a Fyrus, and now it's attacking the tribe. It looks like we got here just in time to save them!`
    }

    return (
        <Scene>
            <Soundtrack asset="eldin-battle" />
            <Soundtrack isPlaying={sequence.hasReached('thankYou')} asset="eldin" />
            {!sequence.isAt('combat') && <SceneFocus asset={sequence.hasReached('thankYou') ? 'darvok' : 'fyrus'} label={sequence.hasReached('thankYou') ? undefined: "Fyrus"} /> }
            <SpeechCard
                hasStarted={sequence.hasReached('letsFightHimTogether')}
                asset="darvok-avatar"
                text={[ 
                    weMadeIt[answer1A],
                    `This is gonna be one tough rock to pound... Let's take him out together, Goro!` 
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') &&
                <Combat
                    asset="fyrus"
                    fortitude={50}
                    damage={2}
                    speed={2000}
                    onFinished={sequence.next}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYou')}
                groups={[
                    [ `Thank you, Goro.`, `Hearing the story of Grinroot helped me to better serve my tribe.`, `Is there anything I can do for you in return?`],
                    [ `...the key to The Fire Temple?`, `Absolutely, here, take it.`],
                    [ `Now you should be able to enter the temple.`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
