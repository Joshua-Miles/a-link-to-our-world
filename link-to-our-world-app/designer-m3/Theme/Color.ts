import Color from 'color';

export type KeyColor = 'primary' | 'secondary' | 'tertiary';

export type SemanticColor = 'error' | 'warning' | 'success';

export type NeutralColor = 'neutral' | 'neutralVariant';

export type KeyColorRole = ColorSet<KeyColor>;

export type SemanticColorRole = ColorSet<SemanticColor>;

export type SurfaceColorRole = 'surface' | 'onSurface' | 'onSurfaceVariant';

export type SurfaceContainerColorRole = ColorElevation<'surfaceContainer'>;

export type UtilityColorRole = 'outline' | 'outlineVariant' | 'shadow';

export type ColorRole = KeyColorRole | SemanticColorRole | SurfaceColorRole | SurfaceContainerColorRole | UtilityColorRole;

export type ColorSet<R extends string> = R | `on${Capitalize<R>}` | `${R}Container` | `on${Capitalize<R>}Container`;

export type ColorElevation<R extends string> = `${R}Lowest` | `${R}Low` | R | `${R}High` | `${R}Highest`;

export type ColorRoles = Record<ColorRole, string>;

export type ColorPalettes = Record<KeyColor | SemanticColor | NeutralColor, string[]>;

export type KeyTone = ColorSet<'set'> | 'surface' | 'onSurface' | 'onSurfaceVariant' | 'outline' | 'shadow' |  ColorElevation<'elevation'>;

export type KeyToneSet = Record<KeyTone, number>;

export type ColorTheme = {
    roles: ColorRoles,
    palettes: ColorPalettes
}

const DEFAULT_ERROR_COLOR = '#ba1a1a';

const DEFAULT_WARNING_COLOR = '#edd200';

const DEFAULT_SUCCESS_COLOR = '#1e883d';

export const defaultLightModeTones: KeyToneSet = {
    set: 40,
    onSet: 100,
    setContainer: 90,
    onSetContainer: 10,

    surface: 98,
    onSurface: 10,
    onSurfaceVariant: 30,

    elevationLowest: 100,
    elevationLow: 96,
    elevation: 94,
    elevationHigh: 92,
    elevationHighest: 90,

    outline: 50,
    shadow: 0
}

export const ColorTheme = {

    fromSourceColor(sourceHex: string, tones: KeyToneSet = defaultLightModeTones): ColorTheme {
        const source = Color(sourceHex).hsl();
        const primary = calculatePrimary(source).hex();
        const secondary = calculateSecondary(source).hex();
        const tertiary = calculateTertiary(source).hex();
        return ColorTheme.fromKeyColors({ primary, secondary, tertiary }, tones);
    },

    fromKeyColors(colors: Record<KeyColor, string> & Partial<Record<SemanticColor | NeutralColor, string>>, tones: KeyToneSet = defaultLightModeTones): ColorTheme {
        const primary = Color(colors.primary).hsl();
        const secondary = Color(colors.secondary).hsl();
        const tertiary = Color(colors.tertiary).hsl();
        const error = Color(colors.error ?? DEFAULT_ERROR_COLOR).hsl();
        const warning = Color(colors.warning ?? DEFAULT_WARNING_COLOR).hsl();
        const success = Color(colors.success ?? DEFAULT_SUCCESS_COLOR).hsl();
        const neutral = Color(colors.neutral).hsl() ?? calculateDefaultNeutral(primary);
        const neutralVariant = Color(colors.neutralVariant).hsl() ?? calculateDefaultNeutralVariant(primary);

        const palettes: ColorPalettes = {
            primary: calculateHexPalette(primary),
            secondary: calculateHexPalette(secondary),
            tertiary: calculateHexPalette(tertiary),
            error: calculateHexPalette(error),
            warning: calculateHexPalette(warning),
            success: calculateHexPalette(success),
            neutral: calculateHexPalette(neutral),
            neutralVariant: calculateHexPalette(neutralVariant)
        }

        const roles: ColorRoles = {
            primary: palettes.primary[tones.set],
            onPrimary: palettes.primary[tones.onSet],
            primaryContainer: palettes.primary[tones.setContainer],
            onPrimaryContainer: palettes.primary[tones.onSetContainer],

            secondary: palettes.secondary[tones.set],
            onSecondary: palettes.secondary[tones.onSet],
            secondaryContainer: palettes.secondary[tones.setContainer],
            onSecondaryContainer: palettes.secondary[tones.onSetContainer],

            tertiary: palettes.tertiary[tones.set],
            onTertiary: palettes.tertiary[tones.onSet],
            tertiaryContainer: palettes.tertiary[tones.setContainer],
            onTertiaryContainer: palettes.tertiary[tones.onSetContainer],

            error: palettes.error[tones.set],
            onError: palettes.error[tones.onSet],
            errorContainer: palettes.error[tones.setContainer],
            onErrorContainer: palettes.error[tones.onSetContainer],

            warning: palettes.warning[tones.set],
            onWarning: palettes.warning[tones.onSet],
            warningContainer: palettes.warning[tones.setContainer],
            onWarningContainer: palettes.warning[tones.onSetContainer],

            success: palettes.success[tones.set],
            onSuccess: palettes.success[tones.onSet],
            successContainer: palettes.success[tones.setContainer],
            onSuccessContainer: palettes.success[tones.onSetContainer],

            surface: palettes.neutral[tones.surface],
            onSurface: palettes.neutral[tones.onSurface],
            onSurfaceVariant: palettes.neutralVariant[tones.onSurfaceVariant],

            surfaceContainerLowest: palettes.neutral[tones.elevationLowest],
            surfaceContainerLow: palettes.neutral[tones.elevationLow],
            surfaceContainer: palettes.neutral[tones.elevation],
            surfaceContainerHigh: palettes.neutral[tones.elevationHigh],
            surfaceContainerHighest: palettes.neutral[tones.elevationHighest],

            outline: palettes.neutral[tones.outline],
            outlineVariant: palettes.neutralVariant[tones.outline],

            shadow: Color(palettes.neutral[tones.shadow]).alpha(0.5).hex()
        }

        return { palettes, roles };
    }
}

function calculatePrimary(source: Color): Color {
    const { h, s, l } = source.object();
    return Color({ h, s: Math.max(s, 48), l });
}

function calculateSecondary(source: Color): Color {
    const { h, s, l } = source.object();
    return new Color({ h, s: 16, l: l - .5*(24-s)});
}

function calculateTertiary(source: Color): Color {
    const { h, s, l } = source.object();
    return new Color({ h: h + 60, s: 24, l: l - .6*(24 - s)});
}

function calculateDefaultNeutral(source: Color): Color {
    const { h, l } = source.object();
    return new Color({ h, s: 4, l });
}

function calculateDefaultNeutralVariant(source: Color): Color {
    const { h, l } = source.object();
    return new Color({ h, s: 8, l });
}

function calculateHexPalette(color: Color) {
    const { h, s } = color.object();
    const result: string[] = [];
    for (let i = 0; i <= 100; i++) {
        result.push(Color({ h, s, l: i }).hex());
    }
    return result;
}

export const defaultColorTheme: ColorTheme = ColorTheme.fromSourceColor('#41a499');
