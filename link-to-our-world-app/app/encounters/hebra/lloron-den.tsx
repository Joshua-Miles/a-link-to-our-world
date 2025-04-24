import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, Scene, SceneFocus, Song, SongData, SongPlayer, Soundtrack, Speech, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { dragonRootTheme, fairyTheme, skyTheme, wildsTheme } from "shared";
import { router } from "expo-router";
import { useState } from "react";

import { Answer1B } from "../floria/intro";

export default function () {
    const playerName = usePlayerName();

    const intro = useResult(getEncounter, 'floria/intro')

    const [song, setSong] = useState<SongData | null>(null);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'thurnokTurnOutThatLight',
        'excuseMe',
        'sorryFriendWereHibernating',
        'butItsTooEarlyToHibernate',
        'itsALittleEarly',
        'song',
        'songResponse',
        'iGuess'
    ])

    function handleFinished() {
        resolveEncounter('hebra/lloron-den', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1B = (intro.state as any).answer1B as Answer1B;

    const iGuess: Record<Answer1B, string[][]> = {
        "We have a job to do": [
            ['I guess it is our job to keep the mountains clear of snow throughout the summer...']
        ],
        "We should see if the Faries need help ": [
            ['I guess the animals of the mountains are counting on us to keep the mountains clear of snow for them...']
        ],
        "If we work a little more now, then we can rest ": [
            ['I guess we can clear the mountains of snow, and THEN rest well, knowing that we\'ve done our job.']
        ]
    }

    const focus = sequence.select({
        thurnokTurnOutThatLight: 'thurnok',
        excuseMe: 'thurnok',
        sorryFriendWereHibernating: 'yulma',
        butItsTooEarlyToHibernate: 'yulma',
        itsALittleEarly: 'yulma',
        song: undefined,
        songResponse: 'yulma',
        iGuess: 'yulma'
    })

    const label = sequence.select({
        thurnokTurnOutThatLight: 'Thurnok',
        excuseMe: undefined,
        sorryFriendWereHibernating: 'Yulma',
        butItsTooEarlyToHibernate: undefined,
        itsALittleEarly: undefined,
        song: undefined,
        songResponse: undefined,
        iGuess: undefined
    })

    return (
        <Scene>
            <Soundtrack asset="hebra" isPlaying={!sequence.isAt('song')} />
            {!sequence.isAt('song') && focus && <SceneFocus
                height="30%"
                asset={focus}
                label={label ?? undefined}
            />}
            <SpeechCard
                hasStarted={sequence.hasReached('thurnokTurnOutThatLight')}
                asset="eskra-avatar"
                text={[ 'Thurnok, turn out the light!', `It's time to go to bed.`]}
                onFinished={sequence.next}
            />
            <Dialog
                hasStarted={sequence.hasReached('excuseMe')}
                tree={dialog(``, {
                    'Excuse me...': dialog(`...I'm trying to turn the light out Eskra. Yulma, will you please help this Friendo?`)
                })}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('sorryFriendWereHibernating')}
                groups={[[ `Sorry Friendo, but we're just about to hibernate. Would you mind coming back in the spring?` ]]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('butItsTooEarlyToHibernate')}
                asset="kyllis-avatar"
                text={[ `But it's the middle of summer!`, `It's much too early to hibernate...`]}
                onFinished={sequence.next}
            />
            <Dialog
                hasStarted={sequence.hasReached('itsALittleEarly')}
                tree={dialog(`I know it's a little early, but it's been getting cold early this year, and sleep sounds sooooo GOOOOOD...`, {
                    'Let me sing you the ballad of Grinroot and his caution': dialog(`If you must... I won't promise to stay awake for all of it...`),
                    'Let me sing you the ballad of Fayflutter and her work ethic': dialog(`If you must... I won't promise to stay awake for all of it...`),
                    'Let me sing you the ballad of Scribeleaf and her reading': dialog(`If you must... I won't promise to stay awake for all of it...`),
                    'Let me sing you the ballad of Tumblebreeze and his inclusiveness': dialog(`If you must... I won't promise to stay awake for all of it...`)
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
                hasStarted={sequence.hasReached('songResponse')}
                groups={[
                    song === fairyTheme
                        ? [`Fayfultter encouraged Nimri to work hard even when she didn't feel like it?`, `And it saved the fairies?`]
                        : [`*YAWN*, thank you for the story, that puts me right to sleep...`]
                ]}
                onFinished={() => {
                    if (song === fairyTheme) {
                        sequence.next();
                    } else {
                        router.push('/map')
                    }
                }}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('iGuess')}
                groups={[
                    ...iGuess[answer1B],
                    [ 'Okay Llorons!' ],
                    [ 'Time to get up and Adam...' ],
                    [ 'Seriously, break out the coffee...' ],
                    [ `We're going to clear the mountains of snow, one more time this season.` ],
                    [ `Starting at the peak...` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
