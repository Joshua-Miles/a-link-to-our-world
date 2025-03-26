import { isLoading } from "@triframe/utils-react"
import { resolveEncounter } from "api";
import { Assets, ItemGet, SongPlayer, Soundtrack, SpeechStepper, useSequence } from "app/shared"
import { zeldasLullaby } from "app/shared/testSongs";
import { usePlayerName } from "app/shared/usePlayerName"
import { Column, timing, useDesignerTheme } from "designer-m3"
import { router } from "expo-router";
import { Image } from 'react-native';

export default () => {
    const { spacing } = useDesignerTheme();
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true }, [
        'luminaEnters',
        'speechRunning',
        'fluteGet',
        'luminaPromptsSong',
        'playSong',
        'luminaReturns',
        'seedsAwake'
    ])

    if (isLoading(playerName)) return null;

    if (sequence.isAt('playSong')) return (
        <SongPlayer
            onFinished={sequence.next}
            song={zeldasLullaby}
        />
    )

    return (
        <Column flex={1}>
            <Soundtrack  
                asset='luminas-theme' 
                fadeDuration={2000} 
                isPlaying={sequence.hasNotReached('luminaPromptsSong')} 
            />
            <Soundtrack 
                asset='zeldas-lullabye'
                fadeDuration={1000}
                isPlaying={sequence.hasReached('luminaReturns')}
                offset={zeldasLullaby.offset}
            />
            <Column
                flex={1}
                alignItems="center"
                justifyContent="flex-end"
                pb={spacing.md}
                opacity={0}
                _displayed={{ opacity: 1 }}
                transitions={{
                    opacity: timing(5000).then(sequence.next),
                }}
            >
                <Image style={{ width: 200, height: 200, objectFit: 'contain' }} source={Assets['lumina']} />
            </Column>
            <Column flex={1} alignItems="center">
                <SpeechStepper
                    display={sequence.hasNotPassed('speechRunning') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('speechRunning')}
                    onFinished={sequence.next}
                    groups={[
                        [
                            `Welcome, ${playerName}.`,
                            'Do not be afraid, I am a messenger left by the goddess from a time long past...',
                            `Allow me to introduce myself: I am Lumia.`
                        ],
                        [
                            `You have a great destiny, ${playerName}.`,
                            'You have been brought here, to the very place where the goddess created the world on the notes of a song.',
                            'Far too soon, the world decended into darkness...',
                            'The goddess has chosen you as her chosen hero, to restore the once and future kingdom of Hyrule.'
                        ],
                        [
                            '...',
                            'I must admit I am confused...',
                            'Your time does not seem to have much in common with the Hyrule I know...'
                        ],
                        [
                            'But no matter, it is not my place to second guess the choices of the goddess.',
                            'In order to help you with your task, I will enfuse your device, so that through it you may commune with the Hyrule that was.',
                            'Then perhaps you might be able to usher the Hyrule that is to come.'
                        ],
                        [
                            'The soil of this world is long dormant',
                            'To renew the kingdom, you must plant 4 deku seedlings.',
                            'In time they will grow; their roots will connect the vast regions of the world, and their steadfast wisdom will guide it on it\'s course.'
                        ],
                        [
                            'But first you must awaken the deku seedlings.',
                            'The goddess has left an instrument for this task.',
                            'Here, take it...'
                        ]
                    ]}
                />
                <ItemGet
                    isOpen={sequence.isAt('fluteGet')}
                    onFinished={sequence.next}
                    title='The Goddess Flute'
                    description="Use this to awake the deku seedlings"
                    asset="goddess-flute"
                    resumeParentTrack={false}
                />
                <SpeechStepper
                    display={sequence.isAt('luminaPromptsSong') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('luminaPromptsSong')}
                    onFinished={sequence.next}
                    groups={[
                        [
                            'Why dont you give it a try?'
                        ]
                    ]}
                />
                <SpeechStepper
                    display={sequence.isAt('seedsAwake') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('seedsAwake')}
                    onFinished={async () => {
                        await resolveEncounter('intro/beckoning', {})
                        router.push('/map')
                    }}
                    groups={[
                        [
                            'How remarkable!',
                            'I sense you have awakened the korok seedlings...',
                            'You should retrieve them, quickly, before they wander off!'
                        ]
                    ]}
                />
            </Column>
        </Column>
    )
}