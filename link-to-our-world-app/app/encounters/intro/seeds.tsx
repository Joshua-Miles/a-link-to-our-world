import { isLoading } from "@triframe/utils-react"
import { resolveEncounter } from "api";
import { Assets, Soundtrack, Speech, SpeechStepper, useSequence, usePlayerName } from "shared"
import { Button, Column, Label, Row, timing, useDesignerTheme } from "designer-m3"
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";
import { Image, ImageProps, useWindowDimensions } from 'react-native';

/**
 * Scribeleaf
 * Fayflutter
 * Grinroot
 * Tumblebreeze
 */

export default () => {
    const { spacing } = useDesignerTheme();
    const device = useWindowDimensions();
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true }, [
        'haveYouFoundTheKoroks',
        'scribeleafWasReading',
        'tumbleBreezeCallsHerOut',
        'scribeLeafResponds',
        'grinRootWasInThereForever',
        'luminaCorrectsGrinroot',
        'fayflutterThinksLumniaIsPretty',
        'theseAreTheKorokSeedlings',
        'anEnemyApproaches'
    ])

    if (sequence.isAt('haveYouFoundTheKoroks')) return (
        <Column flex={1} gap={spacing.md} justifyContent="center" alignItems="center">
            <Speech text="Have you found the koroks?" />
            <Button.Text onPress={sequence.next}>
                Yes <ArrowRightIcon/>
            </Button.Text>
        </Column>
    )

    if (isLoading(playerName)) return null;

    const selectedImageIndex = sequence.select({
        haveYouFoundTheKoroks: 0,
        scribeleafWasReading: 0,
        tumbleBreezeCallsHerOut: 1,
        scribeLeafResponds: 0,
        grinRootWasInThereForever: 2,
        luminaCorrectsGrinroot: 4,
        fayflutterThinksLumniaIsPretty: 3,
        theseAreTheKorokSeedlings: 4,
        anEnemyApproaches: 4
    }) ?? 0;

    async function handleFinished() {
        await resolveEncounter('intro/seeds', {})
        router.push('/map')
    }

    return (
        <Column flex={1}>
            <Soundtrack asset="koroks-theme" />
            <Column flex={1} justifyContent="center">
                <Row
                    px={(device.width - 200) / 2}
                    width={device.width * 5}
                    position="absolute"
                    left={-(selectedImageIndex * device.width)}
                    alignItems="center"
                    justifyContent="space-between"
                    pb={spacing.md}
                    transitions={{
                        left: timing(250)
                    }}
                >
                    <Column alignItems="center" gap={spacing.sm}>
                        <SubjectImage source={Assets['scribeleaf']} />
                        <Label.Small opacity={0} _displayed={{ opacity: 1}} transitions={{ opacity: timing(1000)}}>
                            Scribeleaf
                        </Label.Small>
                    </Column>
                    <Column alignItems="center" gap={spacing.sm}>
                        <SubjectImage source={Assets['tumblebreeze']} />
                        <Label.Small opacity={sequence.hasReached('tumbleBreezeCallsHerOut') ? 1 : 0} transitions={{ opacity: timing(1000)}}>
                            Tumblebreeze
                        </Label.Small>
                    </Column>
                    <Column alignItems="center" gap={spacing.sm}>
                        <SubjectImage source={Assets['grinroot']} />
                        <Label.Small opacity={sequence.hasReached('grinRootWasInThereForever') ? 1 : 0} transitions={{ opacity: timing(1000)}}>
                            Grinroot
                        </Label.Small>
                    </Column>
                    <Column alignItems="center" gap={spacing.sm}>
                        <SubjectImage source={Assets['fayflutter']} />
                        <Label.Small opacity={sequence.hasReached('grinRootWasInThereForever') ? 1 : 0} transitions={{ opacity: timing(1000)}}>
                            Fayflutter
                        </Label.Small>
                    </Column>
                    <SubjectImage source={Assets['lumina']} />
                </Row>
            </Column>
            <Column flex={1} alignItems="center" p={spacing.sm}>
                <SpeechStepper
                    hasStarted={sequence.hasReached('scribeleafWasReading')}
                    onNext={sequence.next}
                    onFinished={handleFinished}
                    groups={[
                        [
                            'Awwwww, it\'s time to wake up already?',
                            'I was reading...'
                        ],
                        [
                            'Scribeleaf, you didn\'t have a book...'
                        ],
                        [
                            'I wrote, like 1000 while we were in there, Tumblebreeze'
                        ],
                        [
                            'We were in there FOREVER!!!'
                        ],
                        [
                            'Actually, Grinroot, it was not forever.',
                            'It was 179.829 Eras...'
                        ],
                        [
                            'Ooooo...',
                            'You\'re pretty...'
                        ],
                        [
                            `${playerName}, these are the Korok seedlings.`,
                            'They may seem... chaotic.',
                            'But it is vital that we plant these seedlings across the Hyrule of decline.',
                            'As they grow, these plants will restore my world.'
                        ],
                        [
                            `I sense an enemy approaching from the south`,
                            'Quickly, we must find a weapon and protect the seedlings!'
                        ]
                    ]}
                />
            </Column>
        </Column>
    )
}

function SubjectImage(props: ImageProps) {
    return <Image {...props} style={{ width: 200, height: 200, objectFit: 'contain' }} />
}
