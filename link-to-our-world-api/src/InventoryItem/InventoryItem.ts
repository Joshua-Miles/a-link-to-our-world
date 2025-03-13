
import { persist, Serial } from "@triframe/scribe";

export type InventoryItemSlug = ''

export type InventoryItem = {
    id: Serial
    playerId: number
    name: string
    slug: InventoryItemSlug;
    imageSlug: string;
    acknowledged: boolean
}

export const InventoryItems = persist<InventoryItem>()
    .primaryKey('id')
    .indexBy('playerId')
    .uniqueIndexBy('playerId', 'slug')
