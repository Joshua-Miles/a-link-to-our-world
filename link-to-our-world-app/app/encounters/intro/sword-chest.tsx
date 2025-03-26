import { resolveEncounter } from "api";
import { Assets, ItemGet, SubjectImage, useSequence } from "app/shared";
import { Button, Column, Row, timing } from "designer-m3";
import { router } from "expo-router";

export default function () {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'closed',
        'opened'
    ])

    async function handleFinished() {
        router.push('/map')
        await resolveEncounter('intro/sword-chest', {})
    }

    return (
        <Column flex={1} alignItems="center" justifyContent="center">
            <SubjectImage source={Assets['chest']}/>
            <Button.Elevated onPress={sequence.next} opacity={sequence.isAt('closed') ? 1 : 0} transitions={{ opacity: timing(500) }}>
                Open
            </Button.Elevated>
            <ItemGet 
                title="Sword"
                description="Use this to protect the Korok seeds"
                asset="sword"
                isOpen={sequence.hasReached('opened')}
                onFinished={sequence.next}
            />
        </Column>
    )
}