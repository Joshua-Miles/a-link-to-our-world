import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";
import { isAnyFailure } from "@triframe/ambassador";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'letsFightHimTogether',
        'combat',
        'thankYou'
    ])

    function handleFinished() {
        resolveEncounter('hebra/frostus', {});
        router.push('/map');
    }

    const focus = sequence.select({
        intro: 'snowball',
        letsFightHimTogether: 'frostus',
        combat: undefined,
        thankYou: 'yulma'
    })

    const label = sequence.select({
        intro: undefined,
        letsFightHimTogether: 'Frostus',
        combat: undefined,
        thankYou: undefined
    })

    return (
        <Scene>
            {focus && <SceneFocus asset={focus} label={label ?? undefined} /> }
            <SpeechCard
                hasStarted={sequence.hasReached('intro')}
                asset="yulma-avatar"
                text={[ 
                    `Alright Llorons, we'll have this mountain clear of snow lickety-split.`,
                    `Let's all pound the ice on 3...`,
                    `1...`,
                    `2...`,
                    `3!`
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('letsFightHimTogether')}
                asset="yulma-avatar"
                text={[ 
                    `WOAH!`,
                    `What is that thing?`,
                    `It must have been hiding under the snow...`,
                    `Ow, it's throwing snowballs at us!`,
                    `Quick ${playerName}, let's fight it together.`
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') &&
                <Combat
                    asset="frostus"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequence.next}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYou')}
                groups={[
                    [ `I think that snow monster is what brought the early cold...`, `If we had hibernated, who knows if we ever would have woken up!` ],
                    [ `Thank you, Friendo.`, `Hearing the story of Fayflutter helped us to muster the energy to keep working.`],
                    [ `Is there anything I can do for you in return?`, `...Clear a path to the Ice Temple?`, `Absolutely, Eskra, Thurnok, go clear a path for our Friendo please.`],
                    [ `Now you should be able to enter the temple.`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
