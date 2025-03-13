import { Objective, Objectives } from "./Objective";

export const createObjective = (playerId: number, options: Pick<Objective, 'title' | 'slug'>) =>
        Objectives.append({
            playerId,
            ...options,
            acknowledged: false,
            completed: false,
            completionAcknowledged: false
        })