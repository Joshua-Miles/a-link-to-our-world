
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
    | FoodSlug
    | IngredientSlug

export type IngredientSlug =
    | 'rice'  // Grass
    | 'wheat' // Grass
    | 'yeast' // Pot
    | 'water' // Well
    | 'oil'   // Pot
    | 'chicken' // Chicken
    | 'meat'    // Cow
    | 'fish'    // Well
    | 'cream'   // Cow
    | 'butter'  // Pot
    | 'cheese'  // Chest
    | 'egg'     // Chicken
    | 'honey'      // Tree
    | 'pineapple'  // Tree
    | 'apple'      // Tree
    | 'banana'     // Tree
    | 'carrot'  // Grass
    | 'peas'    // Grass
    | 'tomato'  // Grass
    | 'truffle' // Chest
    | 'pickles' // Chest
    
    | 'fried-chicken'
    | 'fried-steak'
    | 'fried-fish'
    | 'bread'
    | 'noodles'


export type FoodSlug = 
    | 'truffle-soup'
    | 'steak-soup'
    | 'chicken-soup'
    | 'veggie-soup'
    
    | 'pineapple-pie'
    | 'banana-pie'
    | 'apple-pie'
    | 'chicken-pie'
    | 'steak-pie'
    | 'seafood-pie'

    | 'truffle-omelet'
    | 'steak-omelet'
    | 'chicken-omelet'
    | 'seafood-omelet'
    | 'veggie-omelet'

    | 'steak-fried-rice'
    | 'seafood-fried-rice'
    | 'chicken-fried-rice'
    | 'egg-fried-rice'
    | 'veggie-fried-rice'

    | 'truffle-risotto'
    | 'seafood-risotto'

    | 'tomato-pasta'
    | 'alfredo-pasta'

    | 'pizza'

    | 'fried-chicken-sandwich'
    | 'fried-steak-sandwich'
    | 'fried-fish-sandwich'

    | 'steamed-fruit'
    | 'steamed-veggies'
    | 'fried-fruit'
    | 'fried-veggies'
    | 'roasted-fruit'
    | 'roasted-veggies'

    | 'cake'
    | 'quiche'
    | 'hawaiian-haystack'
    | 'banana-toast'
    | 'dubious-food'

export type InventoryItem = {
    id: Serial
    playerId: number
    name: string
    type: InventoryItemType
    slug: InventoryItemSlug;
    quantity: number;
    power: number | null;
    imageSlug: string;
    acknowledged: boolean
}

export const InventoryItems = persist<InventoryItem>()
    .primaryKey('id')
    .indexBy('playerId')
    .uniqueIndexBy('playerId', 'slug')
    .defaults({ quantity: 0, power: 0 })
