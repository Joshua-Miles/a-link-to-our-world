import { resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { useState } from "react";

export type Answer1A =
    | "It\'s dangerous to go alone"
    | "You should look before running into new areas"
    | "We need you to keep us safe"

export default function () {
    const playerName = usePlayerName();

    const [answer1A, setAnswer1A] = useState<string>('')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'welcome',
        'iLoveTheBeach',
        'dontRun',
        'whyNot?',
        'letsFindTidebane'
    ])

    function handleFinished() {
        resolveEncounter('lurelin/intro', { answer1A })
        router.push('/map')
    }

    const answer1AOptions: Record<Answer1A, DialogNode> = {
        'It\'s dangerous to go alone': dialog('Oh, I\'m sorry!'),
        'You should look before running into new areas': dialog('Oh, I\'m sorry!'),
        'We need you to keep us safe': dialog('Oh, I\'m sorry!')
    }

    return (
        <Scene>
            <SceneFocus asset={sequence.has({ passed: 'welcome', notReached: 'letsFindTidebane' }) ? 'grinroot' : 'lumina'} />
            <SpeechStepper
                hasStarted={sequence.hasReached('welcome')}
                onFinished={sequence.next}
                groups={[[
                    `${playerName}, welcome to Lurelin beach. This rugged coastline is notorious for sea-beasts and piracy.`
                ]]}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('iLoveTheBeach')}
                onFinished={sequence.next}
                groups={[[
                    'I LOVE THE BEACH...'
                ]]}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('dontRun')}
                onFinished={sequence.next}
                asset="lumina-avatar"
                text={[ 'Grinroot, don\'t go running off on your own!'] }
            />
            <Dialog
                hasStarted={sequence.hasReached('whyNot?')}
                onFinished={([ selection ]) => {
                    setAnswer1A(selection)
                    sequence.next();
                }}
                tree={dialog('Why not?', answer1AOptions)}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('letsFindTidebane')}
                onFinished={sequence.next}
                groups={[[
                    'We should find Tidebane- he\'s an infamous and well-traveled pirate;  he will know where to safely plant a Korok seedling.'
                ]]}
            />
        </Scene>
    )
}