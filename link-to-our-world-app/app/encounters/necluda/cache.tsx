import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Assets, MemoryMaker, SongPlayer, Speech, SpeechStepper, SubjectImage, useSequence } from "app/shared";
import { Button, Column, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
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
    const lurelinCache = useResult(getEncounter, 'lurelin/cache');

    let thisIsLastCache = false;

    if (
        (!isLoading(floriaCache) && !isLoading(faronCache) && !isLoading(lurelinCache))
        && (!isAnyFailure(floriaCache) && !isAnyFailure(faronCache) && !isAnyFailure(lurelinCache))
    ) {
        thisIsLastCache = 
            floriaCache?.resolved
            && faronCache?.resolved
            && lurelinCache?.resolved
    }

    function handleFinished() {
        resolveEncounter('necluda/cache', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            {sequnece.isAt('intro') && <>
                <Column alignItems="center" justifyContent="center" gap={8} flex={1}>
                    <Speech text="Did you find the cache?" />
                    <Button.Text onPress={sequnece.next}>
                        Yes <ArrowRightIcon />
                    </Button.Text>
                </Column>
            </>}
            {sequnece.isAt('iAmGoingToMissYou') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['scribeleaf']} />
                </Row>
                <Row justifyContent="center" flex={1}>
                    <SpeechStepper
                        onFinished={sequnece.next}
                        hasStarted={sequnece.hasReached('iAmGoingToMissYou')}
                        groups={[
                            [ 'I am going to miss you...' ],
                            [ 'Will you hold on to this memory with me?']
                        ]}
                    />
                </Row>
            </>}
            {sequnece.isAt('memory') && <>
                <MemoryMaker
                    slug="planting-scribeleaf"
                    onComplete={sequnece.next}
                />
            </>}
            {sequnece.isAt('epilogue') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['lumina']} />
                </Row>
                <Row justifyContent="center">
                    {thisIsLastCache 
                     ? <Speech text="This is the last korok to plant. We should return the sacred grove to await further instructions from the goddess" />
                     : <Speech text="Well done planting this Korok. Shall we set out to plant the next one?" />}
                </Row>
                <Row flex={1} justifyContent="center">
                    <Button.Text onPress={sequnece.next}>
                        Next <ArrowRightIcon />
                    </Button.Text>
                </Row>
            </>}
        </Column>
    )
}