import { useState, useRef } from 'react';
import { PanResponder } from 'react-native';

type Swipe = {
    startingX: number
    startingY: number
    startingTimestamp: number
    successTimestamp?: number
}

export function useOnSwipe(callback: () => any) {
    const timeLimit = 250;
    const minimumDistance = 30;

    const [ press, setPress ] = useState<Swipe | null>(null);
    const pressRef = useRef(press);
    pressRef.current = press;
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    function dismissPress(timestamp: number) {
        const press = pressRef.current;
        if (!press) return
        if (press.startingTimestamp === timestamp) setPress(null);
    }

    const responder = useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
            const { pageX, pageY } = evt.nativeEvent;
            const now = Date.now();
            setPress({
                startingX: pageX,
                startingY: pageY,
                startingTimestamp: now
            })
            setTimeout(() => dismissPress(now), timeLimit)
          },
          onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
            const press = pressRef.current;
            if (!press || press.successTimestamp) return;
            const { pageX, pageY } = evt.nativeEvent;
            const distance = Math.sqrt((pageX - press.startingX)**2 + (pageY - press.startingY)**2)
            if (distance > minimumDistance) {
                setPress({ ...press, successTimestamp: Date.now() })
                callbackRef.current();
            }
          },
          onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
          onPanResponderRelease: (evt, gestureState) => {
            setPress(null)
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

    return {
        ...responder,
        isPressed: press !== null
    }
}
