
import { persist, Serial } from "@triframe/scribe";

export type InventoryItemType = 
    | 'weapon'
    | 'ingredient'
    | 'food'
    | 'quest-item'

export type InventoryItemSlug =
    | 'sword'
    | 'master-sword'
    | 'fire-sword'
    | 'ice-sword'
    | 'electric-sword'
    | 'water-sword'
    | 'key'
    | 'milk'
    | 'goddess-flute'
    | 'rice'
    | 'truffle'
    | 'cream'
    | 'truffle-risotto'
    | 'dubious-food'

export type InventoryItem = {
    id: Serial
    playerId: number
    name: string
    type: InventoryItemType
    slug: InventoryItemSlug;
    quantity: number;
    power: number;
    imageSlug: string;
    acknowledged: boolean
}

export const InventoryItems = persist<InventoryItem>()
    .primaryKey('id')
    .indexBy('playerId')
    .uniqueIndexBy('playerId', 'slug')
    .defaults({ quantity: 0, power: 0 })
