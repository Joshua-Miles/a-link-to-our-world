import { resolveEncounter } from "api";
import { Assets, Combat, dialog, Dialog, Soundtrack, SpeechCard, SpeechStepper, SubjectImage, useSequence } from "app/shared";
import { usePlayerName } from "app/shared";
import { Column, Label, timing } from "designer-m3";
import { router } from "expo-router";
import { useState } from "react";

export default function() {
    const playerName = usePlayerName();
    const [state, setState] = useState<string[]>([]);
    const sequence = useSequence({ hasStarted: true, onFinished: handleSequenceEnd }, [
        'luminasStats',
        'dialog',
        'combat',
        'exit',
        'korokThanks',
        'lumiasInstructions'
    ])

    function handleSequenceEnd() {
        router.push('/map')
        resolveEncounter('intro/gorruk', state)
    }

    return (
        <Column flex={1}>
            <Soundtrack asset="gorruks-theme" />
            {sequence.hasNotReached('combat') &&
                <>
                    <Column flex={1} alignItems="center" justifyContent="center">
                        <SubjectImage source={Assets['gorruk']} />
                        <Label.Small opacity={0} _displayed={{ opacity: 1 }} transitions={{ opacity: timing(1000)}}>
                            Gorruk
                        </Label.Small>
                    </Column>
                    {sequence.isAt('luminasStats') &&
                        <Column justifyContent="flex-end">
                            <SpeechCard
                                asset="lumina-avatar" 
                                onFinished={sequence.next}
                                text={[
                                    `${playerName}, this is a Boarblin.`,
                                    'These are some of the easiest foes to face in Hyrule.',
                                    'I estimate a 98.6% chance that you will succeed in cutting down this opponent'
                                ]
                            }/>
                        </Column>
                    }
                    {sequence.isAt('dialog') &&
                        <Dialog 
                            flex={1}
                            onFinished={selections => {
                                setState(selections)
                                sequence.next()
                            }}
                            tree={dialog('What did she say?!', {
                                'Nothing...': dialog('Oh, you think you can insult me, then lie to my face about it? I am Gorruk, the smartest of the Boarblin clan.'
                                        + ' If you think me to be weak in battle step forward, and let us do combat!', {
                                    'With pleasure': dialog('yAHHHHH'),
                                    'If you insist...': dialog('yAHHHHH'),
                                }),
                                'That you would be easy to beat...': dialog('She is most sadly mistaken! I am Gorruk, the strongest of the Boarblin clan.'
                                    + ' If you think me to be weak in battle step forward, and let us do combat!', {
                                    'With pleasure': dialog('yAHHHHH'),
                                    'If you insist...': dialog('yAHHHHH'),
                                }),
                                'None of your business...': dialog('Don\'t try to hide your slander from me now, Hylian! I am Gorruk, the wisest of the Boarblin clan.'
                                    + 'If you think me to be weak in battle step forward, and let us do combat!', {
                                    'With pleasure': dialog('yAHHHHH'),
                                    'If you insist...': dialog('yAHHHHH'),
                                })
                            })}
                        />}
                </>
            }
            {sequence.isAt('combat') && 
                <>
                    <Combat 
                        asset='gorruk'
                        speed={3000}
                        damage={1}
                        fortitude={10}
                        onFinished={sequence.next}
                    />
                </>
            }
            {sequence.has({ reached: 'exit', notReached: 'lumiasInstructions' }) && 
                <>
                    <Column flex={1} alignItems="center" justifyContent="center">
                        <SubjectImage source={Assets['gorruk']} />
                    </Column>
                    <Column flex={1}>
                        <SpeechStepper
                            hasStarted={sequence.isAt('exit')}
                            onFinished={sequence.next}
                            groups={[
                                [
                                    'You...',
                                    '*PANT*',
                                    'beat me this time...',
                                    '*PANT*',
                                    'Hylian'
                                ]
                            ]}
                        />
                    </Column>
                    {sequence.isAt('korokThanks') && 
                        <SpeechCard
                            asset="scribeleaf"
                            onFinished={sequence.next}
                            text={[
                                'Thank you for protecting us, Mr Hero sir!'
                            ]}
                        />
                    }
                </>
            }
            {sequence.isAt('lumiasInstructions') && 
                <>
                    <Column flex={1} alignItems="center" justifyContent="center">
                        <SubjectImage source={Assets['lumina']} />
                    </Column>
                    <Column flex={1}>
                        <SpeechStepper
                            hasStarted={sequence.isAt('lumiasInstructions')}
                            onFinished={sequence.next}
                            groups={[
                                [
                                    `Well done, ${playerName}.`,
                                    'You have protected the Korok seedlings!',
                                ],
                                [
                                    'But there are many dangers left ahead.',
                                    'Quickly, we should set out to plant the korok seeds.',
                                    'There are four regions where the soil is fertile, from which the Koroks will have maximum impact in restoring Hyrule.'
                                ],
                                [
                                    'Lurelin Beach',
                                    'Faron Woods',
                                    'Floria Springs',
                                    'And Neculda Cliffs'
                                ],
                                [
                                    'I have marked each of these locations on your map'
                                ]
                            ]}
                        />
                    </Column>
                </>
            }
        </Column>
    )
}
