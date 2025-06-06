import { getPlayerMeters } from "./getPlayerMeters";
import { continueGame } from "./continueGame";
import { dealDamage } from "./dealDamage";

export { incrementHeartContainers } from './incrementHeartContainers';
export { increaseHealth } from './increaseHealth';
export { updateRupees } from './updateRupees';
export { resetMeters } from './resetMeters';

export const PublicMetersInterface = {
    getPlayerMeters,
    continueGame,
    dealDamage
}
