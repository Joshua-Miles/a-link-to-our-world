import { AmbassadorClient } from "@triframe/ambassador";

export function setHealth(this: AmbassadorClient | void, health: number): Promise<undefined | {
    isFailure: true;
    code: "notAuthorized";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("setHealth", health);
}