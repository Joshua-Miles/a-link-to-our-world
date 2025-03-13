import { Client } from "@triframe/proprietor";
import { from, observer, ObserverContext } from "@triframe/scribe";
import { Objectives } from "./Objective";
import { Session } from "../Session";

export const listObjectives = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return [];
    return await observe(Objectives.withPlayerId(loggedInUserId).list({
        select: from(Objectives.type)
            .id()
            .title()
            .slug()
            .acknowledged()
            .completed()
            .completionAcknowledged()
    }))
})
