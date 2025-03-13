import { getEncounter } from './getEncounter';
import { listEncounters } from './listEncounters';
import { resolveEncounter } from './resolveEncounter';

export { EncounterSlug } from './Encounter';
export { createEncounter } from './createEncounter';
export { resetEncounters } from './resetEncounters';

export const PublicEncountersInterface = {
    listEncounters,
    getEncounter,
    resolveEncounter,
}
