import { resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";
import { useState } from "react";

export type Answer1B =
    | "We have a job to do"
    | "We should see if the Faries need help "
    | "If we work a little more now, then we can rest "

export default function () {
    const playerName = usePlayerName();

    const [answer1B, setAnswer1B] = useState<string>('')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'welcome',
        'iWillStayHere',
        'dontRun',
        'whyNot?',
        'letsFindTidebane'
    ])

    function handleFinished() {
        resolveEncounter('floria/intro', { answer1B })
        router.push('/map')
    }

    const answer1BOptions: Record<Answer1B, DialogNode> = {
        'We have a job to do': dialog('Oh, I\'m sorry!'),
        'We should see if the Faries need help ': dialog('Oh, I\'m sorry!'),
        'If we work a little more now, then we can rest ': dialog('Oh, I\'m sorry!')
    }

    return (
        <Scene>
            <SceneFocus asset={sequence.has({ passed: 'welcome', notReached: 'letsFindTidebane' }) ? 'fayflutter' : 'lumina'} />
            <SpeechStepper
                hasStarted={sequence.hasReached('welcome')}
                onFinished={sequence.next}
                groups={[[
                    `${playerName}, welcome to Floria Springs. This beautiful, well-tended green space is home to the fay-kind, which is to say fairies.`
                ]]}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('iWillStayHere')}
                onFinished={sequence.next}
                groups={[[
                    `It's soooo pretty.... I'm just going to stay here. You can keep going if you want... `
                ]]}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('dontRun')}
                onFinished={sequence.next}
                asset="lumina-avatar"
                text={[ `Fayflutter, you can't just stay here on the outskirts of the garden!` ] }
            />
            <Dialog
                hasStarted={sequence.hasReached('whyNot?')}
                onFinished={([ selection ]) => {
                    setAnswer1B(selection)
                    sequence.next();
                }}
                tree={dialog('Why not?', answer1BOptions)}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('letsFindTidebane')}
                onFinished={sequence.next}
                groups={[[
                    `We should find Nimri- she is the most observant of the Faries, she will know where to safely plant a Korok seedling.`
                ]]}
            />
        </Scene>
    )
}