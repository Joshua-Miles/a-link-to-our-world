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


export function Cow({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
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
            slug: 'meat',
            name: 'Meat',
            type: 'ingredient',
            description: 'A delicious protein'
        })
        sequence.next()
    }

    function handleMilk() {
        setItem({
            slug: 'cream',
            name: 'Cream',
            type: 'ingredient',
            description: 'Perfect for soups and risottos'
        })
        sequence.next()
    }

    return (
        <Scene>
            <SceneFocus asset="cow" />
            <Row justifyContent="space-evenly" display={sequence.hasReached('itemGet') ? 'none' : 'flex'}>
                <Button.Filled onPress={handleButcher} >
                    Butcher <ArrowRightIcon />
                </Button.Filled>
                <Button.Filled onPress={handleMilk}>
                    Milk <ArrowRightIcon />
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
