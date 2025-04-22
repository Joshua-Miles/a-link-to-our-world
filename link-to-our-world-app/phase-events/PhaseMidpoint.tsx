import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getTemplesWatered } from "api";
import { Combat, Force, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";

export type PhaseMidpointProps = {
    currentForce: Force;
    hasStarted: boolean
    onFinished: () => any
}

export function PhaseMidpoint ({ hasStarted, currentForce, onFinished }: PhaseMidpointProps) {
    const playerName = usePlayerName();

    const templesWatered = useResult(getTemplesWatered)

    const sequence = useSequence({ hasStarted, onFinished }, [
        'iSense',
        'behold',
        'combat',
        'epilogue'
    ])

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(templesWatered) || isAnyFailure(templesWatered)) {
        return null;
    }

    const allForces: Force[] = [ 'fire', 'ice', 'water', 'electric' ]
    const masteredForces: Force[] = [];

    if (templesWatered.gerudo?.resolved) {
        masteredForces.push('electric')
    } 

    if (templesWatered.eldin?.resolved) {
        masteredForces.push('fire')
    } 

    if (templesWatered.zoras?.resolved) {
        masteredForces.push('water')
    }

    if (templesWatered.hebra?.resolved) {
        masteredForces.push('ice')
    } 

    masteredForces.push(currentForce);

    const remainingForces = allForces.filter( force => !masteredForces.includes(force));

    const forceLabels = {
        fire: 'Fire',
        water: 'Water',
        ice: 'Ice',
        electric: 'Lightning'
    }

    return (
        <>
            {sequence.hasPassed('iSense') && !sequence.isAt('combat') && <SceneFocus asset="gorruk" />}
            <Soundtrack isPlaying={hasStarted} asset="gorruk-theme-3" />
            <SpeechCard
                hasStarted={sequence.hasReached('iSense')}
                asset="lumina-avatar"
                text={[`I sense an enemy rapidly approaching `]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('behold')}
                groups={[ [`Behold, ${playerName}. I have mastered ${forceLabels[masteredForces[0]]} and ${forceLabels[masteredForces[1]]}. Face me now!`] ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') && 
                <Combat 
                    asset='gorruk'
                    speed={6000}
                    damage={1}
                    fortitude={50}
                    forces={masteredForces}
                    onFinished={sequence.next}
                    // The player has been gifted sword for the current force, but it won't reflect
                    //  in their inventory until the end of the encounter
                    extraItems={[ `${currentForce}-sword` ]}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('epilogue')}
                groups={[ 
                    [
                        `I can't believe it...`,
                        `Even with 2 forces mastered, you have still managed to defeat me... `
                    ],
                    [
                        `No mattter.`,
                        `If I can master ${forceLabels[masteredForces[0]]} and ${forceLabels[masteredForces[1]]}, I can master ${forceLabels[remainingForces[0]]} and ${forceLabels[remainingForces[1]]} as well!`,
                        `I will return stronger still...`
                    ]
                ]}
                onFinished={sequence.next}
            />
        </>
    )
}
