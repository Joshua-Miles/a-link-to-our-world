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
        slug: 'truffle',
        type: 'ingredient',
        name: 'Truffle',
        description: 'A delicious and rare cooking ingredient'
    },
    {
        slug: 'cheese',
        type: 'ingredient',
        name: 'Cheese',
        description: 'A delicious and rare cooking ingredient'
    },
    {
        slug: 'pickles',
        type: 'ingredient',
        name: 'Pickles',
        description: 'A delicious and rare cooking ingredient'
    }
]

export function Chest({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    return <ItemDropper focus="chest" encounter={encounter} nextText="Open" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
