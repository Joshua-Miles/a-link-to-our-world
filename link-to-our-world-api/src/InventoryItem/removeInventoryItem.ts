import { InventoryItem, InventoryItems } from "./InventoryItem";

type Slug = InventoryItem['slug'];

export const removeInventoryItem = (playerId: number, slug: Slug) =>
    InventoryItems.withPlayerIdAndSlug(playerId, slug).remove()