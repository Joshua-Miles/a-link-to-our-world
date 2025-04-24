import { resolveEncounter } from "api";
import { Scene, SceneFocus, ItemGet, useSequence } from "shared";
import { router } from "expo-router";
import { Button } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";


export default function() {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet'
    ])

    function handleFinished() {
        resolveEncounter('bazaar/rupee-chest', {
            reward: 30
        })
        router.push('/map')
    }

    return (
        <Scene>
            <SceneFocus asset="chest" />
            <Button.Filled display={sequence.hasReached('itemGet') ? 'none' : 'flex'} onPress={sequence.next}>
                Open <ArrowRightIcon />
            </Button.Filled>
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset={'rupee'}
                title='30 Rupees'
                description={"Don't spend it all in once place!"}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
