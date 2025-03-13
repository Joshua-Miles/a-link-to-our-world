import { acknowledgeObjective } from "./acknowledgeObjective";
import { acknowledgeObjectiveCompleted } from "./acknowledgeObjectiveCompleted";
import { listObjectives } from "./listObjectives";
import { resetObjectives } from "./resetObjectives";

export { createObjective } from './createObjective';
export { completeObjective } from './completeObjective';

export const PublicObjectivesInterface = {
    listObjectives,
    acknowledgeObjective,
    acknowledgeObjectiveCompleted,
    resetObjectives
}
