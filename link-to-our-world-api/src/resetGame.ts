import { Client } from "@triframe/proprietor";
import { resetEncounters } from "./Encounter";
import { GameController } from "./GameController";
import { resetObjectives } from "./Objective/resetObjectives";
import { Session } from "./Session";

export async function resetGame(client: Client<Session>) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return;
    await resetEncounters(loggedInUserId)
    await resetObjectives(loggedInUserId);
    await GameController.handle({
        type: 'NEW_GAME',
        playerId: loggedInUserId
    })
}
