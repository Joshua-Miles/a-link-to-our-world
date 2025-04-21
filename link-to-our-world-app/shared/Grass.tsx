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
        slug: 'rice',
        type: 'ingredient',
        name: 'Rice',
        description: 'A delicious carb'
    },
    {
        slug: 'wheat',
        type: 'ingredient',
        name: 'Wheat',
        description: 'A grain used to make delicious carbs'
    },
    {
        slug: 'carrot',
        type: 'ingredient',
        name: 'Carrot',
        description: 'A sweet orange root vegetable'
    },
    {
        slug: 'peas',
        type: 'ingredient',
        name: 'Peas',
        description: 'They look so nice lined up in a pod!'
    },
    {
        slug: 'tomato',
        type: 'ingredient',
        name: 'Tomato',
        description: 'A bright red vegetable, known to deter some werewolves'
    },
]

export function Grass({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    return <ItemDropper focus="shrub" encounter={encounter} nextText="Cut" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
