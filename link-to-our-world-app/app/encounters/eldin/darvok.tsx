import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, Song, SongData, SongPlayer, Speech, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { dragonRootTheme, fairyTheme, skyTheme, wildsTheme } from "shared";
import { router } from "expo-router";
import { useState } from "react";

import { Answer1A } from "../lurelin/intro";

export default function () {
    const playerName = usePlayerName();

    const intro = useResult(getEncounter, 'lurelin/intro')

    const [song, setSong] = useState<SongData | null>(null);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'notNowGoro',
        'song',
        'songResponse',
        'iGuess'
    ])

    function handleFinished() {
        resolveEncounter('eldin/darvok', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1A = (intro.state as any).answer1A as Answer1A;

    const responses: Record<string, DialogNode> = {
        'I need to enter the Fire Temple': dialog(`Sorry bud, but the key is back with the rest of the tribe, I don't have time to get it right now.`),
        'Let me sing you the ballad of Grinroot and his caution': dialog(`Well, I guess it won't hurt to listen while I dig...`),
        'Let me sing you the ballad of Fayflutter and her work ethic': dialog(`Well, I guess it won't hurt to listen while I dig...`),
        'Let me sing you the ballad of Scribeleaf and her reading': dialog(`Well, I guess it won't hurt to listen while I dig...`),
        'Let me sing you the ballad of Tumblebreeze and his inclusiveness': dialog(`Well, I guess it won't hurt to listen while I dig...`)
    }

    const letsRejoinTheTribe: Record<Answer1A, string[][]> = {
        "It's dangerous to go alone": [[
            `Okay squad, let's fall back and rejoin the tribe. We'll be safer together.`
        ]],
        "You should look before running into new areas": [
            [`Okay squad, let's throw a torch down one of these shafts and see what we're digging towards...`],
            [`...${playerName?.toUpperCase()}! Do you see that giant monster down the shaft?`],
            [`Quick squad, back to the rest of the tribe!`]
        ],
        "We need you to keep us safe": [[
            `Okay squad, let's fall back and rejoin the tribe. I need to make sure they're taken care of.`
        ]]
    }

    return (
        <Scene>
            {!sequence.isAt('song') && <SceneFocus
                height="30%"
                asset="darvok"
                label="Darvok"
            />}
            <Dialog
                hasStarted={sequence.hasReached('notNowGoro')}
                tree={dialog(`Thanks for the milk! Sorry I can't chat, but we're making faster time than we have all week!`, responses)}
                onFinished={(seletions) => {
                    const lastSelection = seletions.pop();
                    if (lastSelection === `I need to enter the Fire Temple`) {
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
                    song === dragonRootTheme
                        ? [`Grinroot encouraged Tidebane to be more cautious?`, `And it saved you?`]
                        : [`That was a very lovely story. Now back to digging...`]
                ]}
                onFinished={() => {
                    if (song === dragonRootTheme) {
                        sequence.next();
                    } else {
                        router.push('/map')
                    }
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('iGuess')}
                groups={[
                    ['Maybe we should slow up our digging for a minute...'],
                    ...letsRejoinTheTribe[answer1A]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
