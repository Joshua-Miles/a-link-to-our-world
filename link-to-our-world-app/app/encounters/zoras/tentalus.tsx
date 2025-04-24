import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

import { Answer1C } from "../faron/tavon";
import { isAnyFailure } from "@triframe/ambassador";

export default function () {
    const playerName = usePlayerName();

    const tavon = useResult(getEncounter, 'faron/tavon')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'letsFightHimTogether',
        'combat',
        'thankYou'
    ])

    function handleFinished() {
        resolveEncounter('zoras/tentalus', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(tavon) || isAnyFailure(tavon)) {
        return null;
    }

    const answer1C = (tavon.state as any).answer1C as Answer1C;

    const beBetter: Record<Answer1C, string> = {
        "Something could happen to the Kokiri while you're reading": "resist our analytical nature and be decisive when necessary.",
        "Tavon will know more about what's going on than the books": "organize quickly, without having to deliberate at length when time was of the essence.",
        "Sometimes you can learn more by seeing than reading": "put down our books and enage actively in the well being of Hyrule."
    }

    return (
        <Scene>
            <Soundtrack asset="zoras-battle" />
            <Soundtrack isPlaying={sequence.hasReached('thankYou')} asset="zoras" /> 
            {!sequence.isAt('combat') && <SceneFocus asset={sequence.hasReached('thankYou') ? 'sorai' : 'tentalus'} label={sequence.hasReached('thankYou') ? undefined: "Tentalus"} /> }
            <SpeechCard
                hasStarted={sequence.hasReached('letsFightHimTogether')}
                asset="sorai-avatar"
                text={[ 
                    `It appears we've arrived just in time.`,
                    `Let's strike down this fell beast together, ${playerName}.`,
                    `Zora, attack!` 
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') &&
                <Combat
                    asset="tentalus"
                    fortitude={75}
                    damage={2}
                    speed={4000}
                    onFinished={sequence.next}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYou')}
                groups={[
                    [ `Thank you, ${playerName}.`, `Hearing the story of Scribeleaf helped our tribe to ${beBetter[answer1C]}.`, `Is there anything I can do for you in return?`],
                    [ `...the key to The Water Temple?`, `Absolutely. Nerali, give him the key.`],
                    [ `Now you should be able to enter the temple.`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
