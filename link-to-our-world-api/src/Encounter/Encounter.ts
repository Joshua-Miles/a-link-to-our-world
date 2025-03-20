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
        | 'faron/KOKORI'
        | 'faron/skull-kid'
        | 'faron/lullaby'
        | 'faron/cache'
    | 'floria/intro'
        | 'floria/FAIRY'
        | 'floria/bog-dobber'
        | 'floria/lullaby'
        | 'floria/cache'
    | 'necluda/intro'
        | 'necluda/RITO'
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
