import { Theme } from "designer-m3";
import { useRef, useState } from "react";
import { TextInput as NativeInput, TextInputProps } from "react-native/types";
import { StyledText, StyledTextInput, StyledView } from "ui-core";
import { useTheme } from "ui-core/Theme";
import { Body } from "./Typography";

type TextFieldVariant = 'filled' | 'outlined';

const INPUT_HEIGHT = 56;

const TextFieldContainer = StyledView
    .withInteractionState('_focus', '_raise', '_error')
    .style((theme: Theme) => ({
        minHeight: INPUT_HEIGHT,
        cursor: 'text'
    }))

const TextFieldLabel = StyledText
    .inheritInteractionState(TextFieldContainer.is('_focus'), '_focus')
    .inheritInteractionState(TextFieldContainer.is('_raise'), '_raise')
    .inheritInteractionState(TextFieldContainer.is('_error'), '_error')
    .style( (theme: Theme) => ({
        position: 'absolute',
        left: theme.spacing.sm,
        top: (INPUT_HEIGHT - theme.typography.body.large.lineHeight) / 2,
        transformOrigin: 'left',
        transform: [
            { scale: 1 }
        ],
        ...theme.typography.body.large,
        color: theme.colors.roles.onSurfaceVariant,
        _focus: {
            color: theme.colors.roles.primary,
        },
        _error: {
            color: theme.colors.roles.error
        },
        transitions: {
            color: theme.motion.transitions.standard,
            top: theme.motion.transitions.standard,
            transform: [
                { scale: theme.motion.transitions.standard }
            ]
        }
    }))

const TextInput = StyledTextInput
    .style((theme: Theme) => ({
        ...theme.typography.body.medium,
        paddingLeft: theme.spacing.sm,
        color: theme.colors.roles.onSurface
    }))

const SupportingText = Body.Small
    .withInteractionState('_error')
    .style( (theme: Theme) => ({
        marginLeft: theme.spacing.sm,
        color: theme.colors.roles.onSurfaceVariant,
        _error: {
            color: theme.colors.roles.error
        }
    }))

type TextFieldVariantComponentSet = {
    TextFieldContainer: typeof TextFieldContainer,
    TextFieldLabel: typeof TextFieldLabel,
    TextInput: typeof TextInput
}

const TextFieldVariants: Record<TextFieldVariant, TextFieldVariantComponentSet> = {
    filled: {
        TextFieldContainer: TextFieldContainer.style( (theme: Theme) => ({
            backgroundColor: theme.colors.roles.surfaceContainerHighest,
            borderTopLeftRadius: theme.spacing.corner.xs,
            borderTopRightRadius: theme.spacing.corner.xs,
            borderBottomStyle: 'solid',
            borderBottomWidth: theme.spacing.hairline,
            borderBottomColor: theme.colors.roles.onSurfaceVariant,
            _focus: {
                borderBottomColor: theme.colors.roles.primary,
                borderBottomWidth: theme.spacing.emphasized
            },
            _error: {
                borderBottomColor: theme.colors.roles.error
            },
            transitions: {
                borderBottomColor: theme.motion.transitions.standard,
                borderBottomWidth: theme.motion.transitions.standard
            }
        })),
        TextFieldLabel: TextFieldLabel.style( (theme: Theme) => ({
            _raise: {
                top: -2,
                transform: [
                    { scale: 0.7 }
                ]
            },
        })),
        TextInput: TextInput.style( (theme: Theme) => ({
            paddingTop: theme.typography.body.large.lineHeight * .7,
        }))
    },
    outlined: {
        TextFieldContainer: TextFieldContainer.style((theme: Theme) => ({
            borderStyle: 'solid',
            borderColor: theme.colors.roles.outline,
            borderWidth: theme.spacing.hairline,
            borderRadius: theme.spacing.corner.xs,
            _focus: {
                borderColor: theme.colors.roles.primary
            },
            _error: {
                borderColor: theme.colors.roles.error
            },
            transitions: {
                borderColor: theme.motion.transitions.standard
            }
        })),
        TextFieldLabel: TextFieldLabel.style( (theme: Theme) => ({
            backgroundColor: theme.colors.roles.surfaceContainerLowest,
            _raise: {
                top: -18,
                transform: [
                    { scale: 0.7 }
                ]
            },
        })),
        TextInput: TextInput.style((theme: Theme) => ({
            paddingTop: theme.typography.body.large.lineHeight * .5,
        }))
    }
}

type TextFieldBaseProps = TextInputProps & {
    label: string
    variant: TextFieldVariant
    hasError?: boolean
    supporting?: string | null
}

function TextFieldBase({ variant, label, supporting, hasError, ...props }: TextFieldBaseProps){
    const theme = useTheme<Theme>();
    const [ isFocused, setIsFocused ] = useState(false);
    const input = useRef<NativeInput>(null);
    const value = useRef<string>('')

    const { TextFieldContainer, TextFieldLabel, TextInput } = TextFieldVariants[variant];

    const interactionState = {
        _focus: isFocused,
        _raise: Boolean(isFocused || props.value || value.current),
        _error: hasError
    };

    function focusInput() {
        if (input.current) input.current.focus();
    }

    function handleChangeText(text: string){
        if (props.onChangeText) props.onChangeText(text);
        value.current = text;
    }

    return (
        <StyledView flexGrow={1}>
            <TextFieldContainer forceState={interactionState} onPress={focusInput} onFocus={focusInput}>
                <TextFieldLabel>{label}</TextFieldLabel>
                <TextInput
                    ref={input}
                    cursorColor={hasError ? theme.colors.roles.error : theme.colors.roles.primary}
                    // @ts-ignore
                    onFocus={() => setIsFocused(true)}
                    // @ts-ignore
                    onBlur={() => setIsFocused(false)}
                    onChangeText={handleChangeText}
                    {...props}
                />
            </TextFieldContainer>
            <SupportingText forceState={interactionState}>
                {supporting}
            </SupportingText>
        </StyledView>
    )
}

export const TextField = {
    Filled: (props: Omit<TextFieldBaseProps, 'variant'>) => <TextFieldBase variant="filled" {...props} />,
    Outlined: (props: Omit<TextFieldBaseProps, 'variant'>) => <TextFieldBase variant="outlined" {...props} />
}
