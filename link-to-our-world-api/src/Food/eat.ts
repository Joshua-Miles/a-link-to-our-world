import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { InventoryItemSlug } from "../InventoryItem/InventoryItem";
import { makeFailure } from "@triframe/scribe";
import { listInventoryItemsByUserId, removeInventoryItem } from "../InventoryItem";
import { increaseHealth } from "../Meters";

export async function eat(client: Client<Session>, foodSlug: InventoryItemSlug) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});

    const inventoryItems = await listInventoryItemsByUserId(loggedInUserId);
    const food = inventoryItems.find(item => item.slug === foodSlug);

    if (!food) return makeFailure('foodNotFound', {})
    
    await increaseHealth(loggedInUserId, food.power ?? 0);
    await removeInventoryItem(loggedInUserId, foodSlug);
    return true;
}    

