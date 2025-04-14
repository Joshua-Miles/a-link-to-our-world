import { useEffect, useState } from "react";
import { interpolate, Easing, interpolateColor, runOnJS, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, WithSpringConfig, withTiming, WithTimingConfig } from "react-native-reanimated";
import { ViewStyle } from "react-native/types";
import { CoreStyleProps, InteractionState } from "./createStyledComponent";
import { ParsedStyles } from "./useStyleParser";
import Color from 'color';

export { Easing }

type TransitionCommon = {
    duration: number
    onComplete?: () => void
    onAbort?: () => void
}

type TimingTransition = TransitionCommon & {
    type: 'timing',
    options?: Omit<WithTimingConfig, 'duration'>
}

type WithDurationSpringConfig = Exclude<WithSpringConfig, { duration?: never }>

type SpringTransition = TransitionCommon & {
    type: 'spring',
    options?: Omit<WithDurationSpringConfig, 'duration'>
}

export type Transition = TimingTransition | SpringTransition

export const timing = (duration: number, options: TimingTransition['options'] = {}) => ({
    type: 'timing' as const,
    duration,
    options,
    then(onComplete: () => void) {
        return { ...this, onComplete }
    }
})

export const spring = (duration: number, options: TimingTransition['options'] = {}) => ({
    type: 'spring' as const,
    duration,
    options,
    then(onComplete: () => void) {
        return { ...this, onComplete }
    }
})


export type TransformName =  keyof (Exclude<ViewStyle['transform'], string | undefined>[number])

type TransformTransitions = Partial<Record<TransformName, Transition>>[];

export type Transitions = Omit<{
    [key in keyof CoreStyleProps]: Transition
}, 'transform'> & {
    transform?: TransformTransitions
}


export function useStylesWithTransitions<S extends InteractionState>(parsedStyles: ParsedStyles<S>): ViewStyle[] {
    const transitions = parsedStyles.getTransitions();
    if (Object.keys(transitions).length === 0) return parsedStyles.getOptimized();

    const transitionStyle: ViewStyle = {};

    for (let key in transitions) {
        const propertyName = key as keyof Transitions;
        const transition = transitions[propertyName];
        if (!transition) continue;

        const currentValue = parsedStyles.getCurrentValue(propertyName as keyof ViewStyle);

        if (propertyName !== 'transform' && !Array.isArray(transition)) {
            if (currentValue === undefined) continue;
            // @ts-ignore
            transitionStyle[propertyName] = useTransition(propertyName, transition, currentValue);
        } else {
            const transformTransitions = transition as TransformTransitions;
            if (!Array.isArray(transformTransitions)) throw Error(`Transform transitions must be array, got: "${JSON.stringify(transformTransitions)}"`);

            const transformValues = currentValue as ViewStyle['transform'];
            if (typeof transformValues === 'string') throw Error(`Cannot animate transform as string: "${transformValues}"`);

            if (transformValues === undefined) continue;

            const results: Partial<Record<TransformName, any>>[] = [];

            for (let transformTransitionRecord of transformTransitions) {
                const [ transformPropertyName ] = Object.keys(transformTransitionRecord) as TransformName[];
                const [ transformTransition ] = Object.values(transformTransitionRecord);
                const transformValueRecord = transformValues.find( value => transformPropertyName in value);
                if (!transformValueRecord) throw Error(`Could not find value for animated transform.${transformPropertyName}`);
                const [ currentValue ] = Object.values(transformValueRecord);
                const result = { [transformPropertyName]: useTransition(propertyName, transformTransition, currentValue) } as (typeof results)[number]
                results.push(result);
            }

            // @ts-ignore
            transitionStyle[propertyName] = results;
        }
    }

    const result = [
        ...parsedStyles.getOptimized(),
        transitionStyle
    ];

    return result;
}

type TransitionState = {
    value: any
    currentTransition: null | {
        hasStarted: boolean,
        fromValue: any,
        toValue: any,
        startedAt: number,
        duration: number,
        interpolationType: InterpolationType
    }
}

function useTransition(propertyName: string, transition: Transition, currentValue: any) {
    const sharedTransitionState = useSharedValue<TransitionState>({
        // Initialize with the current value
        value: currentValue,
        currentTransition: null
    })

    const sharedValue = useSharedValue(0);

    useEffect(() => {
        const transitionState = sharedTransitionState.value;
        if (currentValue !== transitionState.value) {
            let formerValue = transitionState.value;
            let duration = transition.duration;

            // If in the middle of a transition, calculate the intermediate formerValue based on the transition parameters
            if (transitionState.currentTransition !== null) {
                const { fromValue, toValue, startedAt, interpolationType } = transitionState.currentTransition;

                formerValue = interpolateByType(interpolationType, sharedValue.value, fromValue, toValue );

                // We are transitioning to the last value before completing the animation,
                //   apply corrective timing
                if (currentValue === fromValue) {
                    const elapsed = Date.now() - startedAt;
                    duration = elapsed;
                }
            }

            sharedTransitionState.value = {
                value: currentValue,
                currentTransition: {
                    hasStarted: false,
                    fromValue: formerValue,
                    toValue: currentValue,
                    interpolationType: deriveInterpolationType(formerValue),
                    startedAt: Date.now(),
                    duration,
                }
            }

            sharedValue.value = 0;

            function handleEnd(isComplete?: boolean) {
                'worklet'
                if (isComplete) {
                    sharedTransitionState.value = {
                        ...sharedTransitionState.value,
                        currentTransition: null
                    }
                    if (transition.onComplete) runOnJS(transition.onComplete)();
                } else {
                    if (transition.onAbort) runOnJS(transition.onAbort)();
                }
            }

            if (transition.type === 'timing') {
                sharedValue.value = withTiming(1, { duration, ...transition.options }, handleEnd);
            }

            if (transition.type === 'spring') {
                sharedValue.value = withSpring(1, { duration, ...transition.options }, handleEnd)
            }
        }
    }, [ currentValue ]);

    return useDerivedValue(() => {
        const currentTransition = sharedTransitionState.value.currentTransition;

        if (currentTransition === null) {
            return currentValue;
        }

        if ((currentTransition.hasStarted === false && sharedValue.value !== 0)) {
            return currentTransition.fromValue;
        }

        if (!currentTransition.hasStarted) {
            sharedTransitionState.value = {
                ...sharedTransitionState.value,
                currentTransition: {
                    ...currentTransition,
                    hasStarted: true
                }
            }
        }

        let result =  interpolateByType(currentTransition.interpolationType, sharedValue.value, currentTransition.fromValue, currentTransition.toValue)
        return result
    })
}

type InterpolationType = 'number' | 'color' | 'suffixed';

function deriveInterpolationType(x: any): InterpolationType {
    if (isNumber(x)) return 'number';
    if (isSuffixed(x)) return 'suffixed';
    if (isColor(x)) return 'color';
    throw Error(`Could not derive interpolation type for variable "${JSON.stringify(x)}"`)
}

function isNumber(x: any) {
    return typeof x === 'number';
}

function isColor(x: any) {
    if (typeof x !== 'string') return false;

    try {
        if (x.startsWith('rgba(')) return true;
        else new Color(x);
        return true;
    } catch {
        return false;
    }
}

function isSuffixed(x: any) {
    if (typeof x !== 'string') return false;

    const floatValue = parseFloat(x);

    if (Number.isNaN(floatValue)) return false;

    return true;
}

function interpolateSuffixed(value: number, inputRange: [ number, number ], outputRange: [ string, string ]) {
    'worklet'
    const mappedOutputRange = outputRange.map( value => parseFloat(value));
    const suffix = outputRange[1].replace(mappedOutputRange[1].toString(), '');
    const numberValue = interpolate(value, inputRange, mappedOutputRange)
    return `${numberValue}${suffix}`
}

function interpolateByType(type: InterpolationType, value: number, from: any, to: any) {
    'worklet'
    if (to === undefined) to = from
    if (type === 'number') return interpolate(value, [ 0, 1 ], [ from, to ])
    if (type === 'color') return interpolateColor(value, [ 0, 1 ], [ from, to ])
    if (type === 'suffixed') return interpolateSuffixed(value, [ 0, 1 ], [ from, to ])
}
