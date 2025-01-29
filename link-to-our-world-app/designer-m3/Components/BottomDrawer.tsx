import { Theme } from "designer-m3";
import { StyledView } from "ui-core";

export const BottomDrawer = StyledView.style( (theme: Theme) => ({
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    backgroundColor: theme.colors.roles.surfaceContainerLowest,
    borderTopStartRadius: theme.spacing.corner.xs,
    borderTopEndRadius: theme.spacing.corner.xs,
    padding: theme.spacing.xs,
    opacity: 0,
    shadow: theme.shadows.high,
    transform: [
        { translateY: '100%' }
    ],
    _displayed: {
        opacity: 1,
        transform: [
            { translateY: '1%' }
        ],
    },
    transitions: {
        opacity: theme.motion.transitions.standard,
        transform: [
            { translateY: theme.motion.transitions.standard }
        ]
    }
}))
