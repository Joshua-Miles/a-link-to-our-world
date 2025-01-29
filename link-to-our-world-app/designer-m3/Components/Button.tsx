import Color from "color";
import { Theme } from "designer-m3";
import { createComponentWithVariants } from "designer-m3/createComponentWithVariants";
import { StyledView } from "ui-core";

const BUTTON_HEIGHT = 40;

const ButtonBase = StyledView.style((theme: Theme) => ({
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: BUTTON_HEIGHT / 2,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    ...theme.typography.label.large,
}))

export const Button = createComponentWithVariants(ButtonBase, {
    Elevated: (theme: Theme) => ({
        color: theme.colors.roles.primary,
        backgroundColor: theme.colors.roles.surfaceContainerLow,
        shadow: {
            ...theme.shadows.resting,
            color: theme.colors.roles.shadow
        },
        _focus: {
            backgroundColor: Color(theme.colors.roles.surfaceContainerLow).mix(Color(theme.colors.roles.primary), 0.05).hex(),
            shadow: {
                ...theme.shadows.resting,
                color: theme.colors.roles.shadow
            },
        },
        _hover: {
            backgroundColor: Color(theme.colors.roles.surfaceContainerLow).mix(Color(theme.colors.roles.primary), 0.05).hex(),
            shadow: {
                ...theme.shadows.resting,
                color: theme.colors.roles.shadow
            },
        },
        _press: {
            backgroundColor: Color(theme.colors.roles.surfaceContainerLow).mix(Color(theme.colors.roles.primary), 0.1).hex(),
            shadow: {
                ...theme.shadows.high,
                color: theme.colors.roles.shadow
            },
        },
        _disabled: {
            backgroundColor: theme.colors.roles.primary,
            opacity: 0.5
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),

    Filled: (theme: Theme) => ({
        color: theme.colors.roles.onPrimary,
        backgroundColor: theme.colors.roles.primary,
        _focus: {
            backgroundColor: Color(theme.colors.roles.primary).mix(Color(theme.colors.roles.onPrimary), 0.2).hex(),
        },
        _hover: {
            backgroundColor: Color(theme.colors.roles.primary).mix(Color(theme.colors.roles.onPrimary), 0.2).hex(),
        },
        _press: {
            backgroundColor: Color(theme.colors.roles.primary).mix(Color(theme.colors.roles.onPrimary), 0.4).hex(),
        },
        _disabled: {
            backgroundColor: theme.colors.roles.primary,
            opacity: 0.5
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),

    FilledTonal: (theme: Theme) => ({
        color: theme.colors.roles.onSecondaryContainer,
        backgroundColor: theme.colors.roles.secondaryContainer,
        _focus: {
            backgroundColor: Color(theme.colors.roles.secondaryContainer).mix(Color(theme.colors.roles.onSecondaryContainer), 0.05).hex(),
        },
        _hover: {
            backgroundColor: Color(theme.colors.roles.secondaryContainer).mix(Color(theme.colors.roles.onSecondaryContainer), 0.05).hex(),
        },
        _press: {
            backgroundColor: Color(theme.colors.roles.secondaryContainer).mix(Color(theme.colors.roles.onSecondaryContainer), 0.1).hex(),
        },
        _disabled: {
            backgroundColor: theme.colors.roles.primary,
            opacity: 0.5
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),

    Outlined: (theme: Theme) => ({
        color: theme.colors.roles.primary,
        backgroundColor: 'rgba(0,0,0,0)',
        borderStyle: 'solid',
        borderWidth: theme.spacing.hairline,
        borderColor: theme.colors.roles.outline,
        _focus: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.05).rgb().toString(),
        },
        _hover: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.05).rgb().toString(),
        },
        _press: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.1).rgb().toString(),
        },
        _disabled: {
            backgroundColor: 'rgba(0,0,0,0)',
            opacity: 0.5
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),

    Text: (theme: Theme) => ({
        color: theme.colors.roles.primary,
        backgroundColor: 'rgba(0,0,0,0)',
        _focus: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.05).rgb().toString(),
        },
        _hover: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.05).rgb().toString(),
        },
        _press: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.1).rgb().toString(),
        },
        _disabled: {
            backgroundColor: 'rgba(0,0,0,0)',
            opacity: 0.5
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),
})
