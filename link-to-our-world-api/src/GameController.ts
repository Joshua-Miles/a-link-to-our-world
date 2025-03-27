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
                handleLurelinEncounters(event);
                handleFaronEncounters(event);
                handleFloriaEncounters(event);
                handleNecludaEncounters(event);
            break;
        }
    }
}


function handleIntroEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'intro/beckoning':
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
            completeObjective(event.playerId, 'beckoning')
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
            createEncounter(event.playerId, 'lurelin/tidebane', {
                label: 'Talk',
                imageSlug: 'tidebane-avatar',
                lat: 29.545435, 
                lng: -95.308331
            })
        break;
        case 'lurelin/tidebane':
            createEncounter(event.playerId, 'lurelin/moldarach', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.544165,
                lng: -95.306604
            })
        break;
        case 'lurelin/moldarach':
            createEncounter(event.playerId, 'lurelin/lullaby', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.542236,
                lng: -95.306583
            })
        break;
        case 'lurelin/lullaby':
            createEncounter(event.playerId, 'lurelin/cache', {
                label: 'Plant Korok',
                imageSlug: 'marker',
                lat: 29.54195,
                lng: -95.306933,
            })
        break;
        case 'lurelin/cache':
        break;
    }
}

function handleFaronEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'faron/intro':
            createEncounter(event.playerId, 'faron/tavon', {
                label: 'Talk',
                imageSlug: 'tavon-avatar',
                lat: 29.548375, 
                lng: -95.195959
            })    
        break;
        case 'faron/tavon':
            createEncounter(event.playerId, 'faron/skull-kid', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.553270, 
                lng: -95.199190
            })
        break;
        case 'faron/skull-kid':
            createEncounter(event.playerId, 'faron/lullaby', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.551661, 
                lng: -95.196925
            })
        break;
        case 'faron/lullaby':
            createEncounter(event.playerId, 'faron/cache', {
                label: 'Plant Korok',
                imageSlug: 'marker',
                lat: 29.550533, 
                lng:  -95.195267
            })
        break;
        case 'faron/cache':
        break;
    }
}

function handleFloriaEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'floria/intro':  
            createEncounter(event.playerId, 'floria/nimri', {
                label: 'Talk',
                imageSlug: 'nimri-avatar',
                lat: 29.498131, 
                lng: -95.182841
            })  
        break;
        case 'floria/nimri':
            createEncounter(event.playerId, 'floria/bog-dobber', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.497761,
                lng: -95.181730
            })  
        break;
        case 'floria/bog-dobber':
            createEncounter(event.playerId, 'floria/lullaby', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.496953, 
                lng: -95.183297
            })  
        break;
        case 'floria/lullaby':
            createEncounter(event.playerId, 'floria/cache', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.496667, 
                lng: -95.183217
            })  
        break;
        case 'floria/cache':
        break;
    }
}

function handleNecludaEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'necluda/intro':  
            createEncounter(event.playerId, 'necluda/kyllis', {
                label: 'Talk',
                imageSlug: 'kyllis-avatar',
                lat: 29.589597, 
                lng: -95.374739
            })    
        break;
        case 'necluda/kyllis':
            createEncounter(event.playerId, 'necluda/argorok', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.588566, 
                lng: -95.375422
            })  
        break;
        case 'necluda/argorok':
            createEncounter(event.playerId, 'necluda/lullaby', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.588545, 
                lng: -95.373849
            })  
        break;
        case 'necluda/lullaby':
            createEncounter(event.playerId, 'necluda/cache', {
                label: 'Plant Korok',
                imageSlug: 'marker',
                lat: 29.588333, 
                lng: -95.37445
            })  
        break;
        case 'necluda/cache':
        break;
    }
}
