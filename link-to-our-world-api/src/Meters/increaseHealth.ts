import { PlayerMeters } from "./PlayerMeter";

export async function increaseHealth(playerId: number, health: number) {
    await PlayerMeters
        .withPlayerId(playerId)
        .set((meters) => ({ heartContainers: meters.health + health }))
}
