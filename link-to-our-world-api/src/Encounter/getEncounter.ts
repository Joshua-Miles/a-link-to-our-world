import { Client } from "@triframe/proprietor";
import { from, makeFailure, observer, ObserverContext } from "@triframe/scribe";
import { AllEncounters } from "./Encounter";
import { Session } from "../Session";
import { EncounterSlug } from ".";

export const getEncounter = observer(async ({ observe }: ObserverContext, client: Client<Session>, slug: EncounterSlug) => {
    const { loggedInUserId } = await observe(client.getSession());
    if (!loggedInUserId) return makeFailure('notAuthorized', {});
    return await observe(AllEncounters.withPlayerIdAndSlug(loggedInUserId, slug).get({
        select: from(AllEncounters.type)
            .id()
            .resolved()
            .imageSlug()
            .lat()
            .lng()
            .slug()
            // @ts-ignore
            .state(() => ({ 'ᑕ_model': {}, 'ᑕ_subset': {} }))
    }))
})
