import { resolveEncounter } from "api";
import { Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const sequnece = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'theseArePotions',
        'iKnowTheLocations',
        'quicklyToTheTemples'
    ])

    const playerName = usePlayerName();

    function handleFinished() {
        resolveEncounter('interlude/vials', {})
        router.push('/map')
    }

    return (
        <Scene>
            {sequnece.isAt('intro') && <>
                <SpeechStepper
                    justifyContent="center"
                    groups={[['Did you find the vials?']]}
                    hasStarted={sequnece.hasReached('intro')}
                    onFinished={sequnece.next}
                />
            </>}
            {sequnece.hasPassed('intro') && <>
                <SceneFocus asset={sequnece.hasNotPassed('theseArePotions') ? 'impa' : 'lumina'} />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('theseArePotions')}
                    groups={[
                        [ 
                            'These are potions I have mixed to nurture the Koroks as they grow.' ,
                            `As Gorruk visits each temple, and attempts to master each force, I fear he will stir up chaos in his wake.`,
                            `But if you water the earth at each temple with these potions, the koroks will grow to restore and protect the area.`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechStepper
                    hasStarted={sequnece.hasReached('iKnowTheLocations')}
                    groups={[
                        [
                            `${playerName}, I know the locations of the 4 temples:`,
                            `The Lighting Temple of Gerudo Desert`,
                            `The Fire Temple of Eldin Volcano`,
                            `The Water Temple of Zora's Domain`,
                            `The Ice Temple of Hebra Peak`
                        ],
                        [
                            `I have marked these locations on your map.`
                        ]
                    ]}
                    onFinished={sequnece.next}
                />
                <SpeechCard
                    hasStarted={sequnece.hasReached('quicklyToTheTemples')}
                    asset="impa-avatar"
                    text={[ `Quicky, ${playerName}, you must water the temples!` ]}
                    onFinished={sequnece.next}
                />
            </>}
        </Scene>
    )
}