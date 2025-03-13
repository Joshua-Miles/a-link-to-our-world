import { persist, Serial, Float } from "@triframe/scribe";

export type EncounterSlug =
    'beckoning'
    | 'moblin-1'

export type Encounter = {
    id: Serial
    playerId: number;
    label: string;
    slug: EncounterSlug;
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
