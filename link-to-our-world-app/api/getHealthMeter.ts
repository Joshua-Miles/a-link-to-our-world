import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getHealthMeter(this: AmbassadorClient | void): Observable<{
    isFailure: true;
    code: "notAuthorized";
} | {
    playerId: number;
    health: number;
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getHealthMeter");
}