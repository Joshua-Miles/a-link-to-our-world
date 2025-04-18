import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { getPlayerMeters } from "./getPlayerMeters";
import { PlayerMeters } from "./PlayerMeter";
import { isAnyFailure, makeFailure } from "@triframe/scribe";

export async function incrementHeartContainers(playerId: number) {
    await PlayerMeters
        .withPlayerId(playerId)
        .set((meters) => ({ heartContainers: meters.heartContainers + 1 }))
}
