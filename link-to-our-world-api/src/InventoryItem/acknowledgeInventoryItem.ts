import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { InventoryItems, InventoryItemSlug } from "./InventoryItem";

export const acknowledgeInventoryItem = async (client: Client<Session>, slug: InventoryItemSlug) => {
    const { loggedInUserId } = await client.getSession();

    if (!loggedInUserId) return;

    await InventoryItems.withPlayerIdAndSlug(loggedInUserId, slug).set( () => ({
        acknowledged: true
    }))
}