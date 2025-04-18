import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { Answer1B } from "./intro";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'sureIsScary',
        'combat',
        'thankYouFayflutter',
        'willYouSingMeALullaby',
        'fayflutterShouldBePlanted'
    ])

    function handleFinished() {
        resolveEncounter('floria/bog-dobber', {})
        router.push('/map')
    }

    const intro = useResult(getEncounter, 'floria/intro');

    const playerName = usePlayerName();

    if (isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1B = (intro.state as any).answer1B as Answer1B;   

    const thankYouFayflutter: Record<Answer1B, string> = {
        "We have a job to do": "And thank you, Fayflutter, for reminding me that I have a job to do",
        "We should see if the Faries need help ": "And thank you, Fayflutter, for reminding me to always work hard to help others!",
        "If we work a little more now, then we can rest ": "And thank you, Fayflutter, for reminding me to always do the hard-things first."
    }

    return (
        <Scene>
            <Soundtrack asset="floria-battle" />
            <Soundtrack isPlaying={sequnece.hasReached('thankYouFayflutter')} asset="floria" />
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus asset="nimri" />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('sureIsScary')}
                    groups={[[`That bog-dobber sure is scary up close! Let's fight it together, ${playerName}`]]}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="bog-dobber"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('combat') && <>
                <SceneFocus
                    asset={sequnece.hasNotReached('willYouSingMeALullaby') ? 'nimri' : 'fayflutter'}
                />
                <SpeechStepper
                    groups={[
                        [ "Thank you for fighting the bog-dobber with me!"],
                        [ thankYouFayflutter[answer1B] ]
                    ]}
                    hasStarted={sequnece.hasReached('thankYouFayflutter')}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('willYouSingMeALullaby')}
                    groups={[[ 
                        "You're welcome!", 
                        `${playerName}, will you sing me a lullaby?`
                    ]]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="lumina-avatar"
                    text={[ 
                        `${playerName}, I think that Fayflutter is tired is an indication that it is the appointed time for her to be planted.`,
                        `Nearby is a good spot to play her a lullaby on the goddess flute; I have marked it on your map.`
                     ]}
                    hasStarted={sequnece.hasReached('fayflutterShouldBePlanted')}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}