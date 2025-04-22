import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, useSequence } from "shared";
import { usePlayerName } from "shared";
import { router } from "expo-router";
import { useState } from "react";

export default function() {
    const playerName = usePlayerName();
    const [state, setState] = useState<string[]>([]);

    const gorruk1 = useResult(getEncounter, 'intro/gorruk');

    const sequence = useSequence({ hasStarted: true, onFinished: handleSequenceEnd }, [
        'getAwayFromMe',
        'notGoingToHurtYou',
        'doYouStillWant',
        'combat',
        'iWillMasterTheForces',
        'thankYouForDrivingHimAway',
    ])

    function handleSequenceEnd() {
        router.push('/map')
        resolveEncounter('interlude/gorruk', state)
    }

    if (isLoading(gorruk1) || isAnyFailure(gorruk1)) {
        return null;
    }

    const gorruk1Responses = gorruk1.state as string[];

    const doYouStillWant = gorruk1Responses.includes('With pleasure')
        ? `is it STILL your pleasure to cross blades with me?`
        : `are you STILL hesitant to cross blades with me?`

    return (
        <Scene>
            <Soundtrack asset="gorruk-theme-2" />
            {sequence.hasNotReached('combat') &&
                <>
                    <SceneFocus asset="gorruk" />                       
                    <SpeechCard
                        hasStarted={sequence.hasReached('getAwayFromMe')}
                        asset="impa-avatar"
                        text={[ 'Get away from me, you foul creature!' ]}
                        onFinished={sequence.next}
                    />
                    <SpeechStepper
                        hasStarted={sequence.hasReached('notGoingToHurtYou')}
                        groups={[[ `I'm not going to hurt you, ma'am- I just want a second chance at the Hylian.`, `What is your name, anyway?` ]]}
                        onFinished={sequence.next}
                    />
                    <Dialog
                        hasStarted={sequence.hasReached('doYouStillWant')}
                        tree={dialog(`${playerName}? Well, ${playerName}, ${doYouStillWant}`, {
                            'I never wanted to fight you, Gorruk': dialog(`Then you shouldn't have questioned my abilities as a warrior, or threatened the land I've claimed for my tribe. Face me!`),
                            'Why do you keep asking for trouble? ': dialog(`I AM the strongest warrior in the land. I WILL protect the land I've claimed for my tribe. Face me!`)
                        })}
                        onFinished={selections => {
                            setState(selections)
                            sequence.next()
                        }}
                    />
                </>
            }
            {sequence.isAt('combat') && 
                <>
                    <Combat 
                        asset='gorruk'
                        speed={3000}
                        damage={1}
                        fortitude={10}
                        onFinished={sequence.next}
                    />
                </>
            }
            {sequence.hasPassed('combat') && 
                <>
                    <SceneFocus asset={sequence.hasNotPassed('iWillMasterTheForces') ? "gorruk" : 'impa'} />
                    <SpeechStepper
                        hasStarted={sequence.hasReached('iWillMasterTheForces')}
                        groups={[
                            [
                                'You...',
                                `That's not fair...`,
                                `I can get stronger...`,
                                `I WILL get stronger...`,
                                `I will master the forces of Hyrule, and then you're going DOWN`
                            ]
                        ]}
                        onFinished={sequence.next}
                    />
                    <SpeechStepper
                        hasStarted={sequence.hasReached('thankYouForDrivingHimAway')}
                        groups={[
                            [`Thank you for driving him away again. That Boarblin can't seem to learn his lesson.`],
                            [`I fear that his quest to rival you, and lay claim to the Sacred Grove has put him at odds with the restoration of Hyrule.`],
                            [
                                `It sounds as if he intends to master the 4 primal forces of Hyrule:`,
                                `Water`,
                                `Fire`,
                                `Ice`,
                                `Lightning`
                            ],
                            [
                                `Each force dwells within it's own temple, which are spread across Hyrule.`
                            ],
                            [
                                `Come with me, there is something I must show you... `
                            ]
                        ]}
                        onFinished={sequence.next}
                    />
                </>
            }
        </Scene>
    )
}
