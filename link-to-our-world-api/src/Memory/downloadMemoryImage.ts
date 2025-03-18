import { ServerResponse } from "http";
import { MemoryImages } from "./MemoryImages";

export const downloadMemoryImage = (uuid: string, response: ServerResponse) =>
    MemoryImages.download(uuid, response);
