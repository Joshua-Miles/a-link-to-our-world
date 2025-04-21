import { Encounter, Encounters } from "./Encounter";

type Slug = Encounter['slug']

type RequiredOptions = Pick<Encounter, 'label' | 'lat' | 'lng'>;

type Options = RequiredOptions & Partial<Pick<Encounter, 'imageSlug' | 'imageSize'>>

export const createEncounter = (playerId: number, slug: Slug, options: Options) => {
    const { label, lat, lng } = options;

    Encounters.append({
        playerId,
        slug,
        label,
        lat,
        lng,
        imageSlug: options.imageSlug ?? slug,
        imageSize: options.imageSize ?? 20,

        resolved: false,
        // @ts-ignore
        state: {}
    })
}

export  const createChest = (playerId: number, slug: Slug & `common/chest/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Open',
    imageSlug: 'chest',
})

export  const createGrass = (playerId: number, slug: Slug & `common/grass/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Cut',
    imageSlug: 'shrub',
})

export  const createTree = (playerId: number, slug: Slug & `common/tree/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Pick',
    imageSlug: 'tree',
})

export  const createPot = (playerId: number, slug: Slug & `common/pot/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Break',
    imageSlug: 'pot',
})

export  const createCow = (playerId: number, slug: Slug & `common/cow/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Inspect',
    imageSlug: 'cow',
})

export  const createChicken = (playerId: number, slug: Slug & `common/chicken/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Inspect',
    imageSlug: 'cucco',
})

export  const createWell = (playerId: number, slug: Slug & `common/well/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Inspect',
    imageSlug: 'well',
})

