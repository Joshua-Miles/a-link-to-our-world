import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listInventoryItems(this: AmbassadorClient | void): Observable<never[] | PageArray<{
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    slug: "key" | "truffle-soup" | "steak-soup" | "chicken-soup" | "veggie-soup" | "pineapple-pie" | "banana-pie" | "apple-pie" | "chicken-pie" | "steak-pie" | "seafood-pie" | "truffle-omelet" | "steak-omelet" | "chicken-omelet" | "seafood-omelet" | "veggie-omelet" | "steak-fried-rice" | "seafood-fried-rice" | "chicken-fried-rice" | "egg-fried-rice" | "veggie-fried-rice" | "truffle-risotto" | "seafood-risotto" | "tomato-pasta" | "alfredo-pasta" | "pizza" | "fried-chicken-sandwich" | "fried-steak-sandwich" | "fried-fish-sandwich" | "steamed-fruit" | "steamed-veggies" | "fried-fruit" | "fried-veggies" | "roasted-fruit" | "roasted-veggies" | "cake" | "quiche" | "hawaiian-haystack" | "dubious-food" | "rice" | "wheat" | "yeast" | "water" | "oil" | "chicken" | "meat" | "fish" | "cream" | "butter" | "cheese" | "egg" | "honey" | "pineapple" | "apple" | "banana" | "carrot" | "peas" | "tomato" | "truffle" | "pickles" | "fried-chicken" | "fried-steak" | "fried-fish" | "bread" | "noodles" | "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword" | "milk" | "goddess-flute";
} & {
    type: "weapon" | "ingredient" | "food" | "quest-item";
} & {
    quantity: number;
} & {
    name: string;
} & {
    imageSlug: string;
} & {
    acknowledged: boolean;
}>> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listInventoryItems");
}