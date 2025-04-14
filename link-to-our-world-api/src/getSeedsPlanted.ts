import { Client } from "@triframe/proprietor";
import { Session } from "./Session";
import { getEncounterByPlayerIdAndSlug } from "./Encounter";
import { makeFailure } from "@triframe/scribe";

export async function getSeedsPlanted(client: Client<Session>) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    return await getSeedsPlantedByUserId(loggedInUserId);
}

export async function getSeedsPlantedByUserId(playerId: number) {
    const lurelin = await getEncounterByPlayerIdAndSlug(playerId, 'lurelin/cache');
    const floria = await getEncounterByPlayerIdAndSlug(playerId, 'floria/cache');
    const faron = await getEncounterByPlayerIdAndSlug(playerId, 'faron/cache');
    const necluda = await getEncounterByPlayerIdAndSlug(playerId, 'necluda/cache');
    
    const encounters = [ lurelin, floria, faron, necluda ]

    return {
        totalComplete: encounters.filter( encounter => encounter && encounter.resolved).length,
        lurelin,
        floria,
        faron,
        necluda
    }
}
