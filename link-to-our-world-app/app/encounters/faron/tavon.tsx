import { resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { useState } from "react";

export type Answer1C =
    | "Something could happen to the Kokiri while you're reading"
    | "Tavon will know more about what's going on than the books"
    | "Sometimes you can learn more by seeing than reading"

export default function () {
    const playerName = usePlayerName();

    const [answer1C, setAnswer1C] = useState<string>('')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'sorryToBeRude',
        'thereAreSoManyBooks',
        'weCantStayHere',
        'whyNot?',
        'letsGo'
    ])

    function handleFinished() {
        resolveEncounter('faron/tavon', { answer1C })
        router.push('/map')
    }

    const answer1COptions: Record<Answer1C, DialogNode> = {
        "Something could happen to the Kokiri while you're reading": dialog(`Oh, I'm sorry `),
        "Tavon will know more about what's going on than the books": dialog(`Oh, I'm sorry `),
        "Sometimes you can learn more by seeing than reading": dialog(`Oh, I'm sorry `)
    }

    return (
        <Scene>
            <SceneFocus asset={sequence.has({ passed: 'sorryToBeRude', notReached: 'letsGo' }) ? 'scribeleaf' : 'tavon'} />
            <SpeechStepper
                hasStarted={sequence.hasReached('sorryToBeRude')}
                onFinished={sequence.next}
                groups={[[
                    `Ho! I'm sorry to be rude, but I don't have time to chat today.`,
                    `I'm afraid that many of my fellow Kokiri have disappeared, and I must travel deeper into the woods to find them.`
                ]]}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thereAreSoManyBooks')}
                onFinished={sequence.next}
                groups={[[
                    `There are so many books in your treehouse!`,
                    `I'm going to stay here, and see if one of these books can tell us why the Kokiri have been disappearing.`
                ]]}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('weCantStayHere')}
                onFinished={sequence.next}
                asset="lumina-avatar"
                text={[ `Scribeleaf, we need to go into the woods to find the Kokiri, we can't stay here and read to help them!` ] }
            />
            <Dialog
                hasStarted={sequence.hasReached('whyNot?')}
                onFinished={([ selection ]) => {
                    setAnswer1C(selection)
                    sequence.next();
                }}
                tree={dialog('Why not?', answer1COptions)}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('letsGo')}
                onFinished={sequence.next}
                groups={[[
                    `You're going to help me retrieve the Kokiri? Thank you!`,
                    `The Kokiri started disappearing when a strange song was heard coming through the forest...`,
                    `I was going to follow where the sound is coming from, if you would like to join?`
                ]]}
            />
        </Scene>
    )
}