import { Client } from "@triframe/proprietor";
import { from, makeFailure, observer, ObserverContext } from "@triframe/scribe";
import { Session } from "../Session";
import { PlayerMeters } from "./PlayerMeter";

export const INITIAL_HEALTH = 3;

export const INITIAL_HEART_CONTAINERS = 3;

export const INITIAL_RUPEES = 0;

export const getPlayerMeters = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    const healthMeter = await observe(PlayerMeters.withPlayerId(loggedInUserId).get({
        select: from(PlayerMeters.type)
            .playerId()
            .health()
            .heartContainers()
            .continues()
            .rupees()
    }))
    if (healthMeter) {
        return healthMeter;
    } else {
        return await PlayerMeters.append({ playerId: loggedInUserId, health: INITIAL_HEALTH, heartContainers: INITIAL_HEART_CONTAINERS, rupees: INITIAL_RUPEES, continues: 0 })
    }
})
