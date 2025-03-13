import { Objectives, ObjectiveSlug } from "./Objective";

export const completeObjective = async (playerId: number, slug: ObjectiveSlug) => {
    await Objectives.withPlayerIdAndSlug(playerId, slug).set( () => ({
        completed: true,
    }))
}