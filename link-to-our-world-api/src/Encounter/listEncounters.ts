import { Client } from "@triframe/proprietor";
import { from, observer, ObserverContext } from "@triframe/scribe";
import { Encounters } from "./Encounter";
import { Session } from "../Session";

export const listEncounters = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return [];
    return await observe(Encounters.withPlayerId(loggedInUserId).list({
        select: from(Encounters.type)
            .id()
            .label()
            .imageSlug()
            .imageSize()
            .lat()
            .lng()
            .slug()
    }))
})
