import { resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'welcome',
        'betTheyHaveBooks',
        'letsFindTavon'
    ])

    function handleFinished() {
        resolveEncounter('faron/intro', {})
        router.push('/map')
    }

    return (
        <Scene>
            <SceneFocus asset={sequence.has({ passed: 'welcome', notReached: 'letsFindTavon' }) ? 'scribeleaf' : 'lumina'} />
            <SpeechStepper
                hasStarted={sequence.hasReached('welcome')}
                onFinished={sequence.next}
                groups={[[
                    `${playerName}, welcome to Faron Woods. These lush woods were the first thing to be played into existence by the goddess; they are vast, and home to friend and foes alike, including the Kokiri, appointed scribes of the goddess.`
                ]]}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('betTheyHaveBooks')}
                onFinished={sequence.next}
                groups={[[
                    `Oooh- I bet they have so many books!`
                ]]}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('letsFindTavon')}
                onFinished={sequence.next}
                groups={[[
                    `We should find Tavon, the Kokiri leader, to see if he knows where we should plant a Korok seedling.`
                ]]}
            />
        </Scene>
    )
}