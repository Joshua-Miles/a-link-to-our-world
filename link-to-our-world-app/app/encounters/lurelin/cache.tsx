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

    const floriaCache = useResult(getEncounter, 'floria/cache');
    const faronCache = useResult(getEncounter, 'faron/cache');
    const necludaCache = useResult(getEncounter, 'necluda/cache');

    let thisIsLastCache = false;

    if (
        (!isLoading(floriaCache) && !isLoading(faronCache) && !isLoading(necludaCache))
        && (!isAnyFailure(floriaCache) && !isAnyFailure(faronCache) && !isAnyFailure(necludaCache))
    ) {
        thisIsLastCache = 
            floriaCache?.resolved
            && faronCache?.resolved
            && necludaCache?.resolved
    }

    function handleFinished() {
        resolveEncounter('lurelin/cache', {})
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
                <SceneFocus asset="grinroot" />
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
                    slug="planting-grinroot"
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
                                ? "Grinroot was the last seedling to plant. We should return to the sacred grove, to report to Impa."
                                : "Well done planting this Korok. Shall we set out to plant the next one?"
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}