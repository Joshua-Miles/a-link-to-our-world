import { InventoryItems } from "./InventoryItem";

export async function resetInventoryItems(playerId: number) {
    await InventoryItems.withPlayerId(playerId).remove();
}