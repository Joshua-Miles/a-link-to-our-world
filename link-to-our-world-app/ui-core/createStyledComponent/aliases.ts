import type { DimensionValue } from "react-native/types"
import type { InteractionState, StyleProps } from "./createStyledComponent"

type Alias =
    | 'm'
    | 'mt'
    | 'mb'
    | 'mr'
    | 'ml'
    | 'mx'
    | 'my'
    | 'ms'
    | 'me'
    | 'p'
    | 'pt'
    | 'pb'
    | 'pr'
    | 'pl'
    | 'px'
    | 'py'
    | 'ps'
    | 'pe'

export type WithAlaises<T> = T & Partial<Record<Alias, DimensionValue>>

const aliases: Record<Alias, keyof StyleProps<any>> = {
    m: 'margin',
    mt: 'marginTop',
    mb: 'marginBottom',
    mr: 'marginRight',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    ms: 'marginStart',
    me: 'marginEnd',
    p: 'padding',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pr: 'paddingRight',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    ps: 'paddingStart',
    pe: 'paddingEnd'
}

export function resolveCoreStylePropAlias<T extends InteractionState>(key: keyof StyleProps<T>): keyof StyleProps<T> {
    return aliases[key as Alias] ?? key;
}
