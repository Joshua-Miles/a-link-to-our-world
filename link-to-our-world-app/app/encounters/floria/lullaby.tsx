import { resolveEncounter } from "api";
import { Assets, Combat, SongPlayer, Soundtrack, Speech, SubjectImage, useSequence } from "app/shared";
import { fairyTheme, zeldasLullaby } from "app/shared/testSongs";
import { Button, Column, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";

export default function () {
    console.log('THIS FAR')
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'playing',
        'thankYou',
        'toTheSoil'
    ])

    function handleFinished() {
        resolveEncounter('floria/lullaby', {})
        router.push('/map')
    }

    const song = fairyTheme;

    return (
        <Column flex={1}>
            <Soundtrack isPlaying={sequnece.hasPassed('playing')} asset={song.src} offset={song.offset} fadeDuration={1000} />
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
                    song={song}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('thankYou') && <>
                <Row flex={1} alignItems="center" justifyContent="center">
                    <SubjectImage source={Assets['fayflutter']} />
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
                    <Speech text="There is good soil to plant Fayflutter nearby, I've marked the location on your map" />
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