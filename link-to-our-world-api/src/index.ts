import { serve } from '@triframe/proprietor';
import { Session } from './Session';
import { Globals as ScribeGlobals } from '@triframe/scribe';
import { createGCPFileStore } from '@triframe/gcp-file-store';
import { PublicUserInterface } from './User';
import { PublicEncountersInterface } from './Encounter';
import { PublicInventoryItemsInterface } from './InventoryItem';
import { PublicObjectivesInterface } from './Objective';
import { resetGame } from './resetGame';
import { PublicMemoryInterface } from './Memory';
import { PublicMetersInterface } from './Meters';
import { getTemplesWatered } from './getTemplesWatered';
import { getSeedsPlanted } from './getSeedsPlanted';
import { PublicFoodInterface } from './Food';

if (process.env.BUCKET_NAME) {
    ScribeGlobals.fileStore = createGCPFileStore(process.env.BUCKET_NAME);
}

const PublicInterface = {
    ...PublicUserInterface,
    ...PublicEncountersInterface,
    ...PublicInventoryItemsInterface,
    ...PublicObjectivesInterface,
    ...PublicMemoryInterface,
    ...PublicMetersInterface,
    ...PublicFoodInterface,
    getTemplesWatered,
    getSeedsPlanted,
    resetGame,
}

serve(PublicInterface, {
    initialSession: (): Session => ({ loggedInUserId: null })
})

console.log('Started API on Port', process.env.API_PORT)
