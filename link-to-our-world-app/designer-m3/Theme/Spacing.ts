export type SpacingTheme = {
    hairline: number,
    emphasized: number,
    gap: number,
    xs: number
    sm: number,
    md: number,
    lg: number,
    touchable: number,
    '2xl': number,
    container: {
        sm: number
        md: number
        lg: number
        xl: number
    },
    corner: {
        xs: number
        sm: number
    },
    lines: {
        xs: number,
        sm: number,
        md: number
    }
}

export const defaultSpacingTheme: SpacingTheme = {
    hairline: 1,
    emphasized: 2,
    gap: 6,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 36,
    touchable: 40,
    '2xl': 48,
    container: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
    },
    corner: {
        xs: 4,
        sm: 8
    },
    lines: {
        xs: 2,
        sm: 4,
        md: 6
    }
}
