import { from } from "@triframe/proprietor";
import { InventoryItem, InventoryItems } from "./InventoryItem";

type Slug = InventoryItem['slug'];

export const removeInventoryItem = async (playerId: number, slug: Slug) => {
    const Item = InventoryItems.withPlayerIdAndSlug(playerId, slug)

    const item = await Item.get({
        select: from(InventoryItems.type)
            .id()
            .quantity()
    })

    if (item.quantity > 1) {
        await Item.set(item => ({ quantity: item.quantity - 1 }))
    } else {
        await Item.remove()
    }
}
