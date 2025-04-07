import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, ItemGet, Scene, SceneFocus, SpeechCard, SpeechStepper, useFirstKorok, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";
import { Answer1A } from "./intro";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'groundIsShaking',
        'youStayHere',
        'dontGoAlone',
        'youreRight',
        'combat',
        'thankYou',
        'thunderHelm',
        'thankYouGrinroot',
        'willYouSingMeALullaby',
        'grinRootShouldBePlanted'
    ])

    function handleFinished() {
        resolveEncounter('lurelin/moldarach', {})
        router.push('/map')
    }

    const intro = useResult(getEncounter, 'lurelin/intro');

    const remainingKorok = useFirstKorok([ 'scribeleaf', 'fayflutter', 'fayflutter', 'grinroot' ])

    const playerName = usePlayerName();

    if (isLoading(intro) || isAnyFailure(intro)) {
        return null;
    }

    const answer1A = (intro.state as any).answer1A as Answer1A;

    const dontGoAlone: Record<Answer1A, string> = {
        "It's dangerous to go alone": "You shouldn't go alone! It's dangerous.",
        "You should look before running into new areas": "Wait! We should watch first.",
        "We need you to keep us safe": "You aren't going to leave us alone, are you?"
    }

    const youreRight: Record<Answer1A, string> = {
        "It's dangerous to go alone": `Ay, you're right little sprout. Stick close to me, ${playerName}, and we'll make short work o' this!`,
        "You should look before running into new areas": `Ay, you're right little sprout... Woah! Did yee see that thing break the surface o' the sand? I can see it moving now. Alright then, stick close to me,  me, ${playerName}, and we'll make short work o' this!`,
        "We need you to keep us safe": `I'd never dream of it, little sprout. Alright then, stick close to me, ${playerName}, and we'll make short work o' this!`
    }

    const thankYouGrinroot: Record<Answer1A, string> = {
        "It's dangerous to go alone": "And, thank ye, wee sprout, fer pointin' out that no pirate should face danger solo!",
        "You should look before running into new areas": "And thank ye, little sprout, fer remindin' me to look 'fore I charge in like a madman!",
        "We need you to keep us safe": "And thank ye, ye wee sprout, fer remindin' me to stick close to me crew and keep 'em safe!"
    }

    return (
        <Scene>
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus
                    asset={sequnece.isAt('groundIsShaking') ? remainingKorok : 'tidebane'}
                />
                <SpeechStepper
                    groups={[["Ahhh! The GROUND is shaking!"]]}
                    hasStarted={sequnece.hasReached('groundIsShaking')}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    groups={[["What in tarnation? Ye stay here, while I have a gander at it, savvy? "]]}
                    hasStarted={sequnece.hasReached('youStayHere')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="grinroot"
                    text={[ dontGoAlone[answer1A] ]}
                    hasStarted={sequnece.hasReached('dontGoAlone')}
                    onFinished={sequnece.next}
                />
                 <SpeechStepper
                    groups={[[ youreRight[answer1A] ]]}
                    hasStarted={sequnece.hasReached('youreRight')}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="moldarach"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('combat') && <>
                <SceneFocus
                    asset={sequnece.hasNotReached('willYouSingMeALullaby') ? 'tidebane' : 'grinroot'}
                />
                <SpeechStepper
                    groups={[[ "I'd never have cut down that Moldarach on my own. Thank you for your help. Please take this as a token of my appreciation. It's been passed down in my family 8 generations."] ]}
                    hasStarted={sequnece.hasReached('thankYou')}
                    onFinished={sequnece.next}
                />
                <ItemGet 
                    title="The Thunderhelm"
                    description="An ancient relic of a time long past"
                    asset='thunderhelm'
                    isOpen={sequnece.isAt('thunderHelm')}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    groups={[[ thankYouGrinroot[answer1A] ]]}
                    hasStarted={sequnece.hasReached('thankYouGrinroot')}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    groups={[[ 
                        "You're welcome!", 
                        `${playerName}, will you sing me a lullabye?`
                    ]]}
                    hasStarted={sequnece.hasReached('willYouSingMeALullaby')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="lumina-avatar"
                    text={[ 
                        `${playerName}, I think that Grinroot is tired is an indication that it is the appointed time for him to be planted.`,
                        `Nearby is a good spot to play him a lullaby on the goddess flute; I have marked it on your map.`
                     ]}
                    hasStarted={sequnece.hasReached('grinRootShouldBePlanted')}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}