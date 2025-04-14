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
        resolveEncounter('eldin/cache', {});
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
            {sequence.has({ passed: 'intro', notReached: 'phaseEvents' })  && <SceneFocus asset={sequence.isAt('wellDone') ? 'lumina' : 'darvok'} />}
            <SpeechStepper
                hasStarted={sequence.hasReached('wellDone')}
                groups={[
                    [`Well done, ${playerName}, watering this korok seedling. The Fire Temple is secure.`]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thankYouAgain')}
                groups={[
                    [`${playerName}! Wait!`, `I just talked to the Goron elders, and we agreed that we wanted to give you a parting gift, before you continued on your travels.`]
                ]}
                onFinished={sequence.next}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset="fire-sword"
                title="Fire Sword"
                description="Deals extra damage to fire foes"
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('hopeToSeeYouAround')}
                groups={[
                    [`Hope to see you around, Goro.`]
                ]}
                onFinished={sequence.next}
            />
            <PhaseEvents 
                hasStarted={sequence.hasReached('phaseEvents')} 
                currentForce="Fire"
                onFinished={sequence.next} 
            />
        </Scene>
    )
}
