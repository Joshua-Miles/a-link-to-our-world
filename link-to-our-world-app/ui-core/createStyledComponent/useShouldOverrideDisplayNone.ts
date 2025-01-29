import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { InternalInteractions } from "./useInternalInteractions";
import { ParsedStyles } from "./useStyleParser";
import { Transitions } from "./useStylesWithTransitions";

export function useShouldOverrideDisplayNone(interactions: InternalInteractions<any>, parsedStyles: ParsedStyles<any>): boolean {
    const [ _, forceReRender ] = useReducer(state => state + 1, 0);

    const shouldOverrideDisplayNone = useRef(false);

    const display = parsedStyles.getCurrentValue('display');

    const lastDisplayValue = useRef(display);

    useEffect(() => {
        if (shouldOverrideDisplayNone.current) {
            const delay = getLongestTransitionDelayForDisplayedDependantStyles(interactions, parsedStyles);
            setTimeout(() => {
                shouldOverrideDisplayNone.current = false;
                forceReRender();
            }, delay)
        }

    }, [ shouldOverrideDisplayNone.current ])

    if (display === 'none' && lastDisplayValue.current !== 'none') {
        shouldOverrideDisplayNone.current = true;
    }

    lastDisplayValue.current = display;

    return shouldOverrideDisplayNone.current;
}

function getLongestTransitionDelayForDisplayedDependantStyles(interactions: InternalInteractions<any>, parsedStyles: ParsedStyles<any>): number {
    const styleProps = interactions.getStylesForInteractionState('_displayed');
    const transitions = parsedStyles.getTransitions();

    const delays: number[] = [ 0 ];

    for (let key in styleProps) {
        const propName = key as keyof Transitions;

        if (propName === 'transform') {
            for (let transform of transitions[propName]) {
                for (let key in transform) {
                    const transformPropName = key as keyof Transitions;
                    if (transitions[propName][transformPropName]) {
                        delays.push(transitions[propName][transformPropName].duration)
                    }
                }
            }
            continue;
        }

        if (transitions[propName]) {
            delays.push(transitions[propName].duration)
        }
    }

    return Math.max(...delays);
}
