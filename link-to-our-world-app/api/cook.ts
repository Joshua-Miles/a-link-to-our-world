import { AmbassadorClient } from "@triframe/ambassador";

export function cook(this: AmbassadorClient | void, method: "pan" | "pot" | "oven", ingredients: ("key" | "water" | "truffle-soup" | "steak-soup" | "chicken-soup" | "veggie-soup" | "pineapple-pie" | "banana-pie" | "apple-pie" | "chicken-pie" | "steak-pie" | "seafood-pie" | "truffle-omelet" | "steak-omelet" | "chicken-omelet" | "seafood-omelet" | "veggie-omelet" | "steak-fried-rice" | "seafood-fried-rice" | "chicken-fried-rice" | "egg-fried-rice" | "veggie-fried-rice" | "truffle-risotto" | "seafood-risotto" | "tomato-pasta" | "alfredo-pasta" | "pizza" | "fried-chicken-sandwich" | "fried-steak-sandwich" | "fried-fish-sandwich" | "steamed-fruit" | "steamed-veggies" | "fried-fruit" | "fried-veggies" | "roasted-fruit" | "roasted-veggies" | "cake" | "quiche" | "hawaiian-haystack" | "dubious-food" | "rice" | "wheat" | "yeast" | "oil" | "chicken" | "meat" | "fish" | "cream" | "butter" | "cheese" | "egg" | "honey" | "pineapple" | "apple" | "banana" | "carrot" | "peas" | "tomato" | "truffle" | "pickles" | "fried-chicken" | "fried-steak" | "fried-fish" | "bread" | "noodles" | "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword" | "milk" | "goddess-flute")[]): Promise<{
    isFailure: true;
    code: "notAuthorized";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    playerId: number;
    name: string;
    type: "weapon" | "ingredient" | "food" | "quest-item";
    slug: "key" | "water" | "truffle-soup" | "steak-soup" | "chicken-soup" | "veggie-soup" | "pineapple-pie" | "banana-pie" | "apple-pie" | "chicken-pie" | "steak-pie" | "seafood-pie" | "truffle-omelet" | "steak-omelet" | "chicken-omelet" | "seafood-omelet" | "veggie-omelet" | "steak-fried-rice" | "seafood-fried-rice" | "chicken-fried-rice" | "egg-fried-rice" | "veggie-fried-rice" | "truffle-risotto" | "seafood-risotto" | "tomato-pasta" | "alfredo-pasta" | "pizza" | "fried-chicken-sandwich" | "fried-steak-sandwich" | "fried-fish-sandwich" | "steamed-fruit" | "steamed-veggies" | "fried-fruit" | "fried-veggies" | "roasted-fruit" | "roasted-veggies" | "cake" | "quiche" | "hawaiian-haystack" | "dubious-food" | "rice" | "wheat" | "yeast" | "oil" | "chicken" | "meat" | "fish" | "cream" | "butter" | "cheese" | "egg" | "honey" | "pineapple" | "apple" | "banana" | "carrot" | "peas" | "tomato" | "truffle" | "pickles" | "fried-chicken" | "fried-steak" | "fried-fish" | "bread" | "noodles" | "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword" | "milk" | "goddess-flute";
    quantity: number;
    power: null | number;
    imageSlug: string;
    acknowledged: boolean;
} | {
    isFailure: true;
    code: "ingredientsNotFound";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("cook", method, ingredients);
}