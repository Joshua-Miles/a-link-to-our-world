import { PlayerMeters } from "./PlayerMeter";

export async function updateRupees(playerId: number, rupees: number) {
    await PlayerMeters
        .withPlayerId(playerId)
        .set((meters) => ({ heartContainers: meters.rupees + rupees }))
}
