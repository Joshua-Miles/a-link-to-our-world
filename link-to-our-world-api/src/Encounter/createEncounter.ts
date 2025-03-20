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