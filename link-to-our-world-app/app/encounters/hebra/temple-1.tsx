import { isAnyFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { resolveEncounter } from "api";
import { Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'theTempleShouldBeHere',
        'theLloronsNormallyClearThisSnow',
        'iSuggest'
    ])

    function handleFinished() {
        resolveEncounter('hebra/temple-1', {})
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="snowball" />
            <SpeechCard
                hasStarted={sequence.hasReached('theTempleShouldBeHere')}
                asset="lumina-avatar"
                text={[ 
                    'How strange- my readings indicate that the entrance to the Ice Temple should be at this exact location...',
                    `${playerName}, I fear that the entrance to the temple must be under a blanket of snow.`
                 ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('theLloronsNormallyClearThisSnow')}
                asset="kyllis-avatar"
                text={[
                    `Come to think of it, the snow is much too deep for this time of year.`,
                    `The Llorons normally clear snow from the mountains during the summer.`,
                    `I wonder why they've let it build so much...`
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('iSuggest')}
                asset="lumina-avatar"
                text={[
                    `${playerName}, I suggest that we visit the Lloron Den to seek assistance in clearing the snow.`
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
