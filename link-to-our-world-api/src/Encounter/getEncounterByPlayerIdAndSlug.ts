import { from, observer, ObserverContext } from "@triframe/scribe";
import { AllEncounters } from "./Encounter";
import { EncounterSlug } from ".";

export const getEncounterByPlayerIdAndSlug = observer(async ({ observe }: ObserverContext, playerId: number, slug: EncounterSlug) => {
    return await observe(AllEncounters.withPlayerIdAndSlug(playerId, slug).get({
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
