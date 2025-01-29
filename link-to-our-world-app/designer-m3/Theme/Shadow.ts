import { BoxShadow } from "ui-core/SVGShadow"

export type ShadowTheme = {
    resting: Omit<BoxShadow, 'color'>,
    high: Omit<BoxShadow, 'color'>
}

export const defaultShadowTheme: ShadowTheme = {
    resting: {
        radius: 4,
        y: 2
    },
    high: {
        radius: 5,
        y: 2
    }
}
