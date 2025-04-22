import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { getPlayerMeterByPlayerId, getPlayerMeters } from "./getPlayerMeters";
import { PlayerMeters } from "./PlayerMeter";
import { isAnyFailure, makeFailure } from "@triframe/scribe";

export async function incrementHeartContainers(playerId: number) {
    const { heartContainers } = await getPlayerMeterByPlayerId(playerId);
    if (heartContainers === 14) return;
    await PlayerMeters
        .withPlayerId(playerId)
        .set((meters) => ({ heartContainers: meters.heartContainers + 1 }))
}
