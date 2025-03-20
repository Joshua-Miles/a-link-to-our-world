import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEncounter(this: AmbassadorClient | void, slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/KOKORI" | "faron/skull-kid" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/FAIRY" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/RITO" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache"): Observable<never[] | ({
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
    slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/KOKORI" | "faron/skull-kid" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/FAIRY" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/RITO" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache";
} & {
    state: unknown;
})> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getEncounter", slug);
}