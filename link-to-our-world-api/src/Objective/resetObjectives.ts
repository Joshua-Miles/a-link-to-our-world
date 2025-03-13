import { Objectives } from "./Objective";

export async function resetObjectives(playerId: number) {
    await Objectives.withPlayerId(playerId).remove();
}