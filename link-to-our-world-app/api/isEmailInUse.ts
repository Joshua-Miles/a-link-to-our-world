import { AmbassadorClient } from "@triframe/ambassador";

export function isEmailInUse(this: AmbassadorClient | void, email: string): Promise<boolean> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("isEmailInUse", email);
}