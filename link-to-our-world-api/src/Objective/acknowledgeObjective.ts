import { Client } from "@triframe/proprietor";
import { Session } from "../Session";
import { Objectives, ObjectiveSlug } from "./Objective";

export const acknowledgeObjective = async (client: Client<Session>, slug: ObjectiveSlug) => {
    const { loggedInUserId } = await client.getSession();

    if (!loggedInUserId) return;

    await Objectives.withPlayerIdAndSlug(loggedInUserId, slug).set( () => ({
        acknowledged: true
    }))
}