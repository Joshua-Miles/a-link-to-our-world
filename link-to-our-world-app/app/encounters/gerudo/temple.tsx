import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const scervus = useResult(getEncounter, 'gerudo/scervus');

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(scervus) || isAnyFailure(scervus)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="locked-door" />
            {(scervus && scervus.resolved) 
                ? <>
                    <SpeechStepper
                        hasStarted={true}
                        groups={[
                            [ `WHHHHHOOOOM-THUD` ],
                            [ 'The place to water the Korok Seedling is just ahead...']
                        ]}
                        onFinished={() => {
                            resolveEncounter('gerudo/temple', {});
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
