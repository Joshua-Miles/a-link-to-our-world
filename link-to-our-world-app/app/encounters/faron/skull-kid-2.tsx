import { resolveEncounter } from "api";
import { Combat, Scene, SceneFocus, SpeechCard, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();
    
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'thereHeIsAgain',
        'combat',
        'heDisappearedAgain',
        'itIsTheDemonFlute'
    ])

    function handleFinished() {
        resolveEncounter('faron/skull-kid-2', {})
        router.push('/map')
    }

    return (
        <Scene>
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus asset="skull-kid" />
                <SpeechCard
                    hasStarted={sequnece.hasReached('thereHeIsAgain')}
                    asset="tavon"
                    text={[ `There he is again! Let's go ${playerName}!` ]}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="skull-kid"
                    fortitude={10}
                    damage={2}
                    speed={10000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('combat') && <>
                <SpeechCard
                    hasStarted={sequnece.hasReached('heDisappearedAgain')}
                    asset="tavon"
                    text={[ 
                        `Ugh, he disappeared again, but I still hear him up ahead.`,
                        `Have you read anything about that flute yet, Scribeleaf?`
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('itIsTheDemonFlute')}
                    asset="scribeleaf"
                    text={[ 
                        `It is said that these woods were the first thing to be played into existence by the goddess.`,
                        `Before the rest of the world sprung to life, a beast of the forest had fashioned a competing instrument to the goddess flute, and used it to lure all kinds of creatures away to himself...`,
                        `It's called the demon flute. It sounds SO scary!`
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}