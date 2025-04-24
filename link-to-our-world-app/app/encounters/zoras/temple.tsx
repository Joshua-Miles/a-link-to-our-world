import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, ItemGet, Scene, SceneFocus, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";

export default function () {
    const playerName = usePlayerName();

    const tentalus = useResult(getEncounter, 'zoras/tentalus');

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'doorOpens',
        'heartContainer',
        'justAhead'
    ])

    function handleFinished() {
        resolveEncounter('zoras/temple', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(tentalus) || isAnyFailure(tentalus)) {
        return null;
    }

    return (
        <Scene>
            <SceneFocus asset="locked-door" />
            {(tentalus && tentalus.resolved)
                ? <>
                    <SpeechStepper
                        hasStarted={sequence.hasReached('doorOpens')}
                        groups={[
                            [`WHHHHHOOOOM-THUD`],
                            [`You feel the power of the ancients stir within you...`]
                        ]}
                        onFinished={sequence.next}
                    />
                    <ItemGet
                        title="Heart Container"
                        description="This will increase your max health by 1"
                        asset='heart-container'
                        isOpen={sequence.isAt('heartContainer')}
                        onFinished={sequence.next}
                    />
                    <SpeechStepper
                        hasStarted={sequence.hasReached('justAhead')}
                        groups={[
                            ['The place to water the Korok Seedling is just ahead...']
                        ]}
                        onFinished={sequence.next}
                    />
                </>
                : <SpeechStepper
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
