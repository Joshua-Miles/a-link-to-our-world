import { TextStyle } from "react-native/types";

type TypographySize = 'base' | 'small' | 'medium' | 'large';

type TypographyStyle = Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'letterSpacing' | 'fontFamily'> & { lineHeight: number };

export type TypographyTheme = {
    display: Record<TypographySize, TypographyStyle>
    headline: Record<TypographySize, TypographyStyle>
    title: Record<TypographySize, TypographyStyle>
    body: Record<TypographySize, TypographyStyle>
    label: Record<TypographySize, TypographyStyle>
}

export const defaultTypographyTheme: TypographyTheme = {
    display: {
        base: {
            fontWeight: 400,
            fontFamily: 'TriForce',
            lineHeight: 58.66,
        },
        small: {
            fontSize: 48,
            lineHeight: 58.66,
            letterSpacing: 0
        },
        medium: {
            fontSize: 60,
            lineHeight: 60,
            letterSpacing: 0
        },
        large: {
            fontSize: 126,
            lineHeight: 85.33,
            letterSpacing: -0.33
        }
    },
    headline: {
        base: {
            fontWeight: 400,
            lineHeight: 42.66,
        },
        small: {
            fontSize: 32,
            lineHeight: 42.66,
            letterSpacing: 0
        },
        medium: {
            fontSize: 37.33,
            lineHeight: 48,
            letterSpacing: 0
        },
        large: {
            fontSize: 42.66,
            lineHeight: 53.33,
            letterSpacing: 0,
        }
    },
    title: {
        base: {
            fontWeight: 500,
            lineHeight: 26.66,
        },
        small: {
            fontSize: 18.66,
            lineHeight: 26.66,
            letterSpacing: 0.13
        },
        medium: {
            fontSize: 21.33,
            lineHeight: 32,
            letterSpacing: 0.2
        },
        large: {
            fontSize: 29.33,
            lineHeight: 37.33,
            letterSpacing: 0
        }
    },
    body: {
        base: {
            fontWeight: 400,
            lineHeight: 21.33,
        },
        small: {
            fontSize: 16,
            lineHeight: 21.33,
            letterSpacing: 0.53
        },
        medium: {
            fontSize: 18.66,
            lineHeight: 26.66,
            letterSpacing: 0.33
        },
        large: {
            fontSize: 21.33,
            lineHeight: 32,
            letterSpacing: 0.66
        }
    },
    label: {
        base: {
            fontWeight: 500,
            lineHeight: 21.33,
        },
        small: {
            fontSize: 14.66,
            lineHeight: 21.33,
            letterSpacing: 0.66
        },
        medium: {
            fontSize: 16,
            lineHeight: 21.33,
            letterSpacing: 0.66
        },
        large: {
            fontSize: 18.66,
            lineHeight: 26.66,
            letterSpacing: 0.13
        }
    },
}
