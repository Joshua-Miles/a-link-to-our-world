import { createEncounter } from "./Encounter";
import { GameEvent } from "./GameEvent";
import { createInventoryItem } from "./InventoryItem";
import { completeObjective, createObjective } from "./Objective";

export const GameController = {
    async handle(event: GameEvent) {
        switch(event.type) {
            case 'NEW_GAME':
                createEncounter(event.playerId, {
                    label: 'Inspect...',
                    slug: 'beckoning',
                    imageSlug: 'marker',
                    imageSize: 20,
                    // Nonni and Hohos house
                    lat: 29.539823,
                    lng: -95.362979
                })
                createObjective(event.playerId, {
                    title: 'The Beckoning',
                    slug: 'beckoning'
                })
            break;
            case 'ENCOUNTER_RESOLVED':
                switch(event.slug) {
                    case 'beckoning':
                        completeObjective(event.playerId, 'beckoning')
                        createEncounter(event.playerId, {
                            label: 'Mobin',
                            slug: 'moblin-1',
                            imageSlug: 'moblin-1',
                            imageSize: 30,
                            // Nonni and Hohos house
                            lat: 29.539823,
                            lng: -95.362979
                        })
                        createInventoryItem(event.playerId, {
                            name: 'Sword',
                            slug: 'sword',
                            imageSlug: 'sword'
                        })
                }
            break;
        }
    }
}
