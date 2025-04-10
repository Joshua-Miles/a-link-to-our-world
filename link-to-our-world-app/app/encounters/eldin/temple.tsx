import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const fyrus = useResult(getEncounter, 'eldin/fyrus');

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(fyrus) || isAnyFailure(fyrus)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="locked-door" />
            {(fyrus && fyrus.resolved) 
                ? <>
                    <SpeechStepper
                        hasStarted={true}
                        groups={[
                            [ `WHHHHHOOOOM-THUD` ],
                            [ 'The place to water the Korok Seedling is just ahead...']
                        ]}
                        onFinished={() => {
                            resolveEncounter('eldin/temple', {});
                            router.push('/map');
                        }}
                    />
                
                </>
                :  <SpeechStepper
                        hasStarted={true}
                        groups={[
                            ['The door is locked...']
                        ]}
                        onFinished={() => {
                            router.push('/map')
                        }}
                />
            }
        </Scene>
    )
}
