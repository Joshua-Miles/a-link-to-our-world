import { AmbassadorClient } from "@triframe/ambassador";

export function continueGame(this: AmbassadorClient | void): Promise<undefined | {
    isFailure: true;
    code: "notAuthorized";
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("continueGame");
}