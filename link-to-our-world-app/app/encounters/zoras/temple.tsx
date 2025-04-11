import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const tentalus = useResult(getEncounter, 'zoras/tentalus');

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(tentalus) || isAnyFailure(tentalus)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="locked-door" />
            {(tentalus && tentalus.resolved) 
                ? <>
                    <SpeechStepper
                        hasStarted={true}
                        groups={[
                            [ `WHHHHHOOOOM-THUD` ],
                            [ 'The place to water the Korok Seedling is just ahead...']
                        ]}
                        onFinished={() => {
                            resolveEncounter('zoras/temple', {});
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
