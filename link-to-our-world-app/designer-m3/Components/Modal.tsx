import Color from "color"
import { Theme } from "designer-m3"
import { ReactNode } from "react"
import { StyledView } from "ui-core"

const ModalOverlay = StyledView
    .style( (theme: Theme) => ({
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: Color(theme.colors.roles.shadow).alpha(0.25).toString(),
        cursor: 'initial',
        opacity: 0,
        alignItems: 'center',
        justifyContent: 'center',
        _displayed: {
            opacity: 1,
        },
        transitions: {
            opacity: theme.motion.transitions.standard
        }
    }))

const ModalContent = StyledView
    .style( (theme: Theme) => ({
        minWidth: '50vw',
        minHeight: 100,
        cursor: 'initial',
        backgroundColor: theme.colors.roles.surface,
        borderRadius: theme.spacing.corner.xs,
        padding: theme.spacing.sm,
        transform: [
            { scale: 0.5 }
        ],
        _displayed: {
            transform: [
                { scale: 1 }
            ]
        },
        transitions: {
            transform: [
                { scale: theme.motion.transitions.standard }
            ]
        }
    }))

type ModalProps = {
    isOpen: boolean
    onClose: () => void;
    children: ReactNode
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
    return (
        <ModalOverlay display={isOpen ? 'flex' : 'none'} onPress={onClose}>
            <ModalContent display={isOpen ? 'flex' : 'none'} onPress={() => void(0)}>
                {children}
            </ModalContent>
        </ModalOverlay>
    )
}
