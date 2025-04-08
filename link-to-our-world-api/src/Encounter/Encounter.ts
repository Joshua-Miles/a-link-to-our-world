import { persist, Serial, Float } from "@triframe/scribe";

export type EncounterSlug =
    | 'intro/beckoning'
        | 'intro/seeds'
        | 'intro/sword-chest'
        | 'intro/gorruk'
    | 'lurelin/intro'
        | 'lurelin/tidebane'
        | 'lurelin/moldarach'
        | 'lurelin/lullaby'
        | 'lurelin/cache'
    | 'faron/intro'
        | 'faron/tavon'
        | 'faron/skull-kid-1'
        | 'faron/skull-kid-2'
        | 'faron/skull-kid-3'
        | 'faron/lullaby'
        | 'faron/cache'
    | 'floria/intro'
        | 'floria/nimri'
        | 'floria/bog-dobber'
        | 'floria/lullaby'
        | 'floria/cache'
    | 'necluda/intro'
        | 'necluda/kyllis'
        | 'necluda/argorok'
        | 'necluda/lullaby'
        | 'necluda/cache'

export type Encounter = {
    id: Serial
    playerId: number;
    slug: EncounterSlug;
    label: string;
    imageSlug: string;
    imageSize: null | number;
    lat: Float<8>;
    lng: Float<8>;
    resolved: boolean;
    state: {}
}

export const AllEncounters = persist<Encounter>()
    .primaryKey('id')
    .uniqueIndexBy('playerId', 'slug')
    .indexBy('playerId')
    .indexBy('resolved')

export const Encounters = AllEncounters.withResolved(false)
