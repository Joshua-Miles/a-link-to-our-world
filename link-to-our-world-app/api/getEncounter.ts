import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEncounter(this: AmbassadorClient | void, slug: "beckoning" | "moblin-1"): Observable<never[] | ({
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    imageSlug: string;
} & {
    lat: number;
} & {
    lng: number;
} & {
    slug: "beckoning" | "moblin-1";
} & {
    state: unknown;
})> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getEncounter", slug);
}