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

export  const createSnowTree = (playerId: number, slug: Slug & `common/snow-tree/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Pick',
    imageSlug: 'snow-tree',
})

export  const createPalmTree = (playerId: number, slug: Slug & `common/palm-tree/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Pick',
    imageSlug: 'palm-tree',
})

export  const createWolf = (playerId: number, slug: Slug & `common/wolf/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: 'wolf',
})

export  const createPool = (playerId: number, slug: Slug & `common/pool/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Inspect',
    imageSlug: 'pool',
})

type Force = 'standard' | 'fire' | 'water' | 'ice' | 'electric'

export const createChu = (playerId: number,  slug: Slug & `enemy/chu/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('chu', slug),
})

export const createDekuBaba = (playerId: number,  slug: Slug & `enemy/deku-baba/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('deku-baba', slug),
})

export const createKeese = (playerId: number,  slug: Slug & `enemy/keese/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('keese', slug),
})

export const createMoblin = (playerId: number,  slug: Slug & `enemy/moblin/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('moblin', slug),
})

export const createLizalfos = (playerId: number,  slug: Slug & `enemy/lizalfos/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('lizalfos', slug),
})

export const createGibdo = (playerId: number,  slug: Slug & `enemy/gibdo/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('gibdo', slug),
})

export const createDarknut = (playerId: number,  slug: Slug & `enemy/darknut/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('darknut', slug),
})

export const createTalus = (playerId: number,  slug: Slug & `enemy/talus/${Force}/${string}`, options: Pick<Options, 'lat' | 'lng'>) => createEncounter(playerId, slug, {
    ...options,
    label: 'Attack',
    imageSlug: prefixImageSlug('talus', slug),
})

function prefixImageSlug(imageSlug: string, slug: string) {
    if (slug.includes('fire')) return `fire-${imageSlug}`
    if (slug.includes('ice')) return `ice-${imageSlug}`
    if (slug.includes('water')) return `water-${imageSlug}`
    if (slug.includes('electric')) return `electric-${imageSlug}`
    return imageSlug
}
