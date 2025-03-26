import { createEncounter } from "./Encounter";
import { EncounterResolvedEvent, GameEvent } from "./GameEvent";
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
                handleIntroEncounters(event);

                
            break;
        }
    }
}


function handleIntroEncounters(event: EncounterResolvedEvent) {
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
            createObjective(event.playerId, {
                title: 'Plant the Korok Seeds',
                slug: 'plant-seeds'
            })
            createEncounter(event.playerId, 'lurelin/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.545170, 
                lng: -95.309043
            })
            createEncounter(event.playerId, 'faron/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.547466,
                lng: -95.196182
            })
            createEncounter(event.playerId, 'floria/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.497054, 
                lng: -95.183945
            })
            createEncounter(event.playerId, 'necluda/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.588201,
                lng: -95.373022
            })
        break;
    }
}

function handleLurelinEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'lurelin/intro':
            createEncounter(event.playerId, 'necluda/intro', {
                label: 'Inspect...',
                imageSlug: 'tidebane-avatar',
                lat: 29.588201,
                lng: -95.373022
            })
        break;
        case 'lurelin/tidebane':
        break;
        case 'lurelin/moldarach':
        break;
        case 'lurelin/lullaby':
        break;
        case 'lurelin/cache':
        break;
    }
}

function handleFaronEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'faron/intro':
        break;
    }
}

function handleFloriaEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'floria/intro':
        break;
    }
}

function handleNecludaEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'necluda/intro':
        break;
    }
}
