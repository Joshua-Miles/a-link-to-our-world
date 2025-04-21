import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { Combat, ItemGet, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { Answer1D } from "./kyllis";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'woah',
        'combat',
        'whatIsYourName',
        'myNameIsTumblebreeze',
        'thankYouTumblebreeze',
        'dontThinkLessOfPeopleWhoAreDifferent',
        'tumblebreezeShouldBePlanted',
        'thankYou',
        'heartContainer'
    ])

    function handleFinished() {
        resolveEncounter('necluda/argorok', {})
        router.push('/map')
    }

    const kyllis = useResult(getEncounter, 'necluda/kyllis');

    const playerName = usePlayerName();

    if (isLoading(kyllis) || isAnyFailure(kyllis)) {
        return null;
    }

    const answer1D = (kyllis.state as any).answer1D as Answer1D;   

    const dontThinkLessOfPeopleWhoAreDifferent: Record<Answer1D, string[]> = {
        "The goddess made them": [ "All living things were created by the goddess, you should probably hear them out...", "UNLESS they're breathing fire balls at you"],
        "People who are different have different strengths": ["I figured the Keese knew more about caves than me"],
        "Just because someone's different doesn't mean you should be scared of them": ["Just because someone's different doesn't mean you have to be scared of them", "UNLESS they're breathing fire balls at you"]
    }

    return (
        <Scene>
            <Soundtrack asset="necluda-battle" />
            <Soundtrack isPlaying={sequnece.hasReached('whatIsYourName')} asset="necluda" /> 
            {sequnece.hasNotReached('combat') && <>
                <SceneFocus asset="argorok" />
                <SpeechCard
                    hasStarted={sequnece.hasReached('woah')}
                    asset="kyllis-avatar"
                    text={[
                        `WOAH- I just missed that fireball! Do you see that dragon coming up behind us?`,
                        `He just flew out of the cave we were going to take!`,
                        `Woah, another fireball. Okay ${playerName}, I'll swing in close, you see if you can land a hit on him, before he turns us to ash!`
                    ]}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.isAt('combat') && <>
                <Combat
                    asset="argorok"
                    fortitude={50}
                    damage={2}
                    speed={10000}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('combat') && <>
                <SceneFocus
                    asset={sequnece.isAt('whatIsYourName') || sequnece.isAt('thankYouTumblebreeze') ? 'kyllis' : 'tumblebreeze'}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('whatIsYourName')}
                    groups={[[ "Little seedling, what's your name?"] ]}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('myNameIsTumblebreeze')}
                    groups={[[ "My name is Tumblebreeze."] ]}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('thankYouTumblebreeze')}
                    groups={[
                        [ "Tumblebreeze, we would have been powerless against that thing if we hadn't listened to that Keese."],
                        [ "Thank you for taking them seriously." ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('dontThinkLessOfPeopleWhoAreDifferent')}
                    groups={[
                        dontThinkLessOfPeopleWhoAreDifferent[answer1D], 
                        [
                            `I'm a little tired- will you sing me a lullaby?`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="lumina-avatar"
                    text={[ 
                        `${playerName}, I think that Tumblebreeze is tired is an indication that it is the appointed time for him to be planted.`,
                        `Nearby is a good spot to play him a lullaby on the goddess flute; I have marked it on your map.`
                     ]}
                    hasStarted={sequnece.hasReached('tumblebreezeShouldBePlanted')}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    asset="kyllis"
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
        </Scene>
    )
}