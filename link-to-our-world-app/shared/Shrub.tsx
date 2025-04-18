import { resolveEncounter } from "api";
import { InventoryItemSlug } from "./Combat";
import { ItemGet } from "./ItemGet";
import { Scene } from "./Scene";
import { SceneFocus } from "./SceneFocus";
import { SpeechStepper } from "./SpeechStepper";
import { useSequence } from "./useSequence";
import { router } from "expo-router";

export type ShrubProps = {
    encounter: Parameters<typeof resolveEncounter>[0]
    slug: InventoryItemSlug;
    name: string
    description: string
}

export function Shrub({ encounter, slug, name, description }: ShrubProps) {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet'
    ])

    function handleFinished() {
        resolveEncounter(encounter, {
            drops: {
                slug,
                name,
                type: 'ingredient',
                imageSlug: slug
            }
        })
        router.push('/map')
    }

    return (
        <Scene>
            <SceneFocus asset="shrub" />
            <SpeechStepper
                hasStarted={sequence.hasStarted()}
                groups={[[`A lovely shrub`]]}
                onFinished={sequence.next}
            />
            <ItemGet
                isOpen={sequence.isAt('itemGet')}
                asset={slug}
                title={name}
                description={description}
                onFinished={sequence.next}
            />
        </Scene>
    )
}
