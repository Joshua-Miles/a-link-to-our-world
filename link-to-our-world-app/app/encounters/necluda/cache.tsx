import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { MemoryMaker, Scene, SceneFocus, SpeechStepper, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'iAmGoingToMissYou',
        'memory',
        'epilogue'
    ])

    const lurelinCache = useResult(getEncounter, 'lurelin/cache');
    const faronCache = useResult(getEncounter, 'faron/cache');
    const floriaCache = useResult(getEncounter, 'floria/cache');

    let thisIsLastCache = false;

    if (
        (!isLoading(lurelinCache) && !isLoading(faronCache) && !isLoading(floriaCache))
        && (!isAnyFailure(lurelinCache) && !isAnyFailure(faronCache) && !isAnyFailure(floriaCache))
    ) {
        thisIsLastCache = 
            lurelinCache?.resolved
            && faronCache?.resolved
            && floriaCache?.resolved
    }

    function handleFinished() {
        resolveEncounter('necluda/cache', {})
        router.push('/map')
    }

    return (
        <Scene>
            {sequnece.isAt('intro') && <>
                <SpeechStepper
                    justifyContent="center"
                    groups={[['Did you find the cache?']]}
                    hasStarted={sequnece.hasReached('intro')}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('iAmGoingToMissYou') && <>
                <SceneFocus asset="tumblebreeze" />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('iAmGoingToMissYou')}
                    groups={[
                        [ 'I am going to miss you...' ],
                        [ 'Will you hold on to this memory with me?']
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('memory') && <>
                <MemoryMaker
                    slug="planting-tumblebreeze"
                    onComplete={sequnece.next}
                />
            </>}
            {sequnece.isAt('epilogue') && <>
                <SceneFocus asset="lumina" />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('epilogue')}
                    groups={[
                        [ 
                            thisIsLastCache 
                                ? "Tumblebreeze was the last seedling to plant. We should return to the sacred grove, to report to Impa."
                                : "Well done planting this Korok. Shall we set out to plant the next one?"
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}