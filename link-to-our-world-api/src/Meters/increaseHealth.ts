import { getPlayerMeterByPlayerId } from "./getPlayerMeters";
import { PlayerMeters } from "./PlayerMeter";

export async function increaseHealth(playerId: number, points: number) {
    const { health, heartContainers } = await getPlayerMeterByPlayerId(playerId);
    const heartSlots = heartContainers - health;
    points = Math.min(heartSlots, points)
    await PlayerMeters
        .withPlayerId(playerId)
        .set((meters) => ({ health:  meters.health + points }))
}
