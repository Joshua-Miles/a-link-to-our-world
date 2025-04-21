import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getPlayerMeters(this: AmbassadorClient | void): Observable<{
    isFailure: true;
    code: "notAuthorized";
} | {
    playerId: number;
    health: number;
    heartContainers: number;
    continues: number;
    rupees: number;
}> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getPlayerMeters");
}