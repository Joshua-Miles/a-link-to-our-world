import { resolveEncounter } from "api";
import { Assets, ItemGet, SubjectImage, useSequence } from "shared";
import { Button, Column, Row, timing } from "designer-m3";
import { router } from "expo-router";

export default function () {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'closed',
        'opened'
    ])

    async function handleFinished() {
        router.push('/map')
        await resolveEncounter('intro/truffle-chest', {
            drops: {
                slug: 'truffle',
                name: 'Truffle',
                type: 'ingredient',
                imageSlug: 'truffle'
            }
        })
    }

    return (
        <Column flex={1} alignItems="center" justifyContent="center">
            <SubjectImage source={Assets['chest']}/>
            <Button.Elevated onPress={sequence.next} opacity={sequence.isAt('closed') ? 1 : 0} transitions={{ opacity: timing(500) }}>
                Open
            </Button.Elevated>
            <ItemGet 
                title="Truffle"
                description="A rare and delicious ingredient"
                asset="truffle"
                isOpen={sequence.hasReached('opened')}
                onFinished={sequence.next}
            />
        </Column>
    )
}