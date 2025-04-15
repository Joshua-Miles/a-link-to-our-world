import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, DialogNode, ItemGet, Scene, SceneFocus, Song, SongData, SongPlayer, Speech, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { dragonRootTheme, fairyTheme, skyTheme, wildsTheme } from "shared";
import { router } from "expo-router";
import { useState } from "react";

import { Answer1C } from "../faron/tavon";

export default function () {
    const playerName = usePlayerName();

    const tavon = useResult(getEncounter, 'faron/tavon')

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet',
        'inTheThroneRoom',
        'markedOnYourMap',
        'comeBackWhenYoureDone'
    ])

    function handleFinished() {
        resolveEncounter('zoras/nerali', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isLoading(tavon) || isAnyFailure(tavon)) {
        return null;
    }

    const answer1C = (tavon.state as any).answer1C as Answer1C;

    return (
        <Scene>
            <SceneFocus
                asset="nerali"
                label="Nerali"
            />
            <Dialog
                hasStarted={sequence.hasReached('intro')}
                tree={dialog(`Hi! Welcome to Zora's domain. What brings you here?`, {
                    'I need to enter The Water Temple': dialog('Ah, lucky for you, I have the key!... However... Would you be willing to do me a favor first?', {
                        'Sure!': dialog('Great! All I need you to do is take this book to Consul Auronis. He sent for it a while ago.'),
                        'No!': dialog(`That's rude! Well in that case, let me think on your request for The Water Temple key for a bit...`)
                    })
                })}
                onFinished={(seletions) => {
                    const lastSelection = seletions.pop();
                    if (lastSelection === `No!`) {
                        router.push('/map')
                    } else {
                        sequence.next()
                    }
                }}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset="book"
                title="Book"
                description="Bring this to Consul Auronis"
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('inTheThroneRoom')}
                groups={[
                    [ `You'll find Consul Auronis in the Throne Room of Queen Sorai.` ]
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard 
                hasStarted={sequence.hasReached('markedOnYourMap')}
                asset="lumina-avatar"
                text={[ `${playerName}, I've marked the location of the throne room on your map` ]}
                onFinished={sequence.next}
            />
             <SpeechStepper
                hasStarted={sequence.hasReached('comeBackWhenYoureDone')}
                groups={[
                    [ `Just come back when you're done, and I'll give you the key to The Water Temple` ]
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
