import { AmbassadorClient } from "@triframe/ambassador";

export function cook(this: AmbassadorClient | void, method: "stove" | "oven" | "pot", ingredients: ("key" | "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword" | "milk" | "goddess-flute" | "rice" | "truffle" | "cream" | "truffle-risotto" | "dubious-food")[]): Promise<{
    isFailure: true;
    code: "notAuthorized";
} | {
    id: number & {
        __serial__?: undefined | true;
    };
    playerId: number;
    name: string;
    type: "weapon" | "ingredient" | "food" | "quest-item";
    slug: "key" | "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword" | "milk" | "goddess-flute" | "rice" | "truffle" | "cream" | "truffle-risotto" | "dubious-food";
    quantity: number;
    power: number;
    imageSlug: string;
    acknowledged: boolean;
} | {
    isFailure: true;
    code: "ingredientsNotFound";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("cook", method, ingredients);
}