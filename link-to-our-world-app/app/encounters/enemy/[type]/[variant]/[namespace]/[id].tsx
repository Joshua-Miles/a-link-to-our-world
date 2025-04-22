import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getPlayerMeters } from "api";
import { useLocalSearchParams } from "expo-router";
import { Enemy, Force } from "shared";

type EnemyType = 
    | 'chu'
    | 'deku-baba'
    | 'keese'
    | 'moblin'
    | 'lizalfos'
    | 'gibdo'
    | 'darknut'
    | 'talus'

const enemies: Record<EnemyType, {
    fortitude: number
    damage: number
    speed: number
    rewardRange: { from: number, to: number }
    givesHeartContainer?: boolean
}> = {
    chu: {
        fortitude: 4,
        damage: 1,
        speed: 2000,
        rewardRange: {
            from: 1,
            to: 1
        }
    },
    "deku-baba": {
        fortitude: 8,
        damage: 1,
        speed: 1500,
        rewardRange: {
            from: 1,
            to: 5
        }
    },
    keese: {
        fortitude: 12,
        damage: 1,
        speed: 1500,
        rewardRange: {
            from: 1,
            to: 5
        }
    },
    moblin: {
        fortitude: 14,
        damage: 1,
        speed: 1500,
        rewardRange: {
            from: 1,
            to: 10
        }
    },
    lizalfos: {
        fortitude: 8,
        damage: 1,
        speed: 750,
        rewardRange: {
            from: 5,
            to: 10
        }
    },
    gibdo: {
        fortitude: 25,
        damage: 2,
        speed: 6000,
        rewardRange: {
            from: 10,
            to: 20
        }
    },
    darknut: {
        fortitude: 25,
        damage: 1,
        speed: 1500,
        rewardRange: {
            from: 10,
            to: 20
        }
    },
    talus: {
        fortitude: 30,
        damage: 3,
        speed: 8000,
        givesHeartContainer: true,
        rewardRange: {
            from: 20,
            to: 30
        }
    }
}

export default () => {
    const { type, variant, namespace, id } = useLocalSearchParams();

    const meters = useResult(getPlayerMeters)
    
    let { fortitude, damage, speed, rewardRange, givesHeartContainer } = enemies[type as keyof typeof enemies];

    let asset = type as string;

    let forces: Force[] = [];

    if (variant !== 'standard') {
        fortitude = fortitude * 2;
        rewardRange = {
            from: rewardRange.from * 2,
            to: rewardRange.to * 2
        }
        forces = [ variant as Force ]
    }
    
    if (isLoading(meters) || isAnyFailure(meters)) return null;

    const canGiveHeartContainer = meters.heartContainers < 14;

    if (!canGiveHeartContainer && givesHeartContainer) {
        rewardRange = {
            from: 100,
            to: 100
        }
    }

    return <Enemy 
        encounter={`enemy/${type}/${variant}/${namespace}/${id}` as any}
        asset={asset}
        fortitude={fortitude}
        damage={damage}
        speed={speed}
        rewardRange={rewardRange}
        givesHeartContainer={canGiveHeartContainer && givesHeartContainer}
        forces={forces}
    />
}
