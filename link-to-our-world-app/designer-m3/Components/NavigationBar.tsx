import Color from "color";
import { Theme } from "designer-m3";
import { StyledText, StyledView } from "ui-core";
import { Column } from "./Layout";
import { Row } from "./Layout";


const NavigationBarContainer = Row.style((theme: Theme) => ({
    backgroundColor: theme.colors.roles.surfaceContainer,
    justifyContent: 'space-evenly',
    height: 80,
    paddingTop: 12,
    paddingBottom: 16,
}))

export function NavigationBar(props: Parameters<typeof NavigationBarContainer>[0]) {
    return <NavigationBarContainer {...props} hideOnKeyboard />
}

export const NavigationItem = Column
    .withInteractionState('_active')
    .deriveInteractionStateFromProps(({ active }: { active?: boolean }) => ({ _active: active }))
    .style((theme: Theme) => ({
        _hover: {

        },
        transform: [
            {
                scale: 1
            }
        ],
        _press: {
            transform: [
                {
                    scale: 0.95
                }
            ]
        },
        transitions: {
            transform: [
                {
                    scale: theme.motion.transitions.standard
                }
            ]
        }
    }))

export const NavigationIcon = StyledView
    .inheritInteractionState(NavigationItem.is('_active'), '_active')
    .inheritInteractionState(NavigationItem.is('_hover'), '_itemHovered')
    .style((theme: Theme) => ({
        width: 64,
        height: 32,
        borderRadius: 16,
        color: theme.colors.roles.onSurfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        _itemHovered: {
            backgroundColor: Color(theme.colors.roles.primary).alpha(0.05).rgb().toString(),
        },
        _active: {
            backgroundColor: theme.colors.roles.primaryContainer,
            color: theme.colors.roles.onPrimaryContainer,
        },
        transitions: {
            backgroundColor: theme.motion.transitions.standard
        }
    }))

export const NavigationLabel = StyledText
    .inheritInteractionState(NavigationItem.is('_active'), '_active')
    .inheritInteractionState(NavigationItem.is('_hover'), '_itemHovered')
    .style((theme: Theme) => ({
        marginTop: 4,
        color: theme.colors.roles.onSurfaceVariant,
        textAlign: 'center',
        _active: {
            color: theme.colors.roles.onSurface
        },
        _itemHovered: {

        }
    }))
