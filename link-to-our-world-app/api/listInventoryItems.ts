import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

import type { PageArray } from "@triframe/ambassador";

export function listInventoryItems(this: AmbassadorClient | void): Observable<never[] | PageArray<{
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    slug: "sword" | "master-sword" | "fire-sword" | "ice-sword" | "electric-sword" | "water-sword";
} & {
    name: string;
} & {
    imageSlug: string;
} & {
    acknowledged: boolean;
}>> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listInventoryItems");
}