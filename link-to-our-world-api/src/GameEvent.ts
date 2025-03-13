import { EncounterSlug } from "./Encounter";

export type NewGameEvent = {
    type: 'NEW_GAME';
    playerId: number;
}

export type EncounterResolvedEvent = {
    type: 'ENCOUNTER_RESOLVED'
    slug: EncounterSlug
    playerId: number;
}

export type GameEvent = NewGameEvent | EncounterResolvedEvent;
