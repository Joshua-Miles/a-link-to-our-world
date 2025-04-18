import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { getPlayerMeters } from "./getPlayerMeters";
import { PlayerMeters } from "./PlayerMeter";
import { isAnyFailure, makeFailure } from "@triframe/scribe";

export async function dealDamage(client: Client<Session>, damage: number) {
    if (damage < 0) return makeFailure('cannotDealNegativeDamage', {});
    const meter = await getPlayerMeters(client);
    if (isAnyFailure(meter)) return meter;
    await PlayerMeters.withPlayerId(meter.playerId).set((meter) => ({ health: meter.health - damage }))
}
