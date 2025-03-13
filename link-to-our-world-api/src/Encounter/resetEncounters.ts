import { AllEncounters, Encounters } from "./Encounter";

export async function resetEncounters(playerId: number) {
    await AllEncounters.withPlayerId(playerId).remove();
}