import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getTemplesWatered } from "api";
import { Combat, Force, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";

export type PhaseMidpointProps = {
    currentForce: string;
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

    const masteredForces = [];
    const remainingForces = [];

    if (templesWatered.gerudo?.resolved) {
        masteredForces.push('Lightning')
    } else if (currentForce !== 'Lightning') {
        remainingForces.push('Lightning')
    }

    if (templesWatered.eldin?.resolved) {
        masteredForces.push('Fire')
    } else if (currentForce !== 'Fire') {
        remainingForces.push('Fire')
    }

    if (templesWatered.zoras?.resolved) {
        masteredForces.push('Water')
    } else if (currentForce !== 'Water') {
        remainingForces.push('Water')
    }

    if (templesWatered.hebra?.resolved) {
        masteredForces.push('Ice')
    } else if (currentForce !== 'Ice') {
        remainingForces.push('Ice')
    }

    masteredForces.push(currentForce)

    const combatForces = masteredForces.map( force => (
        force === 'Lightning' ? 'electric'
        : force === 'Fire' ? 'fire'
        : force === 'Water'? 'water'
        : force === 'Ice' ? 'ice'
        : null
    )) as Force[]

    return (
        <>
            {sequence.hasPassed('iSense') && !sequence.isAt('combat') && <SceneFocus asset="gorruk" />}
            <Soundtrack isPlaying={hasStarted} asset="gorruks-theme" />
            <SpeechCard
                hasStarted={sequence.hasReached('iSense')}
                asset="lumina-avatar"
                text={[`I sense an enemy rapidly approaching `]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('behold')}
                groups={[ [`Behold, ${playerName}. I have mastered ${masteredForces[0]} and ${masteredForces[1]}. Face me now!`] ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') && 
                <Combat 
                    asset='gorruk'
                    speed={6000}
                    damage={1}
                    fortitude={50}
                    forces={combatForces}
                    onFinished={sequence.next}
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
                        `If I can master ${masteredForces[0]} and ${masteredForces[1]}, I can master ${remainingForces[0]} and ${remainingForces[1]} as well!`,
                        `I will return stronger still...`
                    ]
                ]}
                onFinished={sequence.next}
            />
        </>
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
