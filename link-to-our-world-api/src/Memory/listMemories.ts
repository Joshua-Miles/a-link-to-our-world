import { Client, selfLink } from "@triframe/proprietor";
import { from, observer, ObserverContext } from "@triframe/scribe";
import { Memories } from "./Memory";
import { Session } from "../Session";

export const listMemories = observer(async ({ observe }: ObserverContext, client: Client<Session>) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return [];
    const memories = await observe(Memories.withPlayerId(loggedInUserId).list({
        select: from(Memories.type)
            .id()
            .slug()
            .imageUUID()
    }))

    return memories.map( memory => ({
        ...memory,
        imageUrl: selfLink(`/downloadMemoryImage?uuid=${memory.imageUUID}`)
    }))
})
