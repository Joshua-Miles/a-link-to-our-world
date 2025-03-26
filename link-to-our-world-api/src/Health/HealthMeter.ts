import { persist } from "@triframe/scribe"

export type HealthMeter = {
    playerId: number
    health: number
}

export const HealthMeters = persist<HealthMeter>()
    .primaryKey('playerId');
    