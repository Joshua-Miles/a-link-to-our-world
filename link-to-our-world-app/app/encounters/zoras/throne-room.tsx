import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, Song, SongData, SongPlayer, Soundtrack, Speech, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { dragonRootTheme, fairyTheme, skyTheme, wildsTheme } from "shared";
import { router } from "expo-router";
import { useState } from "react";

import { Answer1C } from "../faron/tavon";

export default function () {
    const playerName = usePlayerName();

    const tavon = useResult(getEncounter, 'faron/tavon')

    const [song, setSong] = useState<SongData | null>(null);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'canYouPleaseHurry',
        'imSorry',
        'nowCanWeGoBackToMyVillage',
        'notYet',
        'song',
        'iSuppose',
        'queenSoraisResponse',
        'myVillageIsTarreyTown',
        'toTarreyTown'
    ])

    function handleFinished() {
        resolveEncounter('zoras/throne-room', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(tavon) || isAnyFailure(tavon)) {
        return null;
    }

    const answer1C = (tavon.state as any).answer1C as Answer1C;


    const iSuppose: Record<Answer1C, string[]> = {
        "Something could happen to the Kokiri while you're reading": [
            'Scribeleaf acted decisively, which saved the Koroks?',
            'I suppose that sometimes, it is appropriate to prioritize speed over analysis.',
            'Queen Sorais, I make a motion that we circumvent our normal process and mobilize a force to aide Emerson in addressing the whirlpool.'
        ],
        "Tavon will know more about what's going on than the books": [
            'Scribeleaf trusted Tavon\'s judgment, which saved the Koroks?',
            'Queen Sorais, I defer entirely to your judgement, and grant you full authority to rule on this matter irrespective of the bylaws written in this book.'
        ],
        "Sometimes you can learn more by seeing than reading": [
            'Scribeleaf defeated the Skull-kid without any research? Without any bylaws?',
            'I\'ve spent so many years slavishly devoted to these books...',
            'Queen Sorais, I believe it to be good and right to help Emerson with this trial, regardless of the recorded precedence.'
        ]
    }

    const queenSoraisResponse: Record<Answer1C, string[]> = {
        "Something could happen to the Kokiri while you're reading": [
            'I agree Consul. Time is of the essence, and we must do what we can to help.'
        ],
        "Tavon will know more about what's going on than the books": [
            'I appreciate your support Consul. I believe it to be good and right to help Emerson with this trial, regardless of the recorded precedence.'
        ],
        "Sometimes you can learn more by seeing than reading": [
            'I agree Consul. We have spent too long already deliberating, we must go out into the world to help improve it.'
        ]
    }

    const focus = sequence.select({
        canYouPleaseHurry: 'emerson',
        imSorry: 'auronis',
        nowCanWeGoBackToMyVillage: "emerson",
        notYet: "auronis",
        song: "",
        iSuppose: "auronis",
        queenSoraisResponse: "sorai",
        myVillageIsTarreyTown: "emerson",
        toTarreyTown: "sorai"
    })

    const label = sequence.select({
        canYouPleaseHurry: 'Emerson',
        imSorry: 'Auronis',
        nowCanWeGoBackToMyVillage: undefined,
        notYet: undefined,
        song: undefined,
        iSuppose: undefined,
        queenSoraisResponse: "Queen Sorai",
        myVillageIsTarreyTown: undefined,
        toTarreyTown: undefined
    })

    return (
        <Scene>
            <Soundtrack asset="zoras" isPlaying={!sequence.isAt('song')} />
            {!sequence.isAt('song') && focus && <SceneFocus
                asset={focus}
                label={label ?? undefined}
            />}
            <SpeechStepper
                hasStarted={sequence.hasReached('canYouPleaseHurry')}
                groups={[
                    ['Can you please hurry?', `I'm worried about my village, and I asked my daughter to wait back at the entrance of the domain...`],
                ]}
                onFinished={sequence.next}
            />
            <Dialog
                hasStarted={sequence.hasReached('imSorry')}
                tree={dialog(`I'm sorry Emmerson, but I can't do anything until that book gets here... Nerali should have had it here ages ago...`, {
                    'Here you go!': dialog('Oh, thank you kind stranger.')
                })}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('nowCanWeGoBackToMyVillage')}
                groups={[
                    [`Oh good! NOW can we go back to my village?`],
                ]}
                onFinished={sequence.next}
            />
            <Dialog
                hasStarted={sequence.hasReached('notYet')}
                tree={dialog(`Oh, no, we're only just getting started. I need to read through these bylaws to see if it is lawful for the Zora to muster a force in... what province was your village in again?`, {
                    'Couldn\'t you just help Emmerson?': dialog('Absolutely not, due process is due process. There is so much to read! Laws, studies on whirlpools...', {
                        'Let me sing you the ballad of Grinroot and his caution': dialog(`This seems an odd time for a song...`),
                        'Let me sing you the ballad of Fayflutter and her work ethic': dialog(`This seems an odd time for a song...`),
                        'Let me sing you the ballad of Scribeleaf and her reading': dialog(`This seems an odd time for a song...`),
                        'Let me sing you the ballad of Tumblebreeze and his inclusiveness': dialog(`This seems an odd time for a song...`)
                    })
                })}
                onFinished={(seletions) => {
                    const lastSelection = seletions.pop();
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
                }}      
            />
            {sequence.isAt('song') && song !== null &&
                <SongPlayer
                    song={song}
                    onFinished={sequence.next}
                />
            }
            <SpeechStepper
                hasStarted={sequence.hasReached('iSuppose')}
                groups={[
                    song === wildsTheme
                        ? iSuppose[answer1C]
                        : [`I said that would be weird, and it was weird... Gaurds, please escort this traveler away from the throne room.`]
                ]}
                onFinished={() => {
                    if (song === wildsTheme) {
                        sequence.next();
                    } else {
                        router.push('/map')
                    }
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('queenSoraisResponse')}
                groups={[
                    queenSoraisResponse[answer1C],
                    [ 'We shall muster a force to...', `What was the name of your village again?` ]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('myVillageIsTarreyTown')}
                groups={[
                    [ 'My village is named Terry Town.' ]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('toTarreyTown')}
                groups={[
                    [ 'Let us go forth with all haste to Tarrey Town!' ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
