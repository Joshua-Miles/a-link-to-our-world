import { persist } from "@triframe/scribe"

export type PlayerMeter = {
    playerId: number
    health: number
    heartContainers: number
    continues: number
    rupees: number
}

export const PlayerMeters = persist<PlayerMeter>()
    .primaryKey('playerId');
    