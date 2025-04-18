import { EncounterSlug } from "./Encounter";

export type NewGameEvent = {
    type: 'NEW_GAME';
    playerId: number;
}

export type EncounterResolvedEvent = {
    type: 'ENCOUNTER_RESOLVED'
    slug: EncounterSlug
    playerId: number;
    state: any
}

export type GameEvent = NewGameEvent | EncounterResolvedEvent;
