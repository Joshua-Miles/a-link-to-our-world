import { resolveEncounter } from "api";
import { Assets, Speech, SubjectImage } from "app/shared";
import { Button, Column, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";

export default function () {

    function handleFinished() {
        resolveEncounter('faron/intro', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            <Row flex={1} alignItems="center" justifyContent="center">
                <SubjectImage source={Assets['lumina']} />
            </Row>
            <Row justifyContent="center">
                <Speech text="You should talk to Tavon" />
            </Row>
            <Row flex={1} justifyContent="center">
                <Button.Text onPress={handleFinished}>
                    Next <ArrowRightIcon />
                </Button.Text>
            </Row>
        </Column>
    )
}