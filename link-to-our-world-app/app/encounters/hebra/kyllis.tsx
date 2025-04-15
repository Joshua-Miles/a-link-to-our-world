import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'marked'
    ])

    function handleFinished() {
        resolveEncounter('hebra/kyllis', {})
        router.push('/map');
    }

    if (isLoading(playerName)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="kyllis" label="Kyllis" />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`${playerName}! Good Winds! It's lovely to see you again. What brings you out here?`, {
                    'I need to scale Hebra Peak': dialog(`That would be difficult on foot- can I give you a lift?`, {
                        'Yes please': dialog(`Alright, let's be off!`),
                        'No thank you': dialog(`Let me know if you change you're mind!`)
                    }),
                    'I need to get to the Ice Temple': dialog(`That's high up in the hebra mountains- you'll never make it on foot. Can I give you a lift?`, {
                        'Yes please': dialog(`Alright, let's be off!`),
                        'No thank you': dialog(`Let me know if you change you're mind!`)
                    })
                })}
                onFinished={(selections) => {
                    const lastSelection = selections.pop();
                    if (lastSelection === 'No thank you') {
                        router.push('/map')
                    } else {
                        sequence.next()
                    }
                }}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('marked')}
                asset="lumina-avatar"
                text={[ 'I have marked the location of the Ice Temple on your map' ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
