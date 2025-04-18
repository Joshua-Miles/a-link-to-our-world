import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { getPlayerMeters, INITIAL_HEALTH } from "./getPlayerMeters";
import { PlayerMeters } from "./PlayerMeter";
import { isAnyFailure } from "@triframe/scribe";

export async function continueGame(client: Client<Session>) {
    const meter = await getPlayerMeters(client);
    if (isAnyFailure(meter)) return meter;
    await PlayerMeters.withPlayerId(meter.playerId).set((meter) => ({ health: INITIAL_HEALTH, continues: meter.continues + 1 }))
}
