import { Client, UploadStream } from "@triframe/proprietor";
import { makeFailure } from "@triframe/scribe";
import { Session } from "../Session";
import { Memories, MemorySlug } from "./Memory";
import { MemoryImages } from "./MemoryImages";

export async function saveMemory(client: Client<Session>, slug: MemorySlug, image: UploadStream) {
    const { loggedInUserId } = await client.getSession();
    if (!loggedInUserId) return makeFailure('notAuthorized', {});

    await Memories.withPlayerIdAndSlug(loggedInUserId, slug).remove();

    return await Memories.append({
        slug,
        playerId: loggedInUserId,
        imageUUID: await MemoryImages.upload(image)
    })
}