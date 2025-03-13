import Animated from "react-native-reanimated";
import { LayoutChangeEvent, LayoutRectangle, Pressable, PressableProps, View, ViewProps, StyleSheet, Keyboard } from "react-native";
import { createStyledComponent } from "../createStyledComponent";
import { BoxShadow, SVGShadow } from "../SVGShadow";
import { ForwardedRef, useEffect, useState } from "react";
import { useOnNavigate } from "../Navigation";
import { Href } from "expo-router";
import { ViewStyle } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type StyledViewSpecificProps = {
    href?: Href
    hideOnKeyboard?: boolean
}

type AllViewProps = ViewProps & PressableProps & StyledViewSpecificProps

export const StyledView = createStyledComponent((props: AllViewProps, ref: ForwardedRef<View>, parsedStyles, internalInteractions, styles, children) => {
    const [ layout, setLayout ] = useState<LayoutRectangle | null>(null);
    const onNavigate = useOnNavigate()

    const shadowStyles = parsedStyles.getCurrentValue('shadow') as BoxShadow;

    let handleLayoutChange;
    let borderRadius = 0;

    if (props.onLayout || shadowStyles) {
        // TODO: log a warning if you pass overflow="hidden"
        // TODO: log a warning if you pass a different border radius for different corners
        borderRadius = parsedStyles.getCurrentValue('borderRadius') as number;
        handleLayoutChange = function(e: LayoutChangeEvent){
            if (props.onLayout) props.onLayout(e);
            setLayout(e.nativeEvent.layout)
        };
    }

    if (props.href) {
        let onPress = props.onPress
        props = {
            ...props,
            onPress(e) {
                if (!props.href) return;
                onNavigate(props.href);
                if (onPress) onPress(e);
            }
        }
    }

    // For some instane reason, you can set "display" on a View and it will 100% override your styles :facepalm:
    //  TODO: filter props to the actual view props we expect here
    // @ts-ignore
    let { display, position, href, ...otherProps } = props;

    styles = [ suppressOutlineStyles, ...styles ]

    if (props.hideOnKeyboard) {
        const isKeyboardOpen = useKeyboardOpen();
        if (isKeyboardOpen) return null;
    }

    const shadow = shadowStyles && layout ? <SVGShadow layout={layout} settings={shadowStyles} borderRadius={borderRadius} /> : null
    if (props.href) {
        if (parsedStyles.hasTransitions()) {
            return <AnimatedPressable style={styles} {...internalInteractions.getProps()} onLayout={handleLayoutChange} ref={ref} {...otherProps}>{children}{shadow}</AnimatedPressable>
        } else {
            return <Pressable style={styles} {...internalInteractions.getProps()} onLayout={handleLayoutChange} ref={ref} {...otherProps}>{children}{shadow}</Pressable>
        }
    } else if (internalInteractions.isPressable()) {
        if (parsedStyles.hasTransitions()) {
            return <AnimatedPressable style={styles} {...otherProps} {...internalInteractions.getProps()} onLayout={handleLayoutChange} ref={ref} >{children}{shadow}</AnimatedPressable>
        } else {
            return <Pressable style={styles} {...otherProps} {...internalInteractions.getProps()} onLayout={handleLayoutChange} ref={ref} >{children}{shadow}</Pressable>
        }
    } else {
        if (parsedStyles.hasTransitions()) {
            return <Animated.View style={styles} onLayout={handleLayoutChange} ref={ref} {...otherProps}>{children}{shadow}</Animated.View>
        } else {
            return <View style={styles} onLayout={handleLayoutChange} ref={ref} {...otherProps}>{children}{shadow}</View>
        }
    }
})

const styles = StyleSheet.create({
    suppressOutlineStyles: {
        // @ts-ignore
        outlineStyle: 'none',
    }
})

const suppressOutlineStyles = styles.suppressOutlineStyles as ViewStyle

const useKeyboardOpen = () => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(Keyboard.isVisible);

    useEffect(() => {
      const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () =>
        setIsKeyboardOpen(true)
      );
      const keyboardCloseListener = Keyboard.addListener("keyboardDidHide", () =>
        setIsKeyboardOpen(false)
      );

      return () => {
        if (keyboardOpenListener) keyboardOpenListener.remove();
        if (keyboardCloseListener) keyboardCloseListener.remove();
      };
    }, []);

    return isKeyboardOpen;
  };

