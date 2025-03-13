import { Client } from "@triframe/proprietor";
import { GameController } from "../GameController";
import { Session } from "../Session";
import { Encounters, EncounterSlug } from "./Encounter";

export const resolveEncounter = async (client: Client<Session>, slug: EncounterSlug, state: any) => {
    const { loggedInUserId } = await client.getSession();

    if (!loggedInUserId) return;

    await Encounters.withPlayerIdAndSlug(loggedInUserId, slug).set( () => ({
        resolved: true,
        state
    }))

    GameController.handle({
        type: 'ENCOUNTER_RESOLVED',
        playerId: loggedInUserId,
        slug
    })
}