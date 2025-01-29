import Color from "color";
import { Theme } from "designer-m3";
import { createComponentWithVariants } from "../createComponentWithVariants";
import { StyledView } from "ui-core";

type ToggleProps = {
    value?: boolean
}

const IconButtonBase = StyledView
    .withInteractionState('_on')
    .deriveInteractionStateFromProps( (props: ToggleProps) => ({
        _on: props.value
    }))
    .style(() => ({
        minHeight: 40,
        minWidth: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }))

export const IconButton = createComponentWithVariants(IconButtonBase, {
    Standard: (theme: Theme) => ({
        color: theme.colors.roles.onSurfaceVariant,
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
        _on: {
            color: theme.colors.roles.primary
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }),
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
    })
})
