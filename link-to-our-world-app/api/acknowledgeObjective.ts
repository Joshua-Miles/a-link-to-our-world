import { AmbassadorClient } from "@triframe/ambassador";

export function acknowledgeObjective(this: AmbassadorClient | void, slug: "beckoning"): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("acknowledgeObjective", slug);
}