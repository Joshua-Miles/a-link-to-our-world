import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, mainTheme, Scene, SceneFocus, SongPlayer, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'song',
        'doYouReallyThink'
    ])

    function handleFinished() {
        resolveEncounter('finale/intro', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <Scene>
            {!sequence.isAt('song') && <SceneFocus asset="impa" />}
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[[ `${playerName}! Gorruk has returned, and from the heart of the grove, where the goddess played the world into existence, he has led astray the Koroks!`, `I fear all is lost...` ]]}
                onFinished={sequence.next}
            />
            {sequence.isAt('song') &&
                <SongPlayer
                    song={mainTheme}
                    onFinished={sequence.next}
                />
            }
            <Soundtrack 
                isPlaying={sequence.hasReached('doYouReallyThink')}
                asset="eclipse-of-the-world"
                offset={118}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('doYouReallyThink')}
                groups={[
                    [ 
                        `Why...`,
                        `the goddess flute-`,
                        `do you really think?`,
                        `Could you bring back the Koroks by playing it?`
                    ],
                    [
                        `You would have to play from the heart of the grove...`,
                        `...and there are hordes of monsters between here and there.`,
                        `But it may be our only hope.`
                    ],
                    [
                        `Go, ${playerName}! `,
                        `And may Hylia be with you... `
                    ]
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
