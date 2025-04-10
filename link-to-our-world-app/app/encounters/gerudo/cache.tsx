import { useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, ItemGet, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'wellDone',
        'thankYouAgain',
        'itemGet',
        'hopeToSeeYouAround'
    ])

    function handleFinished() {
        resolveEncounter('gerudo/cache', {});
        router.push('/map');
    }

    return (
        <Scene>
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('intro')}
                groups={[['Did you find the cache?']]}
                onFinished={sequence.next}
            />
            {sequence.hasPassed('intro') && <SceneFocus asset={sequence.isAt('wellDone') ? 'lumina' : 'ravia'} />}
            <SpeechStepper
                hasStarted={sequence.hasReached('wellDone')}
                groups={[
                    [`Well done, ${playerName}, watering this korok seedling. The Lightning Temple is secure.`]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYouAgain')}
                groups={[
                    [`${playerName}! Wait!`, `I just talked to the Gerudo council, and we agreed that we wanted to give you a parting gift, before you continued on your travels.`]
                ]}
                onFinished={sequence.next}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset="lightning-sword"
                title="Lightning Sword"
                description="Deals extra damage to lightning foes"
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('hopeToSeeYouAround')}
                groups={[
                    [`I pray we'll meet again, ${playerName}.`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
