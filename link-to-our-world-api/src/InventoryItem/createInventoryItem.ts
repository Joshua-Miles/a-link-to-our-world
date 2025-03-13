import { InventoryItem, InventoryItems } from "./InventoryItem";

export const createInventoryItem = (playerId: number, options: Pick<InventoryItem, 'slug' | 'name' | 'imageSlug'>) =>
        InventoryItems.append({
            playerId,
            ...options,
            acknowledged: false
        })