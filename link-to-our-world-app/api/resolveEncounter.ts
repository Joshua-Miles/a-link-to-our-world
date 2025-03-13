import { AmbassadorClient } from "@triframe/ambassador";

export function resolveEncounter(this: AmbassadorClient | void, slug: "beckoning" | "moblin-1", state: any): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("resolveEncounter", slug, state);
}