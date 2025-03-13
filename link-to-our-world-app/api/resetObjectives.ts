import { AmbassadorClient } from "@triframe/ambassador";

export function resetObjectives(this: AmbassadorClient | void, playerId: number): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("resetObjectives", playerId);
}