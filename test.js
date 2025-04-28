const methods = [
    'pot',
    'pan',
    'oven'
]

const ingredients = [
    'rice',  // Grass
    'wheat', // Grass
    'yeast', // Pot
    'water', // Well
    'oil',   // Pot
    'chicken', // Chicken
    'meat',    // Cow
    'fish',    // Well
    'cream',   // Cow
    'butter',  // Pot
    'cheese',  // Chest
    'egg',     // Chicken
    'honey',      // Tree
    'pineapple',  // Tree
    'apple',      // Tree
    'banana',     // Tree
    'carrot',  // Grass
    'peas',    // Grass
    'tomato',  // Grass
    'truffle', // Chest
    'pickles', // Chest

    'fried-chicken',
    'fried-steak',
    'fried-fish',
    'bread',
    'noodles',
]


const recipies = {
    'pan>chicken|oil|wheat': 'fried-chicken',
    'pan>meat|oil|wheat': 'fried-steak',
    'pan>fish|oil|wheat': 'fried-fish',
    'oven>water|wheat|yeast': 'bread',
    'pot>egg|water|wheat': 'noodles',
    'pot>cream|rice|truffle': 'truffle-soup',
    'pot>cream|meat|rice': 'steak-soup',
    'pot>chicken|cream|rice': 'chicken-soup',
    'pot>carrot|cream|rice': 'veggie-soup',
    'pot>cream|peas|rice': 'veggie-soup',
    'pot>cream|rice|tomato': 'veggie-soup',
    'pot>rice|truffle|water': 'truffle-soup',
    'pot>meat|rice|water': 'steak-soup',
    'pot>chicken|rice|water': 'chicken-soup',
    'pot>carrot|rice|water': 'veggie-soup',
    'pot>peas|rice|water': 'veggie-soup',
    'pot>rice|tomato|water': 'veggie-soup',
    'oven>butter|pineapple|wheat': 'pineapple-pie',
    'oven>banana|butter|wheat': 'banana-pie',
    'oven>butter|apple|wheat': 'apple-pie',
    'oven>butter|chicken|wheat': 'chicken-pie',
    'oven>butter|meat|wheat': 'steak-pie',
    'oven>butter|fish|wheat': 'seafood-pie',
    'pan>butter|egg|truffle': 'truffle-omelet',
    'pan>butter|egg|meat': 'steak-omelet',
    'pan>butter|chicken|egg': 'chicken-omelet',
    'pan>butter|egg|fish': 'seafood-omelet',
    'pan>butter|carrot|egg': 'veggie-omelet',
    'pan>butter|eggs|peas': 'veggie-omelet',
    'pan>butter|egg|tomato': 'veggie-omelet',
    'pan>butter|meat|rice': 'steak-fried-rice',
    'pan>butter|fish|rice': 'seafood-fried-rice',
    'pan>butter|chicken|rice': 'chicken-fried-rice',
    'pan>butter|egg|rice': 'egg-fried-rice',
    'pan>butter|carrot|rice': 'veggie-fried-rice',
    'pan>butter|peas|rice': 'veggie-fried-rice',
    'pan>meat|oil|rice': 'steak-fried-rice',
    'pan>fish|oil|rice': 'seafood-fried-rice',
    'pan>chicken|oil|rice': 'chicken-fried-rice',
    'pan>egg|oil|rice': 'egg-fried-rice',
    'pan>carrot|oil|rice': 'veggie-fried-rice',
    'pan>oil|peas|rice': 'veggie-fried-rice',
    'pan>cream|rice|truffle': 'truffle-risotto',
    'pan>cream|fish|rice': 'seafood-risotto',
    'pan>cheese|noodles|tomato': 'tomato-pasta',
    'pan>cheese|cream|noodles': 'alfredo-pasta',
    'pan>butter|cream|noodles': 'alfredo-pasta',
    'oven>bread|tomato|cheese': 'pizza',
    'pan>bread|fried-chicken|pickles': 'fried-chicken-sandwich',
    'pan>bread|fried-steak|pickles': 'fried-steak-sandwich',
    'pan>bread|fried-fish|pickles': 'fried-fish-sandwich',
    'pot>apple|banana|pineapple': 'steamed-fruit',
    'pot>carrot|peas|tomato': 'steamed-veggies',
    'pan>apple|banana|pineapple': 'fried-fruit',
    'pan>carrot|peas|tomato': 'fried-veggies',
    'oven>apple|banana|pineapple': 'roasted-fruit',
    'oven>carrot|peas|tomato': 'roasted-veggies',
    'oven>egg|honey|wheat': 'cake',
    'oven>butter|egg|wheat': 'quiche',
    'pan>chicken|pineapple|rice': 'hawaiian-haystack',
}

let alreadyDone = {}

for (let method of methods) {
    for (let ingredient1 of ingredients) {
        for (let ingredient2 of ingredients) {
            if (ingredient2 === ingredient1) continue
            for (let ingredient3 of ingredients) {
                if (ingredient3 === ingredient1 || ingredient3 == ingredient2) continue
                const sorted = [ ingredient1, ingredient2, ingredient3].sort((a, b) => a.localeCompare(b))
                const key = `${method}>${sorted.join('|')}`
                if (key in recipies) continue;
                if (key in alreadyDone) continue;
                alreadyDone[key] = true;
                console.log(key)
            }
        }
    }
}
