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
        slug: 'meat',
        type: 'ingredient',
        name: 'Meat',
        description: 'A delicious protein'
    }
]

export function Wolf({ encounter }: { encounter: Parameters<typeof resolveEncounter>[0] }) {
    return <ItemDropper focus="wolf" encounter={encounter} nextText="Attack" {...getRandomItem()} />
}

function getRandomItem(): Item {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
