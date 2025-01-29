export * from './Typography';
export * from './Color';

import { BaseTheme, defaultTheme } from "ui-core"
import { useTheme } from 'ui-core/Theme';
import { defaultColorTheme, ColorTheme } from "./Color";
import { defaultMotionTheme, MotionTheme } from './Motion';
import { defaultShadowTheme, ShadowTheme } from './Shadow';
import { defaultSpacingTheme, SpacingTheme } from './Spacing';
import { defaultTypographyTheme, TypographyTheme } from "./Typography"

export type Theme = BaseTheme & {
    typography: TypographyTheme
    colors: ColorTheme
    spacing: SpacingTheme
    shadows: ShadowTheme
    motion: MotionTheme
}

export const theme: Theme = {
    ...defaultTheme,
    typography: defaultTypographyTheme,
    colors: defaultColorTheme,
    spacing: defaultSpacingTheme,
    shadows: defaultShadowTheme,
    motion: defaultMotionTheme
}

export function useDesignerTheme() {
    return useTheme<Theme>();
}
