import { resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, useSequence } from "shared";
import { useFirstKorok } from "shared";
import { router } from "expo-router";

export default function () {

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'woah',
        'tidbanesIntro'
    ])

    function handleFinished() {
        resolveEncounter('lurelin/tidebane', {})
        router.push('/map')
    }

    const remainingKorok = useFirstKorok([ 'tumblebreeze', 'fayflutter', 'scribeleaf', 'grinroot' ])

    return (
        <Scene>
            <SceneFocus asset="tidebane" />
            <SpeechCard 
                asset={remainingKorok} 
                text={[ "Woah! Are you a real pirate?" ]} 
                hasStarted={sequence.hasReached('woah')}
                onFinished={sequence.next}
            />
            <Dialog
                tree={dialog('Arrr, ye best believe it, ya wee sprout. Me family\'s been sailin\' the high seas for eight generations, ever since me ancestors swiped a ship from Gerudo Town and set sail fer the open waters. An\' who be ye, then??', {
                    'We\'re on a mission from the goddess': dialog('I reckon there ain\'t many left who still put stock in the goddess... but then again, I can\'t lay me eyes on these wee sprouts without thinkin\' there\'s somethin’ divine at work, arrr.' 
                        + ' What can I do fer ye, matey?', {
                            "We are looking for a good place to plant a seedling": dialog("I be knowin' a place a wee bit down the shore- follow me "),
                            "nevermind": dialog("See ye around...")
                    }),
                    "We're on an adventure": dialog("With these wee sprouts? Aye, that's a sure sign of an adventure mighty worth sailin' for!" 
                        + ' What can I do fer ye, matey?', {
                            "We are looking for a good place to plant a seedling": dialog("I be knowin' a place a wee bit down the shore- follow me "),
                            "nevermind": dialog("See ye around...")
                    }),
                    "We're out for a stroll": dialog("'tis a fine day fer a wander, it be. Especially with such adorable little sprouts as these." 
                        + ' What can I do fer ye, matey?', {
                            "We are looking for a good place to plant a seedling": dialog("I be knowin' a place a wee bit down the shore- follow me "),
                            "Nevermind": dialog("See ye around...")
                    })
                })}
                hasStarted={sequence.hasReached('tidbanesIntro')}
                onFinished={(selections) => {
                    if (selections.pop() === 'nevermind') {
                        router.push('/')
                    }
                    sequence.next();
                }}
            />
        </Scene>
    )
}