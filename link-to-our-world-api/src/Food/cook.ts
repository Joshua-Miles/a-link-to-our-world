import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { InventoryItem, InventoryItemSlug } from "../InventoryItem/InventoryItem";
import { createInventoryItem, listInventoryItemsByUserId, removeInventoryItem } from "../InventoryItem";
import { makeFailure } from "@triframe/scribe";
import { updateRupees } from "../Meters";

type CookingMethod = 'pan' | 'oven' | 'pot';

const recipies: Partial<Record<string, (playerId: number) => Promise<InventoryItem>>> = {
    'pan>chicken|oil|wheat': (playerId) => createInventoryItem(playerId, 'fried-chicken', {
        name: 'Fried Chicken',
        type: 'ingredient',
    }),
    'pan>meat|oil|wheat': (playerId) => createInventoryItem(playerId, 'fried-steak', {
        name: 'Fried Steak',
        type: 'ingredient',
    }),
    'pan>fish|oil|wheat': (playerId) => createInventoryItem(playerId, 'fried-fish', {
        name: 'Fried Fish',
        type: 'ingredient',
    }),
    'oven>water|wheat|yeast': (playerId) => createInventoryItem(playerId, 'bread', {
        name: 'Bread',
        type: 'ingredient',
    }),
    'pot>egg|water|wheat': (playerId) => createInventoryItem(playerId, 'noodles', {
        name: 'Noodles',
        type: 'ingredient',
    }),

    'pot>cream|rice|truffle': (playerId) => createInventoryItem(playerId, 'truffle-soup', {
        name: 'Truffle Soup',
        type: 'food',
        power: 4
    }),
    'pot>cream|meat|rice': (playerId) => createInventoryItem(playerId, 'steak-soup', {
        name: 'Steak Soup',
        type: 'food',
        power: 3
    }),
    'pot>chicken|cream|rice': (playerId) => createInventoryItem(playerId, 'chicken-soup', {
        name: 'Chicken Soup',
        type: 'food',
        power: 3
    }),
    'pot>carrot|cream|rice': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),
    'pot>cream|peas|rice': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),
    'pot>cream|rice|tomato': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),
    'pot>rice|truffle|water': (playerId) => createInventoryItem(playerId, 'truffle-soup', {
        name: 'Truffle Soup',
        type: 'food',
        power: 4
    }),
    'pot>meat|rice|water': (playerId) => createInventoryItem(playerId, 'steak-soup', {
        name: 'Steak Soup',
        type: 'food',
        power: 3
    }),
    'pot>chicken|rice|water': (playerId) => createInventoryItem(playerId, 'chicken-soup', {
        name: 'Chicken Soup',
        type: 'food',
        power: 3
    }),
    'pot>carrot|rice|water': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),
    'pot>peas|rice|water': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),
    'pot>rice|tomato|water': (playerId) => createInventoryItem(playerId, 'veggie-soup', {
        name: 'Veggie Soup',
        type: 'food',
        power: 1
    }),

    'oven>butter|pineapple|wheat': (playerId) => createInventoryItem(playerId, 'pineapple-pie', {
        name: 'Pineapple Pie',
        type: 'food',
        power: 4
    }),
    'oven>banana|butter|wheat': (playerId) => createInventoryItem(playerId, 'banana-pie', {
        name: 'Banana Pie',
        type: 'food',
        power: 4
    }),
    'oven>butter|apple|wheat': (playerId) => createInventoryItem(playerId, 'apple-pie', {
        name: 'Apple Pie',
        type: 'food',
        power: 4
    }),
    'oven>butter|chicken|wheat': (playerId) => createInventoryItem(playerId, 'chicken-pie', {
        name: 'Chicken Pie',
        type: 'food',
        power: 3
    }),
    'oven>butter|meat|wheat': (playerId) => createInventoryItem(playerId, 'steak-pie', {
        name: 'Steak Pie',
        type: 'food',
        power: 2
    }),
    'oven>butter|fish|wheat': (playerId) => createInventoryItem(playerId, 'seafood-pie', {
        name: 'Seafood Pie',
        type: 'food',
        power: 1
    }),

    'pan>butter|egg|truffle': (playerId) => createInventoryItem(playerId, 'truffle-omelet', {
        name: 'Truffle Omelet',
        type: 'food',
        power: 4
    }),
    'pan>butter|egg|meat': (playerId) => createInventoryItem(playerId, 'steak-omelet', {
        name: 'Steak Omelet',
        type: 'food',
        power: 3
    }),
    'pan>butter|chicken|egg': (playerId) => createInventoryItem(playerId, 'chicken-omelet', {
        name: 'Chicken Omelet',
        type: 'food',
        power: 2
    }),
    'pan>butter|egg|fish': (playerId) => createInventoryItem(playerId, 'seafood-omelet', {
        name: 'Seafood Omelet',
        type: 'food',
        power: 1
    }),
    'pan>butter|carrot|egg': (playerId) => createInventoryItem(playerId, 'veggie-omelet', {
        name: 'Veggie Omelet',
        type: 'food',
        power: 1
    }),
    'pan>butter|eggs|peas': (playerId) => createInventoryItem(playerId, 'veggie-omelet', {
        name: 'Veggie Omelet',
        type: 'food',
        power: 1
    }),
    'pan>butter|egg|tomato': (playerId) => createInventoryItem(playerId, 'veggie-omelet', {
        name: 'Veggie Omelet',
        type: 'food',
        power: 1
    }),

    'pan>butter|meat|rice': (playerId) => createInventoryItem(playerId, 'steak-fried-rice', {
        name: 'Steak Fried Rice',
        type: 'food',
        power: 3
    }),
    'pan>butter|fish|rice': (playerId) => createInventoryItem(playerId, 'seafood-fried-rice', {
        name: 'Seafood Fried Rice',
        type: 'food',
        power: 3
    }),
    'pan>butter|chicken|rice': (playerId) => createInventoryItem(playerId, 'chicken-fried-rice', {
        name: 'Chicken Fried Rice',
        type: 'food',
        power: 2
    }),
    'pan>butter|egg|rice': (playerId) => createInventoryItem(playerId, 'egg-fried-rice', {
        name: 'Egg Fried Rice',
        type: 'food',
        power: 1
    }),
    'pan>butter|carrot|rice': (playerId) => createInventoryItem(playerId, 'veggie-fried-rice', {
        name: 'Veggie Fried Rice',
        type: 'food',
        power: 1
    }),
    'pan>butter|peas|rice': (playerId) => createInventoryItem(playerId, 'veggie-fried-rice', {
        name: 'Veggie Fried Rice',
        type: 'food',
        power: 1
    }),
    'pan>meat|oil|rice': (playerId) => createInventoryItem(playerId, 'steak-fried-rice', {
        name: 'Steak Fried Rice',
        type: 'food',
        power: 3
    }),
    'pan>fish|oil|rice': (playerId) => createInventoryItem(playerId, 'seafood-fried-rice', {
        name: 'Seafood Fried Rice',
        type: 'food',
        power: 3
    }),
    'pan>chicken|oil|rice': (playerId) => createInventoryItem(playerId, 'chicken-fried-rice', {
        name: 'Chicken Fried Rice',
        type: 'food',
        power: 2
    }),
    'pan>egg|oil|rice': (playerId) => createInventoryItem(playerId, 'egg-fried-rice', {
        name: 'Egg Fried Rice',
        type: 'food',
        power: 1
    }),
    'pan>carrot|oil|rice': (playerId) => createInventoryItem(playerId, 'veggie-fried-rice', {
        name: 'Veggie Fried Rice',
        type: 'food',
        power: 1
    }),
    'pan>oil|peas|rice': (playerId) => createInventoryItem(playerId, 'veggie-fried-rice', {
        name: 'Veggie Fried Rice',
        type: 'food',
        power: 1
    }),

    'pan>cream|rice|truffle': (playerId) => createInventoryItem(playerId, 'truffle-risotto', {
        name: 'Truffle Risotto',
        type: 'food',
        power: 14
    }),
    'pan>cream|fish|rice': (playerId) => createInventoryItem(playerId, 'seafood-risotto', {
        name: 'Seafood Risotto',
        type: 'food',
        power: 7
    }),

    'pan>cheese|noodles|tomato': (playerId) => createInventoryItem(playerId, 'tomato-pasta', {
        name: 'Tomato Pasta',
        type: 'food',
        power: 14
    }),
    'pan>cheese|cream|noodles': (playerId) => createInventoryItem(playerId, 'alfredo-pasta', {
        name: 'Alfredo Pasta',
        type: 'food',
        power: 14
    }),
    'pan>butter|cream|noodles': (playerId) => createInventoryItem(playerId, 'alfredo-pasta', {
        name: 'Alfredo Pasta',
        type: 'food',
        power: 14
    }),

    'oven>bread|tomato|cheese': (playerId) => createInventoryItem(playerId, 'pizza', {
        name: 'Pizza',
        type: 'food',
        power: 14
    }),

    'pan>bread|fried-chicken|pickles': (playerId) => createInventoryItem(playerId, 'fried-chicken-sandwich', {
        name: 'Fried Chicken Sandwich',
        type: 'food',
        power: 14
    }),
    'pan>bread|fried-steak|pickles': (playerId) => createInventoryItem(playerId, 'fried-steak-sandwich', {
        name: 'Fried Steak Sandwich',
        type: 'food',
        power: 10
    }),
    'pan>bread|fried-fish|pickles': (playerId) => createInventoryItem(playerId, 'fried-fish-sandwich', {
        name: 'Fried Fish Sandwich',
        type: 'food',
        power: 10
    }),

    'pot>apple|banana|pineapple': (playerId) => createInventoryItem(playerId, 'steamed-fruit', {
        name: 'Steamed Fruit',
        type: 'food',
        power: 4
    }),
    'pot>carrot|peas|tomato': (playerId) => createInventoryItem(playerId, 'steamed-veggies', {
        name: 'Steamed Veggies',
        type: 'food',
        power: 4
    }),
    'pan>apple|banana|pineapple': (playerId) => createInventoryItem(playerId, 'fried-fruit', {
        name: 'Fried Fruit',
        type: 'food',
        power: 4
    }),
    'pan>carrot|peas|tomato': (playerId) => createInventoryItem(playerId, 'fried-veggies', {
        name: 'Fried Veggies',
        type: 'food',
        power: 4
    }),
    'oven>apple|banana|pineapple': (playerId) => createInventoryItem(playerId, 'roasted-fruit', {
        name: 'Roasted Fruit',
        type: 'food',
        power: 4
    }),
    'oven>carrot|peas|tomato': (playerId) => createInventoryItem(playerId, 'roasted-veggies', {
        name: 'Roasted Veggies',
        type: 'food',
        power: 4
    }),

    'oven>egg|honey|wheat': (playerId) => createInventoryItem(playerId, 'cake', {
        name: 'Cake',
        type: 'food',
        power: 7
    }),
    'oven>butter|egg|wheat': (playerId) => createInventoryItem(playerId, 'quiche', {
        name: 'Quiche',
        type: 'food',
        power: 7
    }),
    'pan>chicken|pineapple|rice': (playerId) => createInventoryItem(playerId, 'hawaiian-haystack', {
        name: 'Hawaiian Haystack',
        type: 'food',
        power: 7
    }),
}

export async function cook(client: Client<Session>, method: CookingMethod, ingredients: InventoryItemSlug[]) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    const inventoryItems = await listInventoryItemsByUserId(loggedInUserId);
    const sortedIngredients = [ ...ingredients ].sort((a, b) => a.localeCompare(b))
    const recipe = `${method}>${sortedIngredients.join('|')}`;

    for (let ingredient of ingredients) {
        if (!inventoryItems.some(item => item.slug === ingredient)) {
            return makeFailure('ingredientsNotFound', {})
        }
        await removeInventoryItem(loggedInUserId, ingredient);
    }

    const foodCreator = recipies[recipe];

    await updateRupees(loggedInUserId, -10);

    if (foodCreator) {
        return await foodCreator(loggedInUserId)
    } else {
        return await createInventoryItem(loggedInUserId, 'dubious-food', {
            name: 'Dubious Food',
            type: 'food',
        })
    }
}
