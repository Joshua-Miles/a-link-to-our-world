import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listEncounters(this: AmbassadorClient | void): Observable<never[] | PageArray<{
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    label: string;
} & {
    imageSlug: string;
} & {
    imageSize: null | number;
} & {
    lat: number;
} & {
    lng: number;
} & {
    slug: "beckoning" | "moblin-1";
}>> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listEncounters");
}