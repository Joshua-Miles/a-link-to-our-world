import { downloadMemoryImage } from "./downloadMemoryImage";
import { listMemories } from "./listMemories";
import { saveMemory } from "./saveMemory";

export { resetMemories } from './resetMemories';

export const PublicMemoryInterface = {
    saveMemory,
    listMemories,
    downloadMemoryImage
}