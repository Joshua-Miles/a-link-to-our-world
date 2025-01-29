
import Animated from "react-native-reanimated";
import { TextInput, TextInputProps, StyleSheet, LayoutChangeEvent, TextInputChangeEventData, Platform } from "react-native";
import { createStyledComponent } from "../createStyledComponent";
import { BaseSyntheticEvent, ForwardedRef, useCallback, useEffect } from "react";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const StyledTextInput = createStyledComponent((props: TextInputProps, ref: ForwardedRef<TextInput>, parsedStyles, internalInteractions, styles) => {
    if (Platform.OS === 'web') {
        props = useAutoResizeProps(props);
    }

    styles = [ suppressOutlineStyles, ...styles ];
    if (parsedStyles.hasTransitions()) {
        return <AnimatedTextInput style={styles} ref={ref} {...props} />
    } else {
        return <TextInput style={styles} ref={ref} {...props} />
    }
})

const { suppressOutlineStyles } = StyleSheet.create({
    suppressOutlineStyles: {
        // @ts-ignore
        outlineStyle: 'none',
    }
})

// on web, multiline TextInput does not auto-resize like it does on mobile:
//  https://github.com/necolas/react-native-web/issues/795
//
// This helper pollyfills the auto-resize
function useAutoResizeProps(props: TextInputProps): TextInputProps {
    const {multiline, onChange, onLayout } = props;

    const _onLayout = useCallback((event: LayoutChangeEvent) => {
        // @ts-ignore
        const element = event.target || event.nativeEvent.target;

        if (element && multiline) {
            adjustInputHeight(element);
        }

        onLayout?.(event);
    }, [multiline, onLayout]);

    const _onChange = useCallback((event: BaseSyntheticEvent<TextInputChangeEventData>) => {
        const element = event?.target || event?.nativeEvent?.target;

        if (element && multiline) {
            adjustInputHeight(element);
        }

        onChange?.(event);
    }, [multiline, onChange]);

    return {
        ...props,
        onChange: _onChange,
        onLayout: _onLayout
    }
}

const adjustInputHeight = (element: BaseSyntheticEvent<TextInputProps, TextInputProps>['target']) => {
    element.style.height = 0;
    const newHeight = element.offsetHeight - element.clientHeight + element.scrollHeight;
    element.style.height = `${newHeight}px`;
};