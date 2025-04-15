import { resolveEncounter } from "api";
import { Combat, dialog, Dialog, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, SubjectImage, useSequence } from "shared";
import { usePlayerName } from "shared";
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
        <Scene>
            <Soundtrack asset="gorruks-theme" />
            {sequence.hasNotReached('combat') &&
                <>
                    <SceneFocus asset="gorruk" label="Gorruk" />                       
                    <SpeechCard
                        hasStarted={sequence.isAt('luminasStats')}
                        asset="lumina-avatar" 
                        onFinished={sequence.next}
                        text={[
                            `${playerName}, this is a Boarblin.`,
                            'These are some of the easiest foes to face in Hyrule.',
                            'I estimate a 98.6% chance that you will succeed in cutting down this opponent'
                        ]
                    }/>
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
                    <SceneFocus asset="gorruk" label="Gorruk" />
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
                    <SpeechCard
                        hasStarted={sequence.isAt('korokThanks')}
                        asset="scribeleaf"
                        onFinished={sequence.next}
                        text={[
                            'Thank you for protecting us, Mr Hero sir!'
                        ]}
                    />
                </>
            }
            {sequence.isAt('lumiasInstructions') && 
                <>
                    <SceneFocus asset="lumina"/>
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
                </>
            }
        </Scene>
    )
}
