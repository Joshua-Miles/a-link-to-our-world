import { resolveEncounter } from "api";
import { Assets, Combat, SongPlayer, Speech, SubjectImage, useSequence } from "app/shared";
import { zeldasLullaby } from "app/shared/testSongs";
import { Button, Column, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'playing',
        'thankYou',
        'toTheSoil'
    ])

    function handleFinished() {
        resolveEncounter('necluda/lullaby', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            {sequnece.isAt('intro') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['lumina']} />
                </Row>
                <Row justifyContent="center">
                    <Speech text="Play a song of Hyrule" />
                </Row>
                <Row flex={1} justifyContent="center">
                    <Button.Text onPress={sequnece.next}>
                        Next <ArrowRightIcon />
                    </Button.Text>
                </Row>
            </>}
            {sequnece.isAt('playing') && <>
                <SongPlayer
                    song={zeldasLullaby}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('thankYou') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['scribeleaf']} />
                </Row>
                <Row justifyContent="center">
                    <Speech text="I think I can sleep now." />
                </Row>
                <Row flex={1} justifyContent="center">
                    <Button.Text onPress={sequnece.next}>
                        Next <ArrowRightIcon />
                    </Button.Text>
                </Row>
            </>}
            {sequnece.isAt('toTheSoil') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['lumina']} />
                </Row>
                <Row justifyContent="center">
                    <Speech text="There is good soil to plant Scribeleaf nearby, I've marked the location on your map" />
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