import { Memories } from "./Memory";

export async function resetMemories(playerId: number) {
    await Memories.withPlayerId(playerId).remove();
}