import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listObjectives(this: AmbassadorClient | void): Observable<never[] | PageArray<{
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    title: string;
} & {
    slug: "beckoning";
} & {
    acknowledged: boolean;
} & {
    completed: boolean;
} & {
    completionAcknowledged: boolean;
}>> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listObjectives");
}