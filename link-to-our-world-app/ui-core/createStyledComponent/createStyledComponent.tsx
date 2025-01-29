import { ViewStyle, useWindowDimensions, Text, TextStyle, DimensionValue } from "react-native";
import { Breakpoint } from "../Breakpoints";
import { createStyledComponentInterface, InteractionStateIdentifier, StyledComponentExternalInterface } from "./StyledComponentInterface";
import { InternalInteractionProps, InternalInteractionState, useInternalInteractions, internalInteractionStateIdentifiers, InternalInteractions } from "./useInternalInteractions";
import { ParsedStyles, useStyleParser } from "./useStyleParser";
import { ParentContextProvider, useParentContext } from './ParentContext'
import { TransformName, Transitions, useStylesWithTransitions } from "./useStylesWithTransitions";
import React, { ForwardedRef, forwardRef, ReactNode, RefAttributes, useRef } from "react";
import { Portal } from "@gorhom/portal";
import { useShouldOverrideDisplayNone } from "./useShouldOverrideDisplayNone";
import { BoxShadow } from "../SVGShadow";
import Animated from "react-native-reanimated";
import { WithAlaises } from './aliases';

export type InteractionState = `_${string}`;

export type CoreStyleProps = WithFixedPosition<WithViewPortDimensionValues<WithAlaises<Omit<TextStyle & ViewStyle, 'transform' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'cursor'> & {
    transform?: { [key in TransformName]?: Exclude<ViewStyle['transform'], string>[number][key] }[]
    shadow?: BoxShadow
    cursor?: 'pointer' | 'initial' | 'text'
}>>>


type WithFixedPosition<T> = {
    [key in keyof T]: key extends 'position' ? T[key] | 'fixed' : T[key]
}

type WithViewPortDimensionValues<T> = {
    [key in keyof T]: T[key] extends DimensionValue ? DimensionValue | `${number}vh` | `${number}vw` : T[key]
}

type WithStateSelectors<P, S extends InteractionState> = P & Partial<{
    [key in S]: P
}>

type WithBreakpointSelectors<P> = P & Partial<{
    [key in Breakpoint]: P
}>

export type CoresStylePropsWithStateSelectors<S extends InteractionState> = WithStateSelectors<CoreStyleProps, S>;

export type StyleProps<S extends InteractionState> = WithBreakpointSelectors<CoresStylePropsWithStateSelectors<S>>
    & InternalInteractionProps
    & {
        children?: React.ReactNode
        transitions?: Transitions
        forceState?: Partial<Record<S, boolean>>
    };

export type StyleCreator<S extends InteractionState, Theme> = (theme: Theme) => StyleProps<S>

export type StyledComponent<P, R, S extends InteractionState> = ((props: P & StyleProps<S> & RefAttributes<R>) => JSX.Element)
    & StyledComponentExternalInterface<P, R, S>

export type InteractionStatesOf<T>  = T extends StyledComponent<any, any, infer S> ? S : never;

export type InteractionStateIdentifierRecord<S extends string> = Partial<Record<S, InteractionStateIdentifier>>


export type CreateStyledComponentCallback<P, R, S extends InteractionState> = (
    props: P,
    ref: ForwardedRef<R>,
    parsedStyles: ParsedStyles<S>,
    internalInteractions: InternalInteractions<S>,
    styles: ViewStyle[],
    children: ReactNode
) => ReactNode;

export type CreateStyledComponentOptions<P, S extends InteractionState> = {
    styleCreators: StyleCreator<S, any>[]
    interactionStates: InteractionStateIdentifierRecord<S>,
    inheritedInteractionStates: InteractionStateIdentifierRecord<S>,
    deriveInteractionStateFromProps: (props: P) => Partial<Record<S, boolean>>
}

const defaultStyledComponentOptions: CreateStyledComponentOptions<any, any> = {
    styleCreators: [],
    interactionStates: internalInteractionStateIdentifiers,
    inheritedInteractionStates: {},
    deriveInteractionStateFromProps: (props) => ({})
}

export type CreateStyledComponent = typeof createStyledComponent;


export function createStyledComponent<P, R, S extends InteractionState = InternalInteractionState>(
    callback: CreateStyledComponentCallback<P, R, S>,
    options: CreateStyledComponentOptions<P, S> = defaultStyledComponentOptions
): StyledComponent<P, R, S> {

    // @ts-ignore
    const StyledComponent = forwardRef<R, P & StyleProps<S>>(function(props: P & StyleProps<S>, ref: ForwardedRef<R>) {
        const childrenFromLastRender = useRef<ReactNode>();

        const { height: screenHeight, width: screenWidth} = useWindowDimensions();

        const { parentInteractionStates, parentTextColor } = useParentContext();

        const derivedInteractionStateRecord = options.deriveInteractionStateFromProps(props)

        const derivedInteractionStates: S[] = [];

        for (let derivedInteractionState in derivedInteractionStateRecord) {
            if (derivedInteractionStateRecord[derivedInteractionState]) {
                derivedInteractionStates.push(derivedInteractionState)
            }
        }

        const styleParser = useStyleParser(options);

        const internalInteractions = useInternalInteractions({ styleParser, screenWidth, props, interactionStates: options.interactionStates });

        const internalInteractionStates = [ ...internalInteractions.getActiveStates(), ...derivedInteractionStates ];

        const [parsedStyles, parsedTextStyles] = styleParser.parse({ props, screenWidth, parentInteractionStates, internalInteractionStates });

        // If there is a transition on a style property which responds to _displayed,
        //  we override display: 'none' on the underlying View, and "freeze" the children of the View,
        //  until the transition is complete.
        const shouldOverrideDisplayNone = useShouldOverrideDisplayNone(internalInteractions, parsedStyles);

        if (shouldOverrideDisplayNone) {
            parsedStyles.appendRuntime({ display: 'flex' })
        }

        let styles = useStylesWithTransitions(parsedStyles)

        let  textColor = parsedTextStyles.getCurrentValue('color') as string ?? parentTextColor;

        let textStyles = [ { color: textColor }, ...useStylesWithTransitions(parsedTextStyles)];

        let children = props.children;

        const ChildText = parsedStyles.hasTransitions() ? Animated.Text : Text;

        children = React.Children.map(children, child => {
            if (typeof child === 'string') return <ChildText style={textStyles}>{child}</ChildText>
            if (typeof child === 'number') return <ChildText style={textStyles}>{child}</ChildText>
            else return child;
        })

        if (shouldOverrideDisplayNone) {
            children = childrenFromLastRender.current;
        }

        childrenFromLastRender.current = children;

        const interactionStates = [
            ...parentInteractionStates,
            ...internalInteractions.getActiveStateIdentifiers(),
            ...derivedInteractionStates.map( interactionState => styledComponentInterface.is(interactionState))
        ]

        // TODO: make this conditional
        children = (
            <ParentContextProvider interactionStates={interactionStates} textColor={textColor}>
                {children}
            </ParentContextProvider>
        );

        let result = callback(props, ref, parsedStyles, internalInteractions, styles, children);

        if (parsedStyles.hasFixedPosition()) {
            result = <Portal hostName="FixedPosition">{result}</Portal>
        }

        return result;
    })

    const styledComponentInterface = createStyledComponentInterface(callback, options, createStyledComponent);

    Object.assign(StyledComponent, styledComponentInterface)

    return StyledComponent as unknown as StyledComponent<P, R, S>;
}

