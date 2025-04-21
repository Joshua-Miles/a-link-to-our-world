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
]

export function Tree({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    return <ItemDropper focus="tree" encounter={encounter} nextText="Pick" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
