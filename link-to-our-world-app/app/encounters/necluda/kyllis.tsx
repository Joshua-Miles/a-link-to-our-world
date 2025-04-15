import { resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, useSequence } from "shared";
import { router } from "expo-router";
import { useState } from "react";

export type Answer1D =
    | "The goddess made them"
    | "People who are different have different strengths"
    | "Just because someone's different doesn't mean you should be scared of them"

export default function () {
    const [answer1D, setAnswer1D] = useState<string>('')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'goodWinds',
        'hesWeird',
        'youShouldntThinkLess',
        'whyNot?',
        'thereIsAShortcut'
    ])

    function handleFinished() {
        resolveEncounter('necluda/kyllis', { answer1D })
        router.push('/map')
    }

    const answer1DOptions: Record<Answer1D, DialogNode> = {
        "The goddess made them": dialog(`Oh, I'm sorry`),
        "People who are different have different strengths": dialog(`Oh, I'm sorry`),
        "Just because someone's different doesn't mean you should be scared of them": dialog(`Oh, I'm sorry`)
    }

    return (
        <Scene>
            <SceneFocus asset={sequence.has({ reached: 'hesWeird', notPassed: 'whyNot?'}) ? 'tumblebreeze' : 'kyllis'} />
            <Dialog
                hasStarted={sequence.hasReached('goodWinds')}
                tree={dialog(`Good Winds! I am Kyllis, leader of the Rito of Necluda. How may I be of service?`, {
                    'We are looking for a good place to plant a seedling': dialog(`Ah, I happen to have seen an excellent spot to plant a seedling, not two weeks ago, a ways up the cliff face. I would be happy to fly you there, if you like?`),
                    'nevermind': dialog(`See you around!`)
                })}
                onFinished={(selections) => {
                    if (selections.pop() === 'nevermind') {
                        router.push('/')
                    }
                    sequence.next();
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('hesWeird')}
                onFinished={sequence.next}
                groups={[ [`I don't want to fly with this bird man- he's weird!`] ] }
            />
            <SpeechCard
                hasStarted={sequence.hasReached('youShouldntThinkLess')}
                onFinished={sequence.next}
                asset="lumina-avatar"
                text={[ `Tumblebreeze, you shouldn't think less of someone just because they're different from you!` ] }
            />
            <Dialog
                hasStarted={sequence.hasReached('whyNot?')}
                tree={dialog('Why not?', answer1DOptions)}
                onFinished={([ selection ]) => {
                    setAnswer1D(selection)
                    sequence.next();
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thereIsAShortcut')}
                onFinished={sequence.next}
                groups={[[
                    `There's a shortcut through a cave just a little further up the cliff- we'll head there first.`
                ]]}
            />
        </Scene>
    )
}