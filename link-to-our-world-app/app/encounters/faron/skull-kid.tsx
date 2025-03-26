import { resolveEncounter } from "api";
import { Assets, Combat, Speech, SubjectImage, useSequence } from "app/shared";
import { Button, Column, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'combat',
        'willYouSingMeALullabye'
    ])

    function handleFinished() {
        resolveEncounter('faron/skull-kid', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            {sequnece.isAt('intro') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['skull-kid']} />
                </Row>
                <Row justifyContent="center">
                    <Speech text="Oh no! The Skull Kid!" />
                </Row>
                <Row flex={1} justifyContent="center">
                    <Button.Text onPress={sequnece.next}>
                        Next <ArrowRightIcon />
                    </Button.Text>
                </Row>
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="skull-kid"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('willYouSingMeALullabye') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['grinroot']} />
                </Row>
                <Row justifyContent="center">
                    <Speech text="I'm tired- will you play me a lullabye?" />
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