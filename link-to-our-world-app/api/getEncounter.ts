import { AmbassadorClient } from "@triframe/ambassador";

import type { Observable } from "@triframe/ambassador";

export function getEncounter(this: AmbassadorClient | void, slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache"): Observable<{
    isFailure: true;
    code: "notAuthorized";
} | ({
    id: number & {
        __serial__?: undefined | true;
    };
} & {
    resolved: boolean;
} & {
    imageSlug: string;
} & {
    lat: number;
} & {
    lng: number;
} & {
    slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache";
} & {
    state: {};
})> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteObservableFunction("getEncounter", slug);
}