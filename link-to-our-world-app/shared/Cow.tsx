import { resolveEncounter } from "api";
import { InventoryItemSlug } from "./Combat";
import { ItemGet } from "./ItemGet";
import { Scene } from "./Scene";
import { SceneFocus } from "./SceneFocus";
import { SpeechStepper } from "./SpeechStepper";
import { useSequence } from "./useSequence";
import { router } from "expo-router";

export type CowProps = {
    encounter: Parameters<typeof resolveEncounter>[0]
    slug: InventoryItemSlug;
    name: string
    description: string
}

export function Cow({ encounter, slug, name, description }: CowProps) {
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
            <SceneFocus asset="cow" />
            <SpeechStepper
                hasStarted={sequence.hasStarted()}
                groups={[[`A lovely cow`]]}
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
