import { Theme } from "designer-m3";
import { useRef, useState } from "react";
import { PanResponder, LayoutRectangle } from "react-native";
import { StyledView } from "ui-core";
import { Row } from './Layout';

export type SliderProps = Parameters<typeof StyledView>[0] & {
    value: number
    onChange: (value: number) => any
}

export function Slider({ value, onChange, ...props }: SliderProps) {
    const [ isActive, setIsActive ] = useState(false);
    const [ layout, setLayout ] = useState<LayoutRectangle>(null);

    const slideResponder = useSlideResponder(x => {
        const newValue = Math.max(0, Math.min(100, x / layout.width * 100));
        onChange(newValue)
    })

    return (
        <Container
            forceState={{ _active: isActive }}
            {...props}
            {...slideResponder.panHandlers}
            onLayout={e => setLayout(e.nativeEvent.layout)}
        >
            <ActiveTrack width={`${value}%`} />
            <Handle onPressIn={() => setIsActive(true)} onPressOut={() => setIsActive(false)} />
            <InActiveTrack />
        </Container>
    )
}

const Container = Row
    .withInteractionState('_active')
    .style((theme: Theme) => ({
        width: '100%',
        alignItems: 'center',
        gap: theme.spacing.gap
    }))

const ActiveTrack = StyledView.style((theme: Theme) => ({
    height: theme.spacing.sm,
    borderTopStartRadius: theme.spacing.corner.sm,
    borderBottomStartRadius: theme.spacing.corner.sm,
    backgroundColor: theme.colors.roles.primary,
}))

const Handle = StyledView
    .inheritInteractionState(Container.is('_active'), '_active')
    .style((theme: Theme) => ({
        width: theme.spacing.lines.sm,
        height: theme.spacing.lg,
        borderRadius: theme.spacing.corner.sm,
        backgroundColor: theme.colors.roles.primary,
        _active: {
            width: theme.spacing.lines.xs
        },
        transitions: {
            width: theme.motion.transitions.standard
        }
    }))

const InActiveTrack = StyledView.style((theme: Theme) => ({
    height: theme.spacing.sm,
    flex: 1,
    borderTopEndRadius: theme.spacing.corner.sm,
    borderBottomEndRadius: theme.spacing.corner.sm,
    backgroundColor: theme.colors.roles.secondaryContainer
}))

function useSlideResponder(onSlide: (x: number) => any) {
    const handleSlide = useRef(onSlide)
    handleSlide.current = onSlide;
    const { current: reportedOffset } = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    return useRef(PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
          true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
          true,

        onPanResponderGrant: (evt, gestureState) => {
          reportedOffset.x = 0;
          reportedOffset.y = 0;
        },
        onPanResponderMove: (evt, gestureState) => {
            handleSlide.current(evt.nativeEvent.locationX);
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
          true,
        onPanResponderRelease: (evt, gestureState) => {

        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      }),
    ).current;
}