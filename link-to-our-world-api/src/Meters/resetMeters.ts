import { PlayerMeters } from "./PlayerMeter";

export async function resetMeters(playerId: number) {
    await PlayerMeters.withPlayerId(playerId).remove();
}