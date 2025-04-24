import { resolveEncounter } from "api"
import { useSequence } from "./useSequence"
import { useState } from "react"
import { Combat } from "./Combat"
import { ItemGet } from "./ItemGet"
import { router } from "expo-router"

type CombatProps = Parameters<typeof Combat>[0];

type EnemyProps = Omit<CombatProps, 'onFinished' | 'extraItems'> & {
    encounter: Parameters<typeof resolveEncounter>[0]
    rewardRange: { from: number, to: number }
    givesHeartContainer?: boolean
}

export function Enemy({ encounter, rewardRange, givesHeartContainer = false, ...combatProps }: EnemyProps) {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'combat',
        'reward',
    ])

    const [reward] = useState(getRandomNumber(rewardRange.from, rewardRange.to));

    function handleFinished() {
        resolveEncounter(encounter, { reward: givesHeartContainer ? 'heart-container' : reward })
        router.push('/map')
    }

    return (
        <>
            {sequence.isAt('combat') &&
                <Combat
                    {...combatProps}
                    onFinished={sequence.next}
                />
            }
            <ItemGet
                asset={givesHeartContainer ? 'heart-container' : "rupee"}
                title={givesHeartContainer ? 'Heart Container' : `${reward} Rupees`}
                description={givesHeartContainer ? 'This will increase your max health by 1' : 'Don\'t spend it all in one place!'}
                isOpen={sequence.isAt('reward')}
                onFinished={sequence.next}
            />
        </>
    )
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
