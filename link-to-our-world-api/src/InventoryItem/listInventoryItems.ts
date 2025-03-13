import { Client } from "@triframe/proprietor";
import { from, observer, ObserverContext } from "@triframe/scribe";
import { InventoryItems } from "./InventoryItem";
import { Session } from "../Session";

export const listInventoryItems = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return [];
    return await observe(InventoryItems.withPlayerId(loggedInUserId).list({
        select: from(InventoryItems.type)
            .id()
            .slug()
            .name()
            .imageSlug()
            .acknowledged()
    }))
})
