import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, Song, SongData, SongPlayer, Speech, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { dragonRootTheme, fairyTheme, skyTheme, wildsTheme } from "app/shared/testSongs";
import { router } from "expo-router";
import { useState } from "react";

import { Answer1D } from "../necluda/kyllis";

export default function () {
    const playerName = usePlayerName();

    const tidebane = useResult(getEncounter, 'gerudo/tidebane');

    const kyllis = useResult(getEncounter, 'necluda/kyllis')

    const [song, setSong] = useState<SongData | null>(null);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'letHimIn',
        'whatBringsYouToMyCourt',
        'song',
        'songResponse',
        'iGuess',
        'tidebanesStory',
        'leadUsToTheRobotRebellion'
    ])

    function handleFinished() {
        resolveEncounter('gerudo/ravia', {});
        router.push('/map');
    }

    if (isLoading(tidebane) || isAnyFailure(tidebane) || isLoading(kyllis) || isAnyFailure(kyllis)) {
        return null;
    }

    const answer1D = (kyllis.state as any).answer1D as Answer1D;

    const iHatePirates: Record<Answer1D, string> = {
        "The goddess made them": "I have no respect for Pirates whatsoever.",
        "People who are different have different strengths": "What would a Pirate know of a plot in Gerudo town?",
        "Just because someone's different doesn't mean you should be scared of them": "I'm scared that if I trust a Pirate, they will let me down again."
    }

    const iGuess: Record<Answer1D, string> = {
        "The goddess made them": "I guess that Tidbane is the creation of Hylia, just like the Gerudo...",
        "People who are different have different strengths": "I guess Tidebane would be pretty knowledgable about the dealings and plots of the underworld...",
        "Just because someone's different doesn't mean you should be scared of them": "I guess Tidebane isn't trying to do us any harm..."
    }

    const responses: Record<string, DialogNode> = {
        'I need to enter the Lightning Temple': dialog('I cannot let just anyone enter the sacred Lightning Temple. I\'m sorry.',)
    }

    if (tidebane && tidebane.resolved) {
        responses['You should listen to Tidebane!'] = dialog(`Gerudo have a long-standing distrust of the Pirates of Lurelin village. You see, long ago, a group of Gerudo men rebeled, stole the royal ships, and sailed down Gerudo river to the coast. ${iHatePirates[answer1D]}`, {
            'Let me sing you the ballad of Grinroot and his caution': dialog(`I'm listening...`),
            'Let me sing you the ballad of Fayflutter and her work ethic': dialog(`I'm listening...`),
            'Let me sing you the ballad of Scribeleaf and her reading': dialog(`I'm listening...`),
            'Let me sing you the ballad of Tumblebreeze and his inclusiveness': dialog(`I'm listening...`)
        })
    }

    return (
        <Scene>
            {!sequence.isAt('song') && <SceneFocus
                height="30%"
                asset={
                    !sequence.hasReached('whatBringsYouToMyCourt') ? 'robot'
                        : sequence.isAt('tidebanesStory') ? 'tidebane'
                            : 'ravia'
                }
                label={sequence.isAt('intro') ? 'GD-003D' : undefined}
            />}
            <SpeechStepper
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [`Bzzzrt, you are not permitted to enter the high court of princess Ravia`]
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('letHimIn')}
                asset="ravia-avatar"
                text={['Let him in GD-003D.']}
                onFinished={sequence.next}
            />
            <Dialog
                hasStarted={sequence.hasReached('whatBringsYouToMyCourt')}
                tree={dialog(`Vasaaq. I am princess Ravia of the Gerudo. What brings you to my courts?`, responses)}
                onFinished={(seletions) => {
                    const lastSelection = seletions.pop();
                    if (lastSelection === `I need to enter the Lightning Temple`) {
                        router.push('/map')
                    } else {
                        if (lastSelection?.includes('Grinroot')) {
                            setSong(dragonRootTheme)
                        }
                        if (lastSelection?.includes('Fayflutter')) {
                            setSong(fairyTheme)
                        }
                        if (lastSelection?.includes('Scribeleaf')) {
                            setSong(wildsTheme)
                        }
                        if (lastSelection?.includes('Tumblebreeze')) {
                            setSong(skyTheme)
                        }
                        sequence.next()
                    }
                }}
            />
            {sequence.isAt('song') && song !== null &&
                <SongPlayer
                    song={song}
                    onFinished={sequence.next}
                />}
            <SpeechStepper
                hasStarted={sequence.hasReached('songResponse')}
                groups={[
                    song === skyTheme
                        ? [`Tumblebreeze trusted the Keese? And it saved you?`]
                        : [`That was a very lovely story. But I remain unmoved. I'm sorry.`]
                ]}
                onFinished={() => {
                    if (song === skyTheme) {
                        sequence.next();
                    } else {
                        router.push('/map')
                    }
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('iGuess')}
                groups={[
                    [iGuess[answer1D]],
                    ['GD-003D, go get Tidebane.']
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('tidebanesStory')}
                groups={[
                    ['Me thanks, Princess Ravia— for agreeing to hear me out.', `There be mutiny brewin' in the ranks o' some o' yer metal-hearted crew, Princess.`],
                    [`An old rustbucket, forged by me no-good forebears, be schemin' to seize yer throne.`, `I've got wind o' where them traitorous dogs be makin' camp.`],
                    [`We can snuff out this treachery 'fore it draws its first breath`]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('leadUsToTheRobotRebellion')}
                groups={[
                    [`I can't believe it!`],
                    [`Lead the way, Tidebane. I want to see this with my own eyes...`]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
