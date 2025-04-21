import { resolveEncounter } from "api";
import { InventoryItemSlug } from "./Combat";
import { ItemGet } from "./ItemGet";
import { Scene } from "./Scene";
import { SceneFocus } from "./SceneFocus";
import { useSequence } from "./useSequence";
import { router } from "expo-router";
import { Button, Row } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { useState } from "react";


type Item = {
    slug: InventoryItemSlug;
    type: 'ingredient' | 'food' | 'weapon' | 'quest-item'
    name: string
    description: string
}


export function Chicken({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'itemGet'
    ])

    const [item, setItem] = useState<Item | null>(null) 

    function handleFinished() {
        if (!item) return;
        resolveEncounter(encounter, {
            drops: {
                slug: item.slug,
                name: item.name,
                type: item.type,
                imageSlug: item.slug
            }
        })
        router.push('/map')
    }

    function handleButcher() {
        setItem({
            slug: 'chicken',
            name: 'Chicken',
            type: 'ingredient',
            description: 'A delicious protein.'
        })
        sequence.next()
    }

    function handleHarvest() {
        setItem({
            slug: 'egg',
            name: 'Egg',
            type: 'ingredient',
            description: 'Perfect for baking and omelets.'
        })
        sequence.next()
    }

    return (
        <Scene>
            <SceneFocus asset="cucco" />
            <Row justifyContent="space-evenly" display={sequence.hasReached('itemGet') ? 'none' : 'flex'}>
                <Button.Filled onPress={handleButcher} >
                    Butcher <ArrowRightIcon />
                </Button.Filled>
                <Button.Filled onPress={handleHarvest}>
                    Harvest Egg <ArrowRightIcon />
                </Button.Filled>
            </Row>
            {item !== null && 
                <ItemGet
                    isOpen={sequence.isAt('itemGet')}
                    asset={item.slug}
                    title={item.name}
                    description={item.description}
                    onFinished={sequence.next}
                />}
        </Scene>
    )
}
