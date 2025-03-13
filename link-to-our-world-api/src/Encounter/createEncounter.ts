import { Encounter, Encounters } from "./Encounter";

export const createEncounter = (playerId: number, options: Pick<Encounter, 'label' | 'slug' | 'imageSlug' | 'imageSize' | 'lat' | 'lng'>) =>
        Encounters.append({
            playerId,
            ...options,
            resolved: false,
            // @ts-ignore
            state: {}
        })