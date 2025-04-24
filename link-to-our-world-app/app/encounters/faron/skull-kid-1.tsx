import { resolveEncounter } from "api";
import { Combat, SceneFocus, Soundtrack, SpeechCard, usePlayerName, useSequence } from "shared";
import { Column } from "designer-m3";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'whoIsThat',
        'iHaveNoIdea',
        'combat',
        'heDisappeared',
        'myNameIsScribeleaf',
        'iHaveABook',
        'iWouldLoveTo',
    ])

    function handleFinished() {
        resolveEncounter('faron/skull-kid-1', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            <Soundtrack asset="skull-kids-theme-clipped"/>
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus asset="skull-kid" />
                <SpeechCard
                    hasStarted={sequnece.hasReached('whoIsThat')}
                    asset="scribeleaf"
                    text={[ `Who is that?!` ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('iHaveNoIdea')}
                    asset="tavon-avatar"
                    text={[ 
                        `I have no idea! But I've read about that dark reed flute he is holding...`,
                        `Quick ${playerName}, let's fight him together!`
                    ]}
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
                    hasStarted={sequnece.hasReached('heDisappeared')}
                    asset="tavon-avatar"
                    text={[ 
                        `He disappeared...`,
                        `But I still hear the song, coming from up ahead. Seedling, I'm sorry, what was your name?`
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('myNameIsScribeleaf')}
                    asset="scribeleaf"
                    text={[ 
                        `My name is Scribeleaf.`,
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('iHaveABook')}
                    asset="tavon-avatar"
                    text={[ 
                        `Scribeleaf, I happen to have the book where I remember reading about that dark reed flute- would you mind reading it while we walk?`,
                    ]}
                    onFinished={sequnece.next}
                />
                 <SpeechCard
                    hasStarted={sequnece.hasReached('iWouldLoveTo')}
                    asset="scribeleaf"
                    text={[ 
                        `I would love to!`,
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Column>
    )
}