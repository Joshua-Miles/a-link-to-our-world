import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { getHealthMeter } from "./getHealthMeter";
import { HealthMeters } from "./HealthMeter";
import { isAnyFailure } from "@triframe/scribe";

export async function setHealth(client: Client<Session>, health: number) {
    health = Math.max(health, 0);
    const healthMeter = await getHealthMeter(client);
    if (isAnyFailure(healthMeter)) return healthMeter;
    await HealthMeters.withPlayerId(healthMeter.playerId).set(() => ({ health }))
}
