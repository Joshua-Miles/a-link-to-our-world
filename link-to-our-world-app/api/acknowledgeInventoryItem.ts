import { AmbassadorClient } from "@triframe/ambassador";

export function acknowledgeInventoryItem(this: AmbassadorClient | void, slug: "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword"): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("acknowledgeInventoryItem", slug);
}