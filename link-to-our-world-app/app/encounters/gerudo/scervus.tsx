import { useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'thereHeBe',
        'letsFightHimTogether',
        'combat',
        'thankYou'
    ])

    function handleFinished() {
        resolveEncounter('gerudo/scervus', {});
        router.push('/map');
    }

    return (
        <Scene>
            {!sequence.isAt('combat') && <SceneFocus asset={sequence.hasReached('thankYou') ? 'ravia' : 'scervus'} label={sequence.hasReached('thankYou') ? undefined: "Scervus"} /> }
            <SpeechCard
                hasStarted={sequence.hasReached('thereHeBe')}
                asset="tidebane-avatar"
                text={[
                    `There he be- GD-SCERVUS...`,
                    `...a cursed contraption of me own bloodline's makin'—an ancient bot with treason in its code plottin' to bring down yer rule!`
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('letsFightHimTogether')}
                asset="ravia-avatar"
                text={[ `I can't believe it! Let's fight him together, ${playerName}.` ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') &&
                <Combat
                    asset="scervus"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequence.next}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYou')}
                groups={[
                    [ `Thank you, Tidebane!`, `With Scervus defeated, the rebellion is no longer a threat.` ],
                    [ `And thank you, ${playerName}.`, `Hearing the story of Tumbleweed helped me to better protect my kingdom.`, `Is there anything I can do for you in return?`],
                    [ `...the key to The Lightning Temple?`, `Absolutely, here, take it.`],
                    [ `Now you should be able to enter the temple.`]
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
