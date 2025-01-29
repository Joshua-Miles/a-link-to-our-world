import { AmbassadorClient } from "@triframe/ambassador";

export function logout(this: AmbassadorClient | void): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("logout");
}