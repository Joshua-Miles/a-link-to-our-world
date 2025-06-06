import { Client } from "@triframe/proprietor";
import { resetEncounters } from "./Encounter";
import { resetObjectives } from "./Objective";
import { GameController } from "./GameController";
import { Session } from "./Session";
import { resetMemories } from "./Memory";
import { resetInventoryItems } from "./InventoryItem";
import { resetMeters } from "./Meters";

export async function resetGame(client: Client<Session>) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return;
    await resetEncounters(loggedInUserId);
    await resetObjectives(loggedInUserId);
    await resetInventoryItems(loggedInUserId);
    await resetMemories(loggedInUserId);
    await resetMeters(loggedInUserId);
    await GameController.handle({
        type: 'NEW_GAME',
        playerId: loggedInUserId
    })
    await GameController.handle({
        type: 'ENCOUNTER_RESOLVED',
        playerId: loggedInUserId,
        slug: 'intro/seeds',
        state: {}
    })
    await GameController.handle({
        type: 'ENCOUNTER_RESOLVED',
        playerId: loggedInUserId,
        slug: 'intro/gorruk',
        state: {}
    })
}
