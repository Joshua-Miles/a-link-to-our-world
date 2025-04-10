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
        | 'necluda/keese'
        | 'necluda/argorok'
        | 'necluda/lullaby'
        | 'necluda/cache'
    | 'interlude/intro'
        | 'interlude/gorruk'
        | 'interlude/vials'
    | 'gerudo/intro'
        | 'gerudo/tidebane'
        | 'gerudo/tidebane-2'
        | 'gerudo/robot'
        | 'gerudo/ravia'
        | 'gerudo/khenna'
        | 'gerudo/eshara'
        | 'gerudo/scervus'
        | 'gerudo/temple'
        | 'gerudo/cache'
    | 'eldin/intro'
        | 'eldin/bouldan'
        | 'eldin/bouldan-2'
        | 'eldin/mines'
        | 'eldin/darvok'
        | 'eldin/fyrus'
        | 'eldin/lodron'
        | 'eldin/temple'
        | 'eldin/cache'
    | 'zoras/intro'
        | 'zoras/council-room'
        | 'zoras/tentalus'
        | 'zoras/temple'
        | 'zoras/cache'
    | 'hebra/intro'
        | 'hebra/lloron-den'
        | 'hebra/frostus'
        | 'hebra/temple'
        | 'hebra/cache'
    | 'finale/intro'
        | 'finale/moblin-fight'
        | 'finale/lizalfos-fight'
        | 'finale/gibdo-fight'
        | 'finale/darknut-fight'
        | 'finale/talus-fight'
        | 'finale/lynel-fight'
        | 'finale/hyrule-united'
        | 'finale/songs'
        | 'finale/epilogue';

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
