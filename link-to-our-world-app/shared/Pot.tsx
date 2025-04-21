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
        slug: 'yeast',
        type: 'ingredient',
        name: 'Yeast',
        description: 'A raising agent used for baking bread'
    },
    {
        slug: 'oil',
        type: 'ingredient',
        name: 'Oil',
        description: 'A delicious fat often used for frying'
    },
    {
        slug: 'butter',
        type: 'ingredient',
        name: 'Butter',
        description: 'A delicious fat often used for frying'
    }
]

export function Pot({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    return <ItemDropper focus="pot" encounter={encounter} nextText="Break" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
