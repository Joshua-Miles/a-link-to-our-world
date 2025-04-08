import { resolveEncounter } from "api";
import { Scene, SceneFocus, SpeechStepper, usePlayerName } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    function handleFinished() {
        resolveEncounter('necluda/intro', {})
        router.push('/map')
    }

    return (
        <Scene>
            <SceneFocus asset="lumina" />
            <SpeechStepper
                hasStarted={true}
                onFinished={handleFinished}
                groups={[[
                    `${playerName}, welcome to Necluda Cliffs.`,
                    `This imposing cliff-side gives rise to the Hebra Mountains beyond, and is home to the vigilant Rito.`,
                    `We should find Kyllis, the leader of the Rito, to see if he knows where we should plant a Korok seedling.`
                ]]}
            />
        </Scene>
    )
}