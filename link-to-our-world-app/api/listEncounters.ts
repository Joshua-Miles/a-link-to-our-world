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
    slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/KOKORI" | "faron/skull-kid" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/FAIRY" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/RITO" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache";
}>> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("listEncounters");
}