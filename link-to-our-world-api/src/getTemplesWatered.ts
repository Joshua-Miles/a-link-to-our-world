import { Client } from "@triframe/proprietor";
import { Session } from "./Session";
import { getEncounterByPlayerIdAndSlug } from "./Encounter";
import { makeFailure } from "@triframe/scribe";

export async function getTemplesWatered(client: Client<Session>) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    return await getTemplesWateredByUserId(loggedInUserId);
}

export async function getTemplesWateredByUserId(playerId: number) {
    const gerudo = await getEncounterByPlayerIdAndSlug(playerId, 'gerudo/cache');
    const eldin = await getEncounterByPlayerIdAndSlug(playerId, 'eldin/cache');
    const zoras = await getEncounterByPlayerIdAndSlug(playerId, 'zoras/cache');
    const hebra = await getEncounterByPlayerIdAndSlug(playerId, 'hebra/cache');
    
    const encounters = [ gerudo, eldin, zoras, hebra ]

    return {
        totalComplete: encounters.filter( encounter => encounter && encounter.resolved).length,
        gerudo,
        eldin,
        zoras,
        hebra
    }
}
