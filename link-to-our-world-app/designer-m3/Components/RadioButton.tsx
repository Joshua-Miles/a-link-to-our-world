import Color from "color";
import { Theme, useDesignerTheme } from "designer-m3";
import { createContext, ReactNode, useContext } from "react"
import { StyledView } from "ui-core";
import { Label, Row } from ".";

type RadioGroupState<T> = {
    value: T
    onChange: (value: T) => any
}

const RadioGroupContext = createContext<RadioGroupState<any>>(null);

export type RadioGroupProps<T> = RadioGroupState<T> & {
    children: ReactNode
}

export function RadioGroup({ children, value, onChange }) {
    return (
        <RadioGroupContext.Provider value={{ value, onChange }}>
            {children}
        </RadioGroupContext.Provider>
    )
}

export type RadioButtonProps = {
    value: any
}

export function RadioButton({ value }: RadioButtonProps) {
    const group = useContext(RadioGroupContext);
    return (
        <RadioContainer forceState={{ _checked: group.value === value }} onPress={() => group.onChange(value)}>
            <RadioOutline>
                <RadioDot />
            </RadioOutline>
        </RadioContainer>
    )
}

export type RadioButtonLabelProps = RadioButtonProps & {
    children: ReactNode
}

export function RadioButtonLabel({ value, children }: RadioButtonLabelProps) {
    const group = useContext(RadioGroupContext);
    const { spacing } = useDesignerTheme();
    return <Label.Small paddingLeft={spacing.xs} onPress={() => group.onChange(value)}>{children}</Label.Small>
}

export type RadioControlProps = Parameters<typeof Row>[0] & {
    value: any
    label: string
}

export function RadioControl({ value, label, ...props}: RadioControlProps) {
    return (
        <Row alignItems="center" {...props}>
            <RadioButton value={value} />
            <RadioButtonLabel value={value}>{label}</RadioButtonLabel>
        </Row>
    )
}

const RadioContainer = StyledView
    .withInteractionState('_checked')
    .style((theme: Theme) => ({
        height: theme.spacing.touchable,
        width: theme.spacing.touchable,
        borderRadius: theme.spacing.touchable / 2,
        justifyContent: 'center',
        alignItems: 'center',
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
    }))

const RadioOutline = StyledView
    .inheritInteractionState(RadioContainer.is('_checked'), '_checked')
    .style((theme: Theme) => ({
        height: theme.spacing.touchable / 2,
        width: theme.spacing.touchable / 2,
        borderRadius: theme.spacing.touchable / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: theme.colors.roles.onSurfaceVariant,
        borderWidth: theme.spacing.lines.xs,
        _checked: {
            borderColor:  theme.colors.roles.primary
        },
        transitions: {
            borderColor: theme.motion.transitions.standard
        }
    }))

const RadioDot = StyledView
    .inheritInteractionState(RadioContainer.is('_checked'), '_checked')
    .style((theme: Theme) => ({
        height: theme.spacing.touchable / 4,
        width: theme.spacing.touchable / 4,
        borderRadius: theme.spacing.touchable / 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.roles.primary,
        opacity: 0,
        _checked: {
            opacity: 1
        },
        transitions: {
            opacity: theme.motion.transitions.standard
        }
    }))