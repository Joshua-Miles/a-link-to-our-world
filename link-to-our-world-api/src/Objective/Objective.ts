import { persist, Serial } from "@triframe/scribe";

export type ObjectiveSlug = 
    | 'beckoning'
    | 'plant-seeds'

export type Objective = {
    id: Serial
    playerId: number
    slug: ObjectiveSlug
    title: string
    acknowledged: boolean;
    completed: boolean;
    completionAcknowledged: boolean;
}

export const Objectives = persist<Objective>()
    .primaryKey('id')
    .indexBy('playerId')
    .uniqueIndexBy('playerId', 'slug')
