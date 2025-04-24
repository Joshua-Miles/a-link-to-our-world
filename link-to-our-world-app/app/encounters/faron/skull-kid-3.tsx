import { getEncounter, resolveEncounter } from "api";
import { Combat, ItemGet, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { Answer1C } from "./tavon";
import { isLoading, useResult } from "@triframe/utils-react";
import { isAnyFailure } from "@triframe/ambassador";

export default function () {
    const playerName = usePlayerName();

    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'letsDoThis',
        'combat',
        'thankYouScribeleaf',
        'imGlad',
        'scribeleafShouldBePlanted',
        'thankYou',
        'heartContainer',
        'meanwhile',
        'gorrukFindsTheDemonFlute'
    ])

    function handleFinished() {
        resolveEncounter('faron/skull-kid-3', {})
        router.push('/map')
    }

    const tavon = useResult(getEncounter, 'faron/tavon');

    if (isLoading(tavon) || isAnyFailure(tavon)) {
        return null;
    }

    const answer1C = (tavon.state as any).answer1C as Answer1C;   
    
    const imGlad: Record<Answer1C, string> = {
        "Something could happen to the Kokiri while you're reading": `I'm just glad that I read while we were walking- I'm glad we saved the Kokiri before any of them were hurt!`,
        "Tavon will know more about what's going on than the books": `Thank you for telling me where to start reading! It's good to have help knowing what to read.`,
        "Sometimes you can learn more by seeing than reading": `It definitely took more than reading to save the Kokiri in the end- I'm glad I got to help stop him disappearing again.`
    }

    return (
        <Scene>
            <Soundtrack asset="faron-battle" />
            <Soundtrack isPlaying={sequnece.hasReached('thankYouScribeleaf')} asset="faron" />
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus asset="skull-kid" />
                <SpeechCard
                    hasStarted={sequnece.hasReached('letsDoThis')}
                    asset="tavon"
                    text={[ `Okay ${playerName}, let's do this, one more time!` ]}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="skull-kid"
                    fortitude={30}
                    damage={1}
                    speed={2000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.has({ passed: 'combat', notReached: 'meanwhile'}) && <>
                <SceneFocus
                    asset={sequnece.hasNotReached('imGlad') ? 'tavon' : 'scribeleaf'}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('thankYouScribeleaf')}
                    groups={[
                        [
                            `Woah!  Scribeleaf, you managed to knock the flute out of his hand!`,
                            `And he didn't disappear this time.`
                        ],
                        [
                            `Look, here come the other Kokiri out of the woods!`,
                            `They're safe!`
                        ],
                        [
                            `Scribeleaf, thank you for reading about the flute to help us fight the piper.`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('imGlad')}
                    groups={[
                        [
                            imGlad[answer1C]
                        ],
                        [
                           `I just wish I'd seen where that flute had flown...`
                        ],
                        [
                            `Anyway, I'm a little tired- will you sing me a lullaby?`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="lumina-avatar"
                    text={[ 
                        `${playerName}, I think that Scribeleaf is tired is an indication that it is the appointed time for her to be planted.`,
                        `Nearby is a good spot to play her a lullaby on the goddess flute; I have marked it on your map.`
                     ]}
                    hasStarted={sequnece.hasReached('scribeleafShouldBePlanted')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="tavon"
                    text={[
                         `Before you leave, ${playerName}, please take this, as a token of our appreciation.`,
                    ]}
                    hasStarted={sequnece.hasReached('thankYou')}
                    onFinished={sequnece.next}
                />
                <ItemGet 
                    title="Heart Container"
                    description="This will increase your max health by 1"
                    asset='heart-container'
                    isOpen={sequnece.isAt('heartContainer')}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasReached('meanwhile') && <>
                <Soundtrack asset="gorruk-theme-1" />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('meanwhile')}
                    justifyContent="center"
                    groups={[[ 'MEANWHILE...' ]]}
                    onFinished={sequnece.next}
                />
                {sequnece.hasReached('gorrukFindsTheDemonFlute') && <SceneFocus asset="gorruk" />}
                <SpeechStepper
                    hasStarted={sequnece.hasReached('gorrukFindsTheDemonFlute')}
                    groups={[
                        [
                            `...98.6% chance of beating me...`,
                            `I guess she was right...`,
                            `Once I've gotten a little stronger, I'll face that Hylian again.`
                        ],
                        [
                            `Woah! What's this?`,
                            `The Demon flute?`
                        ],
                        [
                            `It would be terrible for this to fall into the wrong hands and be used by somebody!`,
                            `Best take it with me for safe keeping.`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}