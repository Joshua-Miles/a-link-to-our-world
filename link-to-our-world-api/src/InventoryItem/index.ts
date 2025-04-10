import { acknowledgeInventoryItem } from "./acknowledgeInventoryItem";
import { listInventoryItems } from "./listInventoryItems";

export { createInventoryItem } from './createInventoryItem';
export { removeInventoryItem } from './removeInventoryItem';
export { resetInventoryItems } from './resetInventoryItems';

export const PublicInventoryItemsInterface = {
    listInventoryItems,
    acknowledgeInventoryItem
}