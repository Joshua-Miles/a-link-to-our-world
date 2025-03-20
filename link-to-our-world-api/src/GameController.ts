import { createEncounter } from "./Encounter";
import { GameEvent } from "./GameEvent";
import { createInventoryItem } from "./InventoryItem";
import { completeObjective, createObjective } from "./Objective";

export const GameController = {
    async handle(event: GameEvent) {
        switch(event.type) {
            case 'NEW_GAME':
                createEncounter(event.playerId, 'intro/beckoning', {
                    label: 'Inspect...',
                    imageSlug: 'marker',
                    // Nonni and Hohos park
                    lat: 29.539340,
                    lng: -95.362554
                })
                createObjective(event.playerId, {
                    title: 'The Beckoning',
                    slug: 'beckoning'
                })
            break;
            case 'ENCOUNTER_RESOLVED':
                switch(event.slug) {
                    case 'intro/beckoning':
                        // completeObjective(event.playerId, 'beckoning')
                        createEncounter(event.playerId, 'intro/seeds', {
                            label: 'Inspect...',
                            imageSlug: 'marker',
                            lat: 29.539805,
                            lng: -95.363028
                        })
                    break;
                    case 'intro/seeds':
                        createEncounter(event.playerId, 'intro/sword-chest', {
                            label: 'Open',
                            imageSlug: 'chest',
                            lat: 29.539788,
                            lng: -95.362881
                        })
                        createEncounter(event.playerId, 'intro/gorruk', {
                            label: 'Engage',
                            imageSlug: 'gorruk',
                            lat: 29.539490,
                            lng: -95.363127
                        })
                    break;
                    case 'intro/sword-chest':
                        createInventoryItem(event.playerId, 'sword', {
                            name: 'Sword'
                        })
                    break;
                    case 'intro/gorruk':
                        // TODO
                    break;
                }
            break;
        }
    }
}
