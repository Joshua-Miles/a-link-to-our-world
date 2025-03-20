import { InventoryItem, InventoryItems } from "./InventoryItem";

type Slug = InventoryItem['slug'];

type RequiredOptions = Pick<InventoryItem, 'name'>

type Options = RequiredOptions & Partial<Pick<InventoryItem, 'imageSlug'>>

export const createInventoryItem = (playerId: number, slug: Slug, { name, ...options }: Options) =>
        InventoryItems.append({
            playerId,
            slug,
            name,
            imageSlug: options.imageSlug ?? slug,
            acknowledged: false
        })