import { useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, ItemGet, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";
import { PhaseEvents } from "../_shared";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'wellDone',
        'thankYouAgain',
        'itemGet',
        'hopeToSeeYouAround',
        'phaseEvents'
    ])

    function handleFinished() {
        resolveEncounter('hebra/cache', {});
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
            {sequence.hasPassed('intro') && <SceneFocus asset={sequence.isAt('wellDone') ? 'lumina' : 'yulma'} />}
            <SpeechStepper
                hasStarted={sequence.hasReached('wellDone')}
                groups={[
                    [`Well done, ${playerName}, watering this korok seedling. The Ice Temple is secure.`]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYouAgain')}
                groups={[
                    [`${playerName}! Wait!`, `I just talked to the rest of the Lloron pack, and we agreed that we wanted to give you a parting gift, before you continued on your travels.`]
                ]}
                onFinished={sequence.next}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset="ice-sword"
                title="Ice Sword"
                description="Deals extra damage to ice foes"
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('hopeToSeeYouAround')}
                groups={[
                    [`Hope to see you around, Friendo.`]
                ]}
                onFinished={sequence.next}
            />
            <PhaseEvents hasStarted={sequence.hasReached('phaseEvents')} onFinished={sequence.next} />
        </Scene>
    )
}
