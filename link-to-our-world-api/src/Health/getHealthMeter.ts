import { Client } from "@triframe/proprietor";
import { from, makeFailure, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { HealthMeters } from "./HealthMeter";

const INITIAL_HEALTH = 3;

export const getHealthMeter = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    const healthMeter = await observe(HealthMeters.withPlayerId(loggedInUserId).get({
        select: from(HealthMeters.type)
            .playerId()
            .health()
    }))
    if (healthMeter) {
        return healthMeter;
    } else {
        return await HealthMeters.append({ playerId: loggedInUserId, health: INITIAL_HEALTH })

    }
})
