import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { InventoryItem, InventoryItemSlug } from "../InventoryItem/InventoryItem";
import { createInventoryItem, listInventoryItemsByUserId, removeInventoryItem } from "../InventoryItem";
import { makeFailure } from "@triframe/scribe";

type CookingMethod = 'stove' | 'oven' | 'pot';

type Recipe = `${CookingMethod}>${InventoryItemSlug}|${InventoryItemSlug}|${InventoryItemSlug}`;

const recipies: Partial<Record<Recipe, (playerId: number) => Promise<InventoryItem>>> = {
    'stove>cream|rice|truffle': (playerId) => createInventoryItem(playerId, 'truffle-risotto', {
        name: 'Truffle Risotto',
        type: 'food'
    })
}

export async function cook(client: Client<Session>, method: CookingMethod, ingredients: InventoryItemSlug[]) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    const inventoryItems = await listInventoryItemsByUserId(loggedInUserId);
    const sortedIngredients = [ ...ingredients ].sort((a, b) => a.localeCompare(b))
    const recipe = `${method}>${sortedIngredients.join('|')}` as Recipe;

    for (let ingredient of ingredients) {
        if (!inventoryItems.some(item => item.slug === ingredient)) {
            return makeFailure('ingredientsNotFound', {})
        }
        await removeInventoryItem(loggedInUserId, ingredient);
    }

    const foodCreator = recipies[recipe];

    if (foodCreator) {
        return await foodCreator(loggedInUserId)
    } else {
        return await createInventoryItem(loggedInUserId, 'dubious-food', {
            name: 'Dubious Food',
            type: 'food',
        })
    }
}
