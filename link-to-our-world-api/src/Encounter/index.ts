import { getEncounter } from './getEncounter';
import { listEncounters } from './listEncounters';
import { resolveEncounter } from './resolveEncounter';

export { EncounterSlug } from './Encounter';
export { createEncounter } from './createEncounter';
export { resetEncounters } from './resetEncounters';
export { getEncounterByPlayerIdAndSlug } from './getEncounterByPlayerIdAndSlug';
export { markEncounterResolved } from './resolveEncounter';

export const PublicEncountersInterface = {
    listEncounters,
    getEncounter,
    resolveEncounter,
}
