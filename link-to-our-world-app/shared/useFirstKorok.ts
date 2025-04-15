import { isAnyFailure } from "@triframe/ambassador";
import { IndeterminateValue, isLoading, useResult } from "@triframe/utils-react";
import { getEncounter } from "api";

type Korok = 'scribeleaf' | 'tumblebreeze' | 'grinroot' | 'fayflutter';

function isDone(cache: Awaited<ReturnType<typeof getEncounter>> | IndeterminateValue) {
    return !isLoading(cache) && !isAnyFailure(cache) && cache !== null && cache.resolved
}

export function useFirstKorok (koroks: [ Korok, Korok, Korok, Korok ]) {
    const lurelinCache = useResult(getEncounter, 'lurelin/cache');
    const floriaCache = useResult(getEncounter, 'floria/cache');
    const faronCache = useResult(getEncounter, 'faron/cache');
    const necludaCache = useResult(getEncounter, 'necluda/cache');
    let remainingKoroks = koroks as Korok[];
    if (isDone(lurelinCache)) {
        remainingKoroks = remainingKoroks.filter( korok => korok !== 'grinroot')
    }
    if (isDone(floriaCache)) {
        remainingKoroks = remainingKoroks.filter( korok => korok !== 'grinroot')
    }
    if (isDone(faronCache)) {
        remainingKoroks = remainingKoroks.filter( korok => korok !== 'grinroot')
    }
    if (isDone(necludaCache)) {
        remainingKoroks = remainingKoroks.filter( korok => korok !== 'grinroot')
    }
    return remainingKoroks[0]
}