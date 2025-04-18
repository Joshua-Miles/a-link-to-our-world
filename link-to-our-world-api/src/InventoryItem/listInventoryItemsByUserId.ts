import { Client } from "@triframe/proprietor";
import { from, observer, ObserverContext } from "@triframe/scribe";
import { InventoryItems } from "./InventoryItem";
import { Session } from "../Session";

export const listInventoryItemsByUserId = observer(async ({ observe }: ObserverContext, userId: number) => {
    return await observe(InventoryItems.withPlayerId(userId).list({
        select: from(InventoryItems.type)
            .id()
            .slug()
            .type()
            .quantity()
            .name()
            .imageSlug()
            .acknowledged()
    }))
})
