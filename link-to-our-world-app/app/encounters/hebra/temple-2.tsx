import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "app/shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const frostus = useResult(getEncounter, 'hebra/frostus');

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(frostus) || isAnyFailure(frostus)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset={frostus && frostus.resolved ? 'locked-door' : 'snowball'} />
            {(frostus && frostus.resolved) 
                ? <>
                    <SpeechStepper
                        hasStarted={true}
                        groups={[
                            [ `WHHHHHOOOOM-THUD` ],
                            [ 'The place to water the Korok Seedling is just ahead...']
                        ]}
                        onFinished={() => {
                            resolveEncounter('hebra/temple-2', {});
                            router.push('/map');
                        }}
                    />
                
                </>
                :  <SpeechStepper
                        hasStarted={true}
                        groups={[
                            ['The entrance is covered in snow...']
                        ]}
                        onFinished={() => {
                            router.push('/map')
                        }}
                />
            }
        </Scene>
    )
}
