import { acknowledgeObjective } from "./acknowledgeObjective";
import { acknowledgeObjectiveCompleted } from "./acknowledgeObjectiveCompleted";
import { listObjectives } from "./listObjectives";

export { createObjective } from './createObjective';
export { completeObjective } from './completeObjective';
export { resetObjectives } from "./resetObjectives";

export const PublicObjectivesInterface = {
    listObjectives,
    acknowledgeObjective,
    acknowledgeObjectiveCompleted,
}
