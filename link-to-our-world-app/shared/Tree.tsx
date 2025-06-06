import { resolveEncounter } from "api";
import { InventoryItemSlug } from "./Combat";
import { ItemDropper } from "./ItemDropper";

type Item = {
    slug: InventoryItemSlug;
    type: 'ingredient' | 'food' | 'weapon' | 'quest-item'
    name: string
    description: string
}

const items: Item[] = [
    {
        slug: 'apple',
        type: 'ingredient',
        name: 'Apple',
        description: 'A bright red fruit'
    },
    {
        slug: 'pineapple',
        type: 'ingredient',
        name: 'Pineapple',
        description: 'A sweet and acitic fruit. Very pokey!'
    },
    {
        slug: 'banana',
        type: 'ingredient',
        name: 'Banana',
        description: 'A sweet yellow fruit.'
    },
    {
        slug: 'honey',
        type: 'ingredient',
        name: 'Honey',
        description: 'A lovely sweetener.'
    },
]

export function Tree({ encounter, focus = 'tree' }: { encounter: Parameters<typeof resolveEncounter>[0], focus?: string  }) {
    return <ItemDropper focus={focus} encounter={encounter} nextText="Pick" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
