import Animated from "react-native-reanimated";
import { Pressable, Text, TextProps } from "react-native";
import { createStyledComponent } from "../createStyledComponent";
import { ForwardedRef } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const StyledText = createStyledComponent((props: TextProps, ref: ForwardedRef<Text>, parsedStyles, internalInteractions, styles, children) => {
    if (internalInteractions.isPressable()) {
        if (parsedStyles.hasTransitions()) {
            return <AnimatedPressable style={styles} {...internalInteractions.getProps()} ref={ref} {...props}>{children}</AnimatedPressable>
        } else {
            return <Pressable style={styles} {...internalInteractions.getProps()} ref={ref} {...props}>{children}</Pressable>
        }
    } else {
        if (parsedStyles.hasTransitions()) {
            return <Animated.Text style={styles} ref={ref} {...props}>{children}</Animated.Text>
        } else {
            return <Text style={styles} ref={ref} {...props}>{children}</Text>
        }
    }
})
