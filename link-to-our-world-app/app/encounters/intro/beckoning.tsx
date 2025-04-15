import { isLoading } from "@triframe/utils-react"
import { resolveEncounter } from "api";
import { Assets, ItemGet, SongPlayer, Soundtrack, SpeechCard, SpeechStepper, SubjectImage, useSequence } from "shared"
import { zeldasLullaby, usePlayerName } from "shared";
import { Column, timing, useDesignerTheme } from "designer-m3"
import { router } from "expo-router";

export default () => {
    const { spacing } = useDesignerTheme();
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true }, [
        'impaEnters',
        'impasSpeech',
        'fluteGet',
        'luminaPromptsSong',
        'playSong',
        'luminaReturns',
        'seedsAwake',
        'impaSends'
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
                    opacity: timing(2000).then(sequence.next),
                }}
            >
                <SubjectImage source={Assets['impa']} />
            </Column>
            <Column flex={1} alignItems="center">
                <SpeechStepper
                    display={sequence.hasNotPassed('impasSpeech') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('impasSpeech')}
                    onFinished={sequence.next}
                    groups={[
                        [
                            `Welcome, ${playerName}, to the Sacred Grove.`,
                            'I am Impa, it\'s caretaker.',
                        ],
                        [
                            `You now stand where the goddess sung the world into existence.`,
                            'And where, with a great demise descending, the goddess chose to hide her most precious creation: the Korok seedlings, which breathe life into Hyrule.',
                        ],
                        [
                            'You have been chosen to summon the seedlings, and plant them across the land.',
                            'The goddess has left a powerful tool to aid in this quest.',
                            'Here take it...'
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
                <SpeechCard 
                    asset="lumina-avatar"
                    display={sequence.isAt('luminaPromptsSong') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('luminaPromptsSong')}
                    onFinished={sequence.next}
                    text={[
                        'Why don\'t you try playing?'
                    ]}
                />
                <SpeechCard 
                    asset="lumina-avatar"
                    display={sequence.isAt('seedsAwake') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('seedsAwake')}
                    onFinished={sequence.next}
                    text={[
                        'I sense that your song has awakened the seedlings.'
                    ]}
                />
                <SpeechStepper
                    display={sequence.isAt('impaSends') ? 'flex' : 'none'}
                    hasStarted={sequence.hasReached('impaSends')}
                    onFinished={async () => {
                        await resolveEncounter('intro/beckoning', {})
                        router.push('/map')
                    }}
                    groups={[
                        [
                            'Quickly, you should gather them before they wander off! ',
                        ]
                    ]}
                />
            </Column>
        </Column>
    )
}