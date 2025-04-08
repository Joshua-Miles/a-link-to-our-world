import { AmbassadorClient } from "@triframe/ambassador";

export function resolveEncounter(this: AmbassadorClient | void, slug: "intro/beckoning" | "intro/seeds" | "intro/sword-chest" | "intro/gorruk" | "lurelin/intro" | "lurelin/tidebane" | "lurelin/moldarach" | "lurelin/lullaby" | "lurelin/cache" | "faron/intro" | "faron/tavon" | "faron/skull-kid-1" | "faron/skull-kid-2" | "faron/skull-kid-3" | "faron/lullaby" | "faron/cache" | "floria/intro" | "floria/nimri" | "floria/bog-dobber" | "floria/lullaby" | "floria/cache" | "necluda/intro" | "necluda/kyllis" | "necluda/keese" | "necluda/argorok" | "necluda/lullaby" | "necluda/cache", state: any): Promise<void> {
    let api = AmbassadorClient.get(this, process.env.EXPO_PUBLIC_API_URL as string);
    return api.callRemoteFunction("resolveEncounter", slug, state);
}