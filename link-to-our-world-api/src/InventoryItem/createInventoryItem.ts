import { from } from "@triframe/proprietor";
import { InventoryItem, InventoryItems } from "./InventoryItem";

type Slug = InventoryItem['slug'];

type RequiredOptions = Pick<InventoryItem, 'name' | 'type'>

type Options = RequiredOptions & Partial<Pick<InventoryItem, 'imageSlug' | 'power'>>

export const createInventoryItem = async (playerId: number, slug: Slug, { name, type, ...options }: Options) => {
    const item = await InventoryItems.withPlayerIdAndSlug(playerId, slug).get({
        select: from(InventoryItems.type)
            .id()
    })
    if (item) {
        return await InventoryItems.withPlayerIdAndSlug(playerId, slug).set( item => ({ quantity: item.quantity + 1 }))
    } else {
        return await InventoryItems.append({
            playerId,
            slug,
            name,
            type,
            quantity: 1,
            imageSlug: options.imageSlug ?? slug,
            acknowledged: false,
            power: options.power
        })
    }
}
       