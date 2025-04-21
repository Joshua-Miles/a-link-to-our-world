import { resolveEncounter } from "api";
import { InventoryItemSlug } from "./Combat";
import { ItemGet } from "./ItemGet";
import { Scene } from "./Scene";
import { SceneFocus } from "./SceneFocus";
import { useSequence } from "./useSequence";
import { router } from "expo-router";
import { Button } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";

export type ItemDropperProps = {
    encounter: Parameters<typeof resolveEncounter>[0]
    focus: string
    slug: InventoryItemSlug;
    type: 'ingredient' | 'food' | 'weapon' | 'quest-item'
    name: string
    description: string
    nextText?: string
}

export function ItemDropper({ encounter, slug, name, description, focus, type, nextText = 'Next' }: ItemDropperProps) {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet'
    ])

    function handleFinished() {
        resolveEncounter(encounter, {
            drops: {
                slug,
                name,
                type,
                imageSlug: slug
            }
        })
        router.push('/map')
    }

    return (
        <Scene>
            <SceneFocus asset={focus} />
            <Button.Filled display={sequence.hasReached('itemGet') ? 'none' : 'flex'} onPress={sequence.next}>
                {nextText} <ArrowRightIcon />
            </Button.Filled>
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
