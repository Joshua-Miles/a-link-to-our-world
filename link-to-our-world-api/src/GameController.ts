import { createChest, createChicken, createChu, createCow, createDarknut, createDekuBaba, createEncounter, createGibdo, createGrass, createKeese, createLizalfos, createMoblin, createPalmTree, createPool, createPot, createSnowTree, createTalus, createTree, createWell, createWolf, getEncounterByPlayerIdAndSlug } from "./Encounter";
import { markEncounterResolved, resolveEncounter } from "./Encounter/resolveEncounter";
import { EncounterResolvedEvent, GameEvent } from "./GameEvent";
import { getSeedsPlantedByUserId } from "./getSeedsPlanted";
import { getTemplesWateredByUserId } from "./getTemplesWatered";
import { createInventoryItem, removeInventoryItem } from "./InventoryItem";
import { incrementHeartContainers, updateRupees } from "./Meters";
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
                    title: 'Visit the Sacred Grove',
                    slug: 'beckoning'
                })
            break;
            case 'ENCOUNTER_RESOLVED':
                await handleEncounterDrops(event);
                await handleEncounterRewards(event);
                await handleIntroEncounters(event);
                await handleLurelinEncounters(event);
                await handleFaronEncounters(event);
                await handleFloriaEncounters(event);
                await handleNecludaEncounters(event);
                await handleInterludeEncounters(event);
                await handleGerudoEncounters(event);
                await handleEldinEncounters(event);
                await handleZorasEncounters(event);
                await handleHebraEncounters(event);
                await handleFinaleEncounters(event);
            break;
        }
    }
}

async function handleEncounterDrops(event: EncounterResolvedEvent) {
    if (event.state.drops) {
        await createInventoryItem(event.playerId, event.state.drops.slug, event.state.drops);
    }
}

async function handleEncounterRewards(event: EncounterResolvedEvent) {
    if (event.state.reward && typeof event.state.reward === 'number') {
        await updateRupees(event.playerId, event.state.reward);
    }
    if (event.state.reward && event.state.rewart === 'heart-container') {
        await incrementHeartContainers(event.playerId)
    }
}

async function handleIntroEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'intro/beckoning':
            createInventoryItem(event.playerId, 'goddess-flute', {
                type: 'quest-item',
                name: 'Goddess Flute',
            })
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
                lat: 29.590862, 
                lng: -95.377728
            })
            createEncounter(event.playerId, 'bazaar/beedle', {
                label: 'Talk',
                imageSlug: 'beedle-avatar',
                lat: 29.574138,
                lng: -95.361177
            })
            createEncounter(event.playerId, 'bazaar/rupee-chest', {
                label: 'Open',
                imageSlug: 'chest',
                lat: 29.574128, 
                lng: -95.360913
            })
            createChest(event.playerId, 'common/chest/bazaar/1', {
                lat: 29.573744, 
                lng: -95.360779
            })
            createChicken(event.playerId, 'common/chicken/bazaar/1', {
                lat: 29.574298, 
                lng: -95.360841
            })
            createChicken(event.playerId, 'common/chicken/bazaar/2', {
                lat: 29.574088, 
                lng: -95.360852
            })
            createPot(event.playerId, 'common/pot/bazaar/1', {
                lat: 29.574271, 
                lng: -95.361178
            })
            createPot(event.playerId, 'common/pot/bazaar/2', {
                lat: 29.574185, 
                lng: -95.361207
            })
            createGrass(event.playerId, 'common/grass/bazaar/1', {
                lat: 29.574110, 
                lng: -95.360729
            })
            createGrass(event.playerId, 'common/grass/bazaar/2', {
                lat: 29.573852,
                lng:  -95.360851
            })
            createGrass(event.playerId, 'common/grass/bazaar/3', {
                lat: 29.573625, 
                lng: -95.360727
            })
            createTree(event.playerId, 'common/tree/bazaar/4', {
                lat: 29.573900, 
                lng: -95.360727
            })
            createTree(event.playerId, 'common/tree/bazaar/1', {
                lat: 29.574350, 
                lng: -95.360840
            })
            createTree(event.playerId, 'common/tree/bazaar/2', {
                lat: 29.573664, 
                lng: -95.360916
            })
        break;
    }
}

async function handleLurelinEncounters(event: EncounterResolvedEvent) {
    switch(event.slug) {
        case 'lurelin/intro':    
            createEncounter(event.playerId, 'lurelin/tidebane', {
                label: 'Talk',
                imageSlug: 'tidebane-avatar',
                lat: 29.545435, 
                lng: -95.308331
            })
            createChest(event.playerId, 'common/chest/lurelin/1', {
                lat: 29.544085, 
                lng: -95.309045
            })
            createChest(event.playerId, 'common/chest/lurelin/2', {
                lat: 29.543237, 
                lng: -95.313137
            })
            createChicken(event.playerId, 'common/chicken/lurelin/1', {
                lat: 29.545141, 
                lng: -95.308680
            })
            createChicken(event.playerId, 'common/chicken/lurelin/2', {
                lat: 29.543672, 
                lng: -95.310411
            })
            createPot(event.playerId, 'common/pot/lurelin/1', {
                lat: 29.545248, 
                lng: -95.308634
            })
            createPot(event.playerId, 'common/pot/lurelin/2', {
                lat: 29.545715, 
                lng:-95.307918
            })
            createPot(event.playerId, 'common/pot/lurelin/3', {
                lat: 29.544548, 
                lng: -95.306993
            })
            createPot(event.playerId, 'common/pot/lurelin/4', {
                lat: 29.542206, 
                lng: -95.310393
            })
            createPot(event.playerId, 'common/pot/lurelin/5', {
                lat: 29.543866, 
                lng: -95.311840
            })
            createGrass(event.playerId, 'common/grass/lurelin/1', {
                lat: 29.541810,
                lng: -95.308119
            })
            createGrass(event.playerId, 'common/grass/lurelin/2', {
                lat: 29.544424, 
                lng: -95.310088
            })
            createGrass(event.playerId, 'common/grass/lurelin/3', {
                lat: 29.542206, 
                lng: -95.306613
            })
            createTree(event.playerId, 'common/tree/lurelin/1', {
                lat: 29.543840, 
                lng: -95.312481
            })
            createKeese(event.playerId, 'enemy/keese/standard/lurelin/1', {
                lat: 29.545249,
                lng: -95.308706
            })
            createKeese(event.playerId, 'enemy/keese/standard/lurelin/2', {
                lat: 29.543882, 
                lng: -95.311693
            })
            createKeese(event.playerId, 'enemy/keese/standard/lurelin/3', {
                lat: 29.543087, 
                lng: -95.310440
            })
            createKeese(event.playerId, 'enemy/keese/standard/lurelin/4', {
                lat: 29.544805, 
                lng: -95.307085
            })
            createKeese(event.playerId, 'enemy/keese/standard/lurelin/5', {
                lat: 29.541849,
                lng:  -95.308968
            })
            createChu(event.playerId, 'enemy/chu/standard/lurelin/1', {
                lat: 29.544602, 
                lng: -95.309520
            })
            createChu(event.playerId, 'enemy/chu/standard/lurelin/2', {
                lat: 29.541991,
                lng:  -95.306951
            })
            createChu(event.playerId, 'enemy/chu/standard/lurelin/3', {
                lat: 29.542139, 
                lng: -95.310447
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/lurelin/1', {
                lat: 29.543561, 
                lng:  -95.312620
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/lurelin/2', {
                lat: 29.544731, 
                lng: -95.309378
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/lurelin/3', {
                lat: 29.541826, 
                lng: -95.307996
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
            incrementHeartContainers(event.playerId)
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
            await createInterludeIfAllSeedsPlanted(event.playerId);
        break;
    }
}

async function handleFaronEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'faron/intro':
            createEncounter(event.playerId, 'faron/tavon', {
                label: 'Talk',
                imageSlug: 'tavon-avatar',
                lat: 29.548375, 
                lng: -95.195959
            })    
            createChest(event.playerId, 'common/chest/faron/1', {
                lat: 29.546284, 
                lng: -95.196669
            })
            createChest(event.playerId, 'common/chest/faron/2', {
                lat: 29.544004, 
                lng: -95.198265
            })
            createWell(event.playerId, 'common/well/faron/1', {
                lat: 29.553133, 
                lng: -95.199251
            })
            createPot(event.playerId, 'common/pot/faron/1', {
                lat: 29.547624, 
                lng: -95.195991
            })
            createGrass(event.playerId, 'common/grass/faron/1', {
                lat: 29.5485, 
                lng: -95.1959
            })
            createGrass(event.playerId, 'common/grass/faron/2', {
                lat: 29.550908, 
                lng: -95.197812
            })
            createGrass(event.playerId, 'common/grass/faron/3', {
                lat: 29.5498, 
                lng: -95.1949
            })
            createGrass(event.playerId, 'common/grass/faron/4', {
                lat: 29.546556, 
                lng: -95.196854
            })
            createGrass(event.playerId, 'common/grass/faron/5', {
                lat: 29.544318, 
                lng: -95.198495
            })
            createTree(event.playerId, 'common/tree/faron/1', {
                lat: 29.5498, 
                lng: -95.1970
            })
            createTree(event.playerId, 'common/tree/faron/2', {
                lat: 29.5518, 
                lng: -95.1987
            })
            createTree(event.playerId, 'common/tree/faron/3', {
                lat: 29.5587, 
                lng: -95.1924
            })
            createTree(event.playerId, 'common/tree/faron/4', {
                lat: 29.5506, 
                lng: -95.1965
            })
            createTree(event.playerId, 'common/tree/faron/5', {
                lat: 29.5489, 
                lng: -95.1949
            })
            createChu(event.playerId, 'enemy/chu/standard/faron/1', {
                lat: 29.547517,
                lng: -95.196147
            })
            createChu(event.playerId, 'enemy/chu/standard/faron/2', {
                lat: 29.548017, 
                lng: -95.195782
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/faron/1', {
                lat: 29.548450, 
                lng: -95.196049
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/faron/2', {
                lat: 29.5499,
                lng: -95.1971
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/faron/3', {
                lat: 29.5523,
                lng: -95.1977
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/faron/4', {
                lat: 29.544356, 
                lng: -95.198480
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/faron/5', {
                lat: 29.543904,
                lng: -95.198110
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/faron/1', {
                lat: 29.5499,
                lng: -95.1949
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/faron/2', {
                lat: 29.5467,
                lng: -95.1966
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/faron/3', {
                lat: 29.544205,
                lng: -95.198467
            })
        break;
        case 'faron/tavon':
            createEncounter(event.playerId, 'faron/skull-kid-1', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.5516, 
                lng: -95.1977
            })
        break;
        case 'faron/skull-kid-1':
            createEncounter(event.playerId, 'faron/skull-kid-2', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.553270, 
                lng: -95.199190
                
            })
        break;
        case 'faron/skull-kid-2':
            incrementHeartContainers(event.playerId);
            createEncounter(event.playerId, 'faron/skull-kid-3', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.5522, 
                lng: -95.1976
            })
        break;
        case 'faron/skull-kid-3':
            createEncounter(event.playerId, 'faron/lullaby', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.551674, 
                lng: -95.196911
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
            await createInterludeIfAllSeedsPlanted(event.playerId);
        break;
    }
}

async function handleFloriaEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'floria/intro':  
            createEncounter(event.playerId, 'floria/nimri', {
                label: 'Talk',
                imageSlug: 'nimri-avatar',
                lat: 29.498131, 
                lng: -95.182841
            })
            createChest(event.playerId, 'common/chest/floria/1', {
                lat: 29.497585, 
                lng: -95.182361
            })
            createChest(event.playerId, 'common/chest/floria/2', {
                lat: 29.4988, 
                lng: -95.1813
            })
            createCow(event.playerId, 'common/cow/floria/1', {
                lat: 29.496141, 
                lng: -95.182429
            })
            createCow(event.playerId, 'common/cow/floria/2', {
                lat: 29.496627, 
                lng: -95.183358
            })
            createCow(event.playerId, 'common/cow/floria/3', {
                lat: 29.497738, 
                lng: -95.183156
            })
            createCow(event.playerId, 'common/cow/floria/4', {
                lat: 29.496257, 
                lng: -95.183560
            })
            createWell(event.playerId, 'common/well/floria/1', {
                lat: 29.497955, 
                lng: -95.183027
            })
            createWell(event.playerId, 'common/well/floria/2', {
                lat: 29.496815, 
                lng: -95.182842
            })
            createWell(event.playerId, 'common/well/floria/3', {
                lat: 29.497218, 
                lng: -95.182240
            })
            createGrass(event.playerId, 'common/grass/floria/1', {
                lat: 29.497828, 
                lng: -95.183276
            })
            createGrass(event.playerId, 'common/grass/floria/2', {
                lat: 29.4980, 
                lng: -95.1818
            })
            createGrass(event.playerId, 'common/grass/floria/3', {
                lat: 29.496450, 
                lng: -95.182891
            })
            createTree(event.playerId, 'common/tree/floria/1', {
                lat: 29.4981, 
                lng: -95.1816
            })
            createTree(event.playerId, 'common/tree/floria/2', {
                lat: 29.4982, 
                lng: -95.1819
            })
            createTree(event.playerId, 'common/tree/floria/3', {
                lat: 29.4982,
                lng: -95.1825
            })
            createChu(event.playerId, 'enemy/chu/standard/floria/1', {
                lat: 29.496955, 
                lng: -95.183850
            })
            createChu(event.playerId, 'enemy/chu/standard/floria/2', {
                lat: 29.497697, 
                lng:-95.183002
            })
            createChu(event.playerId, 'enemy/chu/standard/floria/3', {
                lat: 29.497966, 
                lng: -95.182020
            })
            createChu(event.playerId, 'enemy/chu/standard/floria/4', {
                lat: 29.496620, 
                lng: -95.183134
            })
            createChu(event.playerId, 'enemy/chu/standard/floria/5', {
                lat: 29.497669, 
                lng: -95.183379
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/floria/1', {
                lat: 29.4982, 
                lng: -95.1819
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/floria/2', {
                lat: 29.496254, 
                lng: -95.182435
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/floria/1', {
                lat: 29.4986,
                lng: -95.1813
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/floria/2', {
                lat: 29.498044, 
                lng: -95.183130
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/floria/3', {
                lat: 29.496473, 
                lng: -95.182786
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
            incrementHeartContainers(event.playerId);
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
            await createInterludeIfAllSeedsPlanted(event.playerId);
        break;
    }
}

async function handleNecludaEncounters(event: EncounterResolvedEvent) {
     switch(event.slug) {
        case 'necluda/intro':  
            createEncounter(event.playerId, 'necluda/kyllis', {
                label: 'Talk',
                imageSlug: 'kyllis-avatar',
                lat: 29.588857, 
                lng: -95.376982
            })    
            createChest(event.playerId, 'common/chest/necluda/1', {
                lat: 29.587970, 
                lng: -95.373807
            })
            createChest(event.playerId, 'common/chest/necluda/2', {
                lat: 29.588633, 
                lng: -95.376649
            })
            createWell(event.playerId, 'common/well/necluda/1', {
                lat: 29.591356, 
                lng: -95.377364
            })
            createChicken(event.playerId, 'common/chicken/necluda/1', {
                lat: 29.590346, 
                lng: -95.377802
            })
            createChicken(event.playerId, 'common/chicken/necluda/2', {
                lat: 29.589473, 
                lng: -95.377768
            })
            createChicken(event.playerId, 'common/chicken/necluda/3', {
                lat: 29.588767, 
                lng: -95.376353
            })
            createChicken(event.playerId, 'common/chicken/necluda/4', {
                lat: 29.588460, 
                lng: -95.373894
            })
            createPot(event.playerId, 'common/pot/necluda/1', {
                lat: 29.588063, 
                lng: -95.374063
            })
            createPot(event.playerId, 'common/pot/necluda/2', {
                lat: 29.588513, 
                lng: -95.373625
            })
            createPot(event.playerId, 'common/pot/necluda/3', {
                lat: 29.588500, 
                lng: -95.373717
            })
            createGrass(event.playerId, 'common/grass/necluda/1', {
                lat: 29.588956, 
                lng: -95.375681
            })
            createGrass(event.playerId, 'common/grass/necluda/2', {
                lat: 29.589215, 
                lng: -95.374838
            })
            createGrass(event.playerId, 'common/grass/necluda/3', {
                lat: 29.588297, 
                lng:-95.374953
            })
            createTree(event.playerId, 'common/tree/necluda/1', {
                lat: 29.590021, 
                lng: -95.377536
            })
            createChu(event.playerId, 'enemy/chu/standard/necluda/1', {
                lat: 29.588784, 
                lng: -95.376344
            })
            createChu(event.playerId, 'enemy/chu/standard/necluda/2', {
                lat: 29.588892, 
                lng: -95.374946
            })
            createChu(event.playerId, 'enemy/chu/standard/necluda/3', {
                lat: 29.588354, 
                lng: -95.375111
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/necluda/1', {
                lat: 29.588768, 
                lng: -95.376035
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/necluda/2', {
                lat: 29.589328, 
                lng: -95.375229
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/standard/necluda\/3', {
                lat: 29.588392, 
                lng: -95.374381
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/necluda/1', {
                lat: 29.590323, 
                lng: -95.378172
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/necluda/2', {
                lat: 29.588915, 
                lng: -95.376985
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/necluda/3', {
                lat: 29.588262,
                lng:  -95.374043
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/necluda/4', {
                lat: 29.587925, 
                lng: -95.373882
            })
        break;
        case 'necluda/kyllis':
            createEncounter(event.playerId, 'necluda/keese', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.589604, 
                lng: -95.374315
            })  
        break;
        case 'necluda/keese':
            createEncounter(event.playerId, 'necluda/argorok', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.588566, 
                lng: -95.375422
            })  
        break;
        case 'necluda/argorok':
            incrementHeartContainers(event.playerId)
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
            await createInterludeIfAllSeedsPlanted(event.playerId);
        break;
    }
}

async function createInterludeIfAllSeedsPlanted(playerId: number) {
    const seedsPlanted = await getSeedsPlantedByUserId(playerId)
    if (seedsPlanted.totalComplete === 4) {
        completeObjective(playerId, 'plant-seeds');
        createEncounter(playerId, 'interlude/intro', {
            label: 'Inspect',
            imageSlug: 'marker',
            lat: 29.539490,
            lng: -95.363127
        })
    }
}

async function handleInterludeEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'interlude/intro':
            createEncounter(event.playerId, 'interlude/gorruk', {
                label: 'Engage',
                imageSlug: 'gorruk',
                lat: 29.539340,
                lng: -95.362554
            })
        break;
        case 'interlude/gorruk':
            createEncounter(event.playerId, 'interlude/vials', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.539805,
                lng: -95.363028
            })
        break;
        case 'interlude/vials':
            createObjective(event.playerId, {
                slug: 'visit-temples',
                title: 'Visit the Temples'
            })
            createEncounter(event.playerId, 'gerudo/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.517403,
                lng:  -95.194691
            })
            createEncounter(event.playerId, 'eldin/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.509009, 
                lng: -95.132756
            })
            createEncounter(event.playerId, 'zoras/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.640995, 
                lng: -95.219378
            })
            createEncounter(event.playerId, 'hebra/intro', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.581406, 
                lng: -95.416814
            })
        break;
    }
}

async function handleGerudoEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'gerudo/intro':
            createEncounter(event.playerId, 'gerudo/tidebane', {
                label: 'Talk',
                imageSlug: 'tidebane-avatar',
                lat: 29.517568, 
                lng: -95.194463
            })

            createEncounter(event.playerId, 'gerudo/robot', {
                label: 'Talk',
                imageSlug: 'robot',
                lat: 29.518330, 
                lng: -95.193699
            })

            createEncounter(event.playerId, 'gerudo/eshara', {
                label: 'Talk',
                imageSlug: 'eshara-avatar',
                lat: 29.520850, 
                lng: -95.191939
            })

            createEncounter(event.playerId, 'gerudo/temple', {
                label: 'Inspect...',
                imageSlug: 'locked-door',
                lat: 29.520791, 
                lng: -95.192024
            })
            
            createEncounter(event.playerId, 'gerudo/ravia', {
                label: 'Talk',
                imageSlug: 'ravia-avatar',
                lat: 29.521745,
                lng:  -95.193940,
            })

            createChest(event.playerId, 'common/chest/gerudo/1', {
                lat: 29.521481, 
                lng: -95.191849
            })
            createChest(event.playerId, 'common/chest/gerudo/2', {
                lat: 29.521822, 
                lng: -95.194610
            })
            createWell(event.playerId, 'common/well/gerudo/1', {
                lat: 29.521024, 
                lng: -95.194191
            })
            createPot(event.playerId, 'common/pot/gerudo/1', {
                lat: 29.518485,
                lng:  -95.193892
            })
            createPot(event.playerId, 'common/pot/gerudo/2', {
                lat: 29.519758, 
                lng: -95.192779
            })
            createPot(event.playerId, 'common/pot/gerudo/3', {
                lat: 29.521629, 
                lng: -95.193992
            })
            createPot(event.playerId, 'common/pot/gerudo/4', {
                lat: 29.521652,
                lng: -95.193748
            })
            createPot(event.playerId, 'common/pot/gerudo/5', {
                lat: 29.520390, 
                lng: -95.193291
            })
            createPalmTree(event.playerId, 'common/palm-tree/gerudo/1', {
                lat: 29.517713, 
                lng: -95.194172
            })
            createPalmTree(event.playerId, 'common/palm-tree/gerudo/2', {
                lat: 29.519091, 
                lng: -95.193417
            })
            createPalmTree(event.playerId, 'common/palm-tree/gerudo/3', {
                lat: 29.520176, 
                lng: -95.193009
            })
            createPalmTree(event.playerId, 'common/palm-tree/gerudo/4', {
                lat: 29.521568, 
                lng: -95.192077
            })
            createPalmTree(event.playerId, 'common/palm-tree/gerudo/5', {
                lat: 29.520968, 
                lng: -95.191439
            })
            createChu(event.playerId, 'enemy/chu/electric/gerudo/1', {
                lat: 29.517581, 
                lng: -95.194385
            })
            createChu(event.playerId, 'enemy/chu/electric/gerudo/2', {
                lat: 29.520417, 
                lng: -95.193701
            })
            createKeese(event.playerId, 'enemy/keese/electric/gerudo/1', {
                lat: 29.520941, 
                lng: -95.193967
            })
            createKeese(event.playerId, 'enemy/keese/electric/gerudo/2', {
                lat: 29.520736, 
                lng: -95.192324
            })
            createGibdo(event.playerId, 'enemy/gibdo/standard/gerudo/1', {
                lat: 29.520133, 
                lng: -95.192738
            })
            createGibdo(event.playerId, 'enemy/gibdo/standard/gerudo/2', {
                lat: 29.521279,
                lng:  -95.191644
            })
            createGibdo(event.playerId, 'enemy/gibdo/standard/gerudo/3', {
                lat: 29.520860, 
                lng: -95.192147
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/gerudo/1', {
                lat: 29.520075,
                lng:  -95.193037
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/gerudo/2', {
                lat: 29.520501, 
                lng: -95.192482
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/gerudo/3', {
                lat: 29.520972, 
                lng: -95.192809
            })
        break;
        case 'gerudo/tidebane':
            createEncounter(event.playerId, 'gerudo/tidebane-2', {
                label: 'Talk',
                imageSlug: 'tidebane-avatar',
                lat: 29.517568, 
                lng: -95.194463
            })
        break;
        case 'gerudo/ravia':
            markEncounterResolved(event.playerId, 'gerudo/tidebane-2', {})
            markEncounterResolved(event.playerId, 'gerudo/robot', {})
            markEncounterResolved(event.playerId, 'gerudo/eshara', {})
            createEncounter(event.playerId, 'gerudo/scervus', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.521146, 
                lng: -95.192802
            })
        break;
        case 'gerudo/scervus':
            createInventoryItem(event.playerId, 'key', {
                name: 'Key',
                type: 'quest-item'
            })
        break;
        case 'gerudo/temple':
            incrementHeartContainers(event.playerId);
            removeInventoryItem(event.playerId, 'key');
            createEncounter(event.playerId, 'gerudo/cache', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.520817, 
                lng: -95.192433
            })
            createGibdo(event.playerId, 'enemy/gibdo/electric/gerudo/1', {
                lat: 29.520695, 
                lng: -95.192180
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/electric/gerudo/1', {
                lat: 29.520803,
                lng: -95.192193
            })
        break;
        case 'gerudo/cache':
            createInventoryItem(event.playerId, 'electric-sword', {
                name: 'Lightning Sword',
                type: 'weapon'
            })
            await createFinaleIfAllTemplesWatered(event.playerId)
            createGibdo(event.playerId, 'enemy/gibdo/electric/gerudo/2', {
                lat: 29.520853, 
                lng: -95.192577
            })
            createGibdo(event.playerId, 'enemy/gibdo/electric/gerudo/3', {
                lat: 29.520677, 
                lng: -95.192117
            })

            createLizalfos(event.playerId, 'enemy/lizalfos/electric/gerudo/2', {
                lat: 29.520731, 
                lng: -95.192310
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/electric/gerudo/3', {
                lat: 29.520871, 
                lng: -95.192222
            })
            createTalus(event.playerId, 'enemy/talus/electric/bazaar/1', {
                lat: 29.574467, 
                lng: -95.363116
            })
        break;
    }
}

async function handleEldinEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'eldin/intro':
            createEncounter(event.playerId, 'eldin/bouldan', {
                label: 'Talk',
                imageSlug: 'bouldan-avatar',
                lat: 29.508465, 
                lng: -95.136107
            })
            createEncounter(event.playerId, 'eldin/mines', {
                label: 'Enter',
                imageSlug: 'mines',
                lat: 29.508331,
                lng: -95.137542
            })
            createEncounter(event.playerId, 'eldin/temple', {
                label: 'Enter',
                imageSlug: 'locked-door',
                lat: 29.5092, 
                lng: -95.1395
            })
            createEncounter(event.playerId, 'eldin/lodron', {
                label: 'Talk',
                imageSlug: 'lodron-avatar',
                lat: 29.5093, 
                lng: -95.1396
            })
            createChest(event.playerId, 'common/chest/eldin/1', {
                lat: 29.510975, 
                lng: -95.138515
            })
            createChest(event.playerId, 'common/chest/eldin/2', {
                lat: 29.507914, 
                lng: -95.132777
            })
            createPot(event.playerId, 'common/pot/eldin/1', {
                lat: 29.508605, 
                lng:  -95.136203
            })
            createGrass(event.playerId, 'common/grass/eldin/1', {
                lat: 29.508132, 
                lng: -95.135807
            })
            createGrass(event.playerId, 'common/grass/eldin/2', {
                lat: 29.507815, 
                lng: -95.134775
            })
            createGrass(event.playerId, 'common/grass/eldin/3', {
                lat: 29.508683, 
                lng: -95.134673
            })
            createWolf(event.playerId, 'common/wolf/eldin/1', {
                lat: 29.5089, 
                lng: -95.1387
            })
            createWolf(event.playerId, 'common/wolf/eldin/2', {
                lat: 29.5076, 
                lng: -95.1404
            })
            createPalmTree(event.playerId, 'common/palm-tree/eldin/1', {
                lat: 29.508505, 
                lng: -95.133599
            })
            createPalmTree(event.playerId, 'common/palm-tree/eldin/2', {
                lat: 29.508238,
                lng:  -95.136277
            })
            createChu(event.playerId, 'enemy/chu/fire/eldin/1', {
                lat: 29.508626, 
                lng: -95.134093
            })
            createChu(event.playerId, 'enemy/chu/fire/eldin/2', {
                lat: 29.508499, 
                lng: -95.136980
            })
            createKeese(event.playerId, 'enemy/keese/fire/eldin/1', {
                lat: 29.5101, 
                lng: -95.1381
            })
          
            createMoblin(event.playerId, 'enemy/moblin/standard/eldin/1', {
                lat: 29.508309, 
                lng:  -95.135628
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/eldin/2', {
                lat: 29.507981, 
                lng: -95.132635
            })
            
            createMoblin(event.playerId, 'enemy/moblin/standard/eldin/4', {
                lat: 29.511230, 
                lng: -95.138175
            })
        break;
        case 'eldin/bouldan':
            createInventoryItem(event.playerId, 'milk', {
                name: 'Milk',
                type: 'quest-item'
            })
            createEncounter(event.playerId, 'eldin/bouldan-2', {
                label: 'Talk',
                imageSlug: 'bouldan-avatar',
                lat: 29.508465, 
                lng: -95.136107
            })
        break;
        case 'eldin/mines':
            createEncounter(event.playerId, 'eldin/darvok', {
                label: 'Talk',
                imageSlug: 'darvok-avatar',
                lat: 29.506907, 
                lng: -95.137956
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/eldin/3', {
                lat: 29.507140, 
                lng: -95.137816
            })
            createKeese(event.playerId, 'enemy/keese/fire/eldin/2', {
                lat: 29.5078, 
                lng: -95.1381
            })
            createPot(event.playerId, 'common/pot/eldin/2', {
                lat: 29.507673,
                lng: -95.138195
            })
        break;
        case 'eldin/darvok':
            removeInventoryItem(event.playerId, 'milk')
            markEncounterResolved(event.playerId, 'eldin/bouldan-2', {})
            createEncounter(event.playerId, 'eldin/fyrus', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.507874, 
                lng: -95.137889
            })
        break;
        case 'eldin/fyrus':
            markEncounterResolved(event.playerId, 'eldin/lodron', {})
            createInventoryItem(event.playerId, 'key', {
                name: 'Key',
                type: 'quest-item'
            })
        break;
        case 'eldin/temple':
            incrementHeartContainers(event.playerId);
            removeInventoryItem(event.playerId, 'key');
            createEncounter(event.playerId, 'eldin/cache', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.507617,
                lng: -95.141983
            })
            createGibdo(event.playerId, 'enemy/gibdo/standard/eldin/1', {
                lat: 29.5089, 
                lng: -95.1398
            })
            createGibdo(event.playerId, 'enemy/gibdo/standard/eldin/2', {
                lat: 29.5071, 
                lng: -95.1417
            })
            createGibdo(event.playerId, 'enemy/gibdo/fire/eldin/1', {
                lat: 29.5085, 
                lng: -95.1398
            })
            createMoblin(event.playerId, 'enemy/moblin/fire/eldin/1', {
                lat: 29.5076,
                lng: -95.1410
            })
            createPot(event.playerId, 'common/pot/eldin/3', {
                lat: 29.5082,
                lng: -95.1399
            })
            createPot(event.playerId, 'common/pot/eldin/4', {
                lat: 29.5073,
                lng: -95.1414
            })
            createPot(event.playerId, 'common/pot/eldin/5', {
                lat: 29.5082,
                lng: -95.1399
            })
        break;
        case 'eldin/cache':
            createInventoryItem(event.playerId, 'fire-sword', {
                name: 'Fire Sword',
                type: 'weapon'
            })
            await createFinaleIfAllTemplesWatered(event.playerId);
            createGibdo(event.playerId, 'enemy/gibdo/fire/eldin/2', {
                lat: 29.5078, 
                lng: -95.1418
            })
            createGibdo(event.playerId, 'enemy/gibdo/fire/eldin/3', {
                lat: 29.5091, 
                lng: -95.1399
            })
            createMoblin(event.playerId, 'enemy/moblin/fire/eldin/2', {
                lat: 29.5087, 
                lng: -95.1415
            })
            createMoblin(event.playerId, 'enemy/moblin/fire/eldin/3', {
                lat: 29.5091, 
                lng: -95.1394
            })
            createTalus(event.playerId, 'enemy/talus/fire/bazaar/1', {
                lat: 29.574208, 
                lng: -95.363102
            })
        break;
    }
}

async function handleZorasEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'zoras/intro':
            createEncounter(event.playerId, 'zoras/temple', {
                label: 'Inspect...',
                imageSlug: 'locked-door',
                lat: 29.641918, 
                lng: -95.219221
            })
            createEncounter(event.playerId, 'zoras/zaylen', {
                label: 'Talk',
                imageSlug: 'zaylen-avatar',
                lat: 29.641910, 
                lng: -95.218973
            })
            createEncounter(event.playerId, 'zoras/addison', {
                label: 'Talk',
                imageSlug: 'addison-avatar',
                lat: 29.640884, 
                lng: -95.219226
            })
            createEncounter(event.playerId, 'zoras/nerali', {
                label: 'Talk',
                imageSlug: 'nerali-avatar',
                lat: 29.641209, 
                lng: -95.219009
            })
            createChest(event.playerId, 'common/chest/zoras/1', {
                lat: 29.640741,
                lng: -95.216783
            })
            createChest(event.playerId, 'common/chest/zoras/2', {
                lat: 29.642115, 
                lng:  -95.217834
            })
            createPool(event.playerId, 'common/pool/zoras/1', {
                lat: 29.640770,
                lng: -95.218130
            })
            createPool(event.playerId, 'common/pool/zoras/2', {
                lat: 29.641596, 
                lng:  -95.217906
            })
            createPool(event.playerId, 'common/pool/zoras/3', {
                lat: 29.641448, 
                lng:  -95.219389
            })
            createPool(event.playerId, 'common/pool/zoras/4', {
                lat: 29.642141, 
                lng:  -95.218464
            })
            createPool(event.playerId, 'common/pool/zoras/5', {
                lat: 29.640992, 
                lng: -95.220044
            })
            createGrass(event.playerId, 'common/grass/zoras/1', {
                lat: 29.641317, 
                lng: -95.219431
            })
            createGrass(event.playerId, 'common/grass/zoras/2', {
                lat: 29.641899, 
                lng: -95.217609
            })
            createTree(event.playerId, 'common/tree/zoras/1', {
                lat: 29.641263, 
                lng: -95.217867
            })
            createTree(event.playerId, 'common/tree/zoras/2', {
                lat: 29.642236, 
                lng:  -95.218835
            })
            createTree(event.playerId, 'common/tree/zoras/3', {
                lat: 29.640980, 
                lng:  -95.220439
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/water/zoras/1', {
                lat: 29.640723, 
                lng: -95.219099
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/water/zoras/2', {
                lat: 29.641795, 
                lng: -95.219334
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/water/zoras/3', {
                lat: 29.641632, 
                lng: -95.217803
            })
            createDekuBaba(event.playerId, 'enemy/deku-baba/water/zoras/4', {
                lat: 29.642022,
                lng: -95.218287
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/zoras/1', {
                lat: 29.640723, 
                lng: -95.218470
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/zoras/2', {
                lat: 29.641408,
                lng:  -95.219347
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/standard/zoras/3', {
                lat: 29.640422, 
                lng: -95.219082
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/zoras/1', {
                lat: 29.640454,
                lng: -95.220243
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/zoras/2', {
                lat: 29.641990,
                lng: -95.219123
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/zoras/3', {
                lat: 29.641766, 
                lng: -95.217953
            })
        break;
        case 'zoras/nerali':
            createEncounter(event.playerId, 'zoras/throne-room', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.641214, 
                lng: -95.217876
            })
        break;
        case 'zoras/throne-room':
            markEncounterResolved(event.playerId, 'zoras/addison', {})
            createEncounter(event.playerId, 'zoras/tentalus', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.641113,
                lng: -95.220478
            })
        break;
        case 'zoras/tentalus':
            markEncounterResolved(event.playerId, 'zoras/zaylen', {})
            createInventoryItem(event.playerId, 'key', {
                name: 'Key',
                type: 'quest-item'
            })
        break;
        case 'zoras/temple':
            incrementHeartContainers(event.playerId);
            removeInventoryItem(event.playerId, 'key')
            createEncounter(event.playerId, 'zoras/cache', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.64205,
                lng: -95.2185
            })
            createDarknut(event.playerId, 'enemy/darknut/water/zoras/1', {
                lat: 29.642209, 
                lng: -95.218935
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/water/zoras/1', {
                lat: 29.642090, 
                lng: -95.218820
            })
        break;
        case 'zoras/cache':
            createInventoryItem(event.playerId, 'water-sword', {
                name: 'Water Sword',
                type: 'weapon'
            })
            await createFinaleIfAllTemplesWatered(event.playerId);
            createDarknut(event.playerId, 'enemy/darknut/water/zoras/2', {
                lat: 29.642169, 
                lng: -95.218647
            })
            createDarknut(event.playerId, 'enemy/darknut/water/zoras/3', {
                lat: 29.642191, 
                lng: -95.218450
            })

            createLizalfos(event.playerId, 'enemy/lizalfos/water/zoras/2', {
                lat: 29.642101, 
                lng: -95.218585
            })
            createLizalfos(event.playerId, 'enemy/lizalfos/water/zoras/3', {
                lat: 29.642072, 
                lng: -95.218433
            })
            createTalus(event.playerId, 'enemy/talus/water/bazaar/1', {
                lat: 29.574255, 
                lng: -95.363394
            })
        break;
    }
}

async function handleHebraEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'hebra/intro':
            createEncounter(event.playerId, 'hebra/kyllis', {
                label: 'Talk',
                imageSlug: 'kyllis-avatar',
                lat: 29.582168, 
                lng: -95.416507
            })
            createEncounter(event.playerId, 'hebra/fox', {
                label: 'Talk',
                imageSlug: 'fox',
                lat: 29.581471, 
                lng: -95.416594
            })
            createChest(event.playerId, 'common/chest/hebra/1', {
                lat: 29.582533, 
                lng: -95.415775
            })
            createGrass(event.playerId, 'common/grass/hebra/1', {
                lat: 29.581359, 
                lng: -95.417012
            })
            createGrass(event.playerId, 'common/grass/hebra/2', {
                lat: 29.582132, 
                lng: -95.416520
            })
            createKeese(event.playerId, 'enemy/keese/ice/hebra/1', {
                lat: 29.581630,
                lng:  -95.416891
            })
            createKeese(event.playerId, 'enemy/keese/ice/hebra/2', {
                lat: 29.581612, 
                lng: -95.415647
            })
            createSnowTree(event.playerId, 'common/snow-tree/hebra/1', {
                lat: 29.581612,
                lng:  -95.416352
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/hebra/1', {
                lat: 29.581660, 
                lng: -95.416155
            })
        break;
        case 'hebra/kyllis':
            createEncounter(event.playerId, 'hebra/temple-1', {
                label: 'Inspect...',
                imageSlug: 'locked-door',
                lat: 29.582322, 
                lng: -95.411810
            })
            createEncounter(event.playerId, 'hebra/lloron-den', {
                label: 'Enter',
                imageSlug: 'lloron-den',
                lat: 29.582166, 
                lng: -95.409761
            })
            createChest(event.playerId, 'common/chest/hebra/2', {
                lat: 29.580531, 
                lng:  -95.409370
            })
            createWolf(event.playerId, 'common/wolf/hebra/1', {
                lat: 29.581874, 
                lng: -95.415021
            })
            createWolf(event.playerId, 'common/wolf/hebra/2', {
                lat: 29.582001, 
                lng:  -95.412672
            })
            createWolf(event.playerId, 'common/wolf/hebra/3', {
                lat: 29.581242, 
                lng:  -95.409227
            })
            createSnowTree(event.playerId, 'common/snow-tree/hebra/2', {
                lat: 29.581699, 
                lng: -95.415306
            })
            createSnowTree(event.playerId, 'common/snow-tree/hebra/3', {
                lat: 29.582122, 
                lng: -95.414126
            })
            createSnowTree(event.playerId, 'common/snow-tree/hebra/4', {
                lat: 29.581994, 
                lng:  -95.412683
            })
            createSnowTree(event.playerId, 'common/snow-tree/hebra/5', {
                lat: 29.582423, 
                lng: -95.410739
            })
            createKeese(event.playerId, 'enemy/keese/ice/hebra/3', {
                lat: 29.582274, 
                lng: -95.411988
            })
            createKeese(event.playerId, 'enemy/keese/ice/hebra/4', {
                lat: 29.581602, 
                lng: -95.409070
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/hebra/2', {
                lat: 29.582113, 
                lng: -95.414320
            })
            createMoblin(event.playerId, 'enemy/moblin/standard/hebra/3', {
                lat: 29.580633, 
                lng: -95.409316
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/hebra/1', {
                lat: 29.581729,
                lng: -95.415309
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/hebra/2', {
                lat: 29.581902,
                lng:  -95.413176
            })
            createDarknut(event.playerId, 'enemy/darknut/standard/hebra/3', {
                lat: 29.582343, 
                lng: -95.411890
            })
        break;
        case 'hebra/temple-1':
            createEncounter(event.playerId, 'hebra/temple-2', {
                label: 'Inspect...',
                imageSlug: 'locked-door',
                lat: 29.582322, 
                lng: -95.411810
            })
        break;
        case 'hebra/lloron-den':
            createEncounter(event.playerId, 'hebra/frostus', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.582169, 
                lng: -95.409038
            })
        break;
        case 'hebra/frostus':
            markEncounterResolved(event.playerId, 'hebra/fox', {});
        break;
        case 'hebra/temple-2':
            incrementHeartContainers(event.playerId);
            createEncounter(event.playerId, 'hebra/cache', {
                label: 'Inspect...',
                imageSlug: 'marker',
                lat: 29.582217,
                lng: -95.411933,
            })
            createDarknut(event.playerId, 'enemy/darknut/ice/hebra/1', {
                lat: 29.582337, 
                lng: -95.411857
            })
            createMoblin(event.playerId, 'enemy/moblin/ice/hebra/1', {
                lat: 29.582301, 
                lng: -95.411850
            })
        break;
        case 'hebra/cache':
            createInventoryItem(event.playerId, 'ice-sword', {
                name: 'Ice Sword',
                type: 'weapon'
            })
            await createFinaleIfAllTemplesWatered(event.playerId);
            createDarknut(event.playerId, 'enemy/darknut/ice/hebra/2', {
                lat: 29.582298, 
                lng: -95.411940
            })
            createDarknut(event.playerId, 'enemy/darknut/ice/hebra/3', {
                lat: 29.582292, 
                lng: -95.412056
            })
            createMoblin(event.playerId, 'enemy/moblin/ice/hebra/2', {
                lat: 29.582296, 
                lng: -95.411995
            })
            createMoblin(event.playerId, 'enemy/moblin/ice/hebra/3', {
                lat: 29.582283, 
                lng: -95.412124
            })
            createTalus(event.playerId, 'enemy/talus/ice/bazaar/1', {
                lat: 29.574469, 
                lng: -95.363427
            })
        break;
    }
}

async function createFinaleIfAllTemplesWatered(playerId: number) {
    const templesWatered = await getTemplesWateredByUserId(playerId);
    if (templesWatered.totalComplete === 4) {
        completeObjective(playerId, 'visit-temples');
        createEncounter(playerId, 'finale/intro', {
            label: 'Inspect',
            imageSlug: 'marker',
            lat: 29.539490,
            lng: -95.363127
        })
    }
}

async function handleFinaleEncounters(event: EncounterResolvedEvent) {
    switch (event.slug) {
        case 'finale/intro':
            createEncounter(event.playerId, 'finale/moblin-fight', {
                label: 'Engage',
                imageSlug: 'moblin',
                lat: 29.539472, 
                lng: -95.363074
            })
        break;
        case 'finale/moblin-fight':
            createEncounter(event.playerId, 'finale/lizalfos-fight', {
                label: 'Engage',
                imageSlug: 'lizalfos',
                lat: 29.539445, 
                lng: -95.363031
            })
        break;
        case 'finale/lizalfos-fight':
            createEncounter(event.playerId, 'finale/gibdo-fight', {
                label: 'Engage',
                imageSlug: 'gibdo',
                lat: 29.539418, 
                lng: -95.362980
            })
        break;
        case 'finale/gibdo-fight':
            createEncounter(event.playerId, 'finale/darknut-fight', {
                label: 'Engage',
                imageSlug: 'darknut',
                lat: 29.539367, 
                lng: -95.362916
            })
        break;
        case 'finale/darknut-fight':
            createEncounter(event.playerId, 'finale/talus-fight', {
                label: 'Engage',
                imageSlug: 'talus',
                lat: 29.539337, 
                lng: -95.362885
            })
        break;
        case 'finale/talus-fight':
            createEncounter(event.playerId, 'finale/lynel-fight', {
                label: 'Engage',
                imageSlug: 'lynel',
                lat: 29.539306, 
                lng: -95.362674
            })
        break;
        case 'finale/lynel-fight':
            createEncounter(event.playerId, 'finale/hyrule-united', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.539306, 
                lng: -95.362674
            })
        break;
        case 'finale/hyrule-united':
            createEncounter(event.playerId, 'finale/songs', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.539341, 
                lng: -95.362537
            })
        break;
        case 'finale/songs':
            createEncounter(event.playerId, 'finale/epilogue', {
                label: 'Inspect',
                imageSlug: 'marker',
                lat: 29.539817,
                lng:  -95.363001
            })
        break;
    }
}
