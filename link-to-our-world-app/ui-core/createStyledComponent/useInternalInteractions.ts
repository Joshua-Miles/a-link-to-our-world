import { useEffect, useState } from "react";
import { PressableProps, NativeTouchEvent, NativeMouseEvent, GestureResponderEvent, MouseEvent, NativeSyntheticEvent, TargetedEvent } from "react-native";
import { InteractionState, InteractionStateIdentifierRecord, StyleProps } from "./createStyledComponent";
import { InteractionStateIdentifier } from "./StyledComponentInterface";
import { StyleParser } from "./useStyleParser";

export type InternalInteractionState = '_hover' | '_press' | '_mounted' | '_displayed' | '_focus' | '_disabled';

export const _hover = new InteractionStateIdentifier('_hover');

export const _press = new InteractionStateIdentifier('_press');

export const _focus = new InteractionStateIdentifier('_focus');

export const _mounted = new InteractionStateIdentifier('_mounted');

export const _displayed = new InteractionStateIdentifier('_displayed');

export const _disabled = new InteractionStateIdentifier('_disabled');


export const internalInteractionStateIdentifiers: Record<InternalInteractionState, InteractionStateIdentifier> =  {
    _hover, _press, _mounted, _displayed, _focus, _disabled
}

export type InternalInteractionProps = {
    onHoverIn?: (e: NativeSyntheticEvent<NativeMouseEvent>, event: MouseEvent) => void
    onHoverOut?: (e: NativeSyntheticEvent<NativeMouseEvent>, event: MouseEvent) => void
    onLongPress?: (e: NativeSyntheticEvent<NativeTouchEvent>, event: GestureResponderEvent) => void
    onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>, event: GestureResponderEvent) => void
    onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>, event: GestureResponderEvent) => void
    onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>, event: GestureResponderEvent) => void
    onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void
    onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void
    disabled?: boolean
}

type Options<S extends InteractionState> = {
    props: StyleProps<S>,
    styleParser: StyleParser<S>,
    screenWidth: number
    interactionStates: InteractionStateIdentifierRecord<S>
}

type InternalInteractionsState = {
    pressStartTime: number | null
    activeStates: Record<InternalInteractionState, boolean>
}

export function useInternalInteractions<S extends InteractionState>(options: Options<S>) {
    const disabled = options.props.disabled;

    const [ state, setState ] = useState<InternalInteractionsState>({
        pressStartTime: null,
        activeStates: {
            _hover: false,
            _press: false,
            _mounted: false,
            _displayed: false,
            _focus: false,
            _disabled: disabled ?? false
        }
    })

    const internalInteractions = new InternalInteractions<S>(options, state, setState);

    useEffect(() => {
        if (internalInteractions.stylesObserve('_mounted')) {
            setState({
                ...state,
                activeStates: {
                    ...state.activeStates,
                    _mounted: true
                }
            })
        }
    }, [])

    const display = options.props.display;

    useEffect(() => {
        if (display === 'none') setState({
            ...state,
            activeStates: {
                ...state.activeStates,
                _displayed: false
            }
        })
        else setState({
            ...state,
            activeStates: {
                ...state.activeStates,
                _mounted: true,
                _displayed: true,
            }
        })
    }, [ display ])

    useEffect(() => {
        if (internalInteractions.stylesObserve('_disabled')) {
            setState({
                ...state,
                activeStates: {
                    ...state.activeStates,
                    _disabled: disabled ?? false,
                }
            })
        }
    }, [ disabled ])


    return internalInteractions;
}


export class InternalInteractions<S extends InteractionState> {
    private props: StyleProps<S>
    private styleParser: StyleParser<S>
    private screenWidth: number
    private interactionStates: InteractionStateIdentifierRecord<S>

    private state: InternalInteractionsState;
    private setState: (state: InternalInteractionsState | ((state: InternalInteractionsState) => InternalInteractionsState)) => void;

    private stylesObserved: Record<InternalInteractionState, boolean>

    private handlers: InternalInteractionHandlers = {
        onHoverIn: {
            onlyIf: () => Boolean(this.props.onHoverIn) || this.stylesObserve('_hover'),
            callback: (event) => {
                if (this.stylesObserve('_hover'))  this.setInteractionState('_hover', true)

                const { onHoverIn } = this.props;
                if (onHoverIn) onHoverIn(event, event);
            }
        },
        onHoverOut: {
            onlyIf: () => Boolean(this.props.onHoverOut) || this.stylesObserve('_hover'),
            callback: (event) => {
                if (this.stylesObserve('_hover'))  this.setInteractionState('_hover', false)

                const { onHoverOut } = this.props;
                if (onHoverOut) onHoverOut(event, event);
            }
        },
        onLongPress: {
            onlyIf: () => Boolean(this.props.onLongPress),
            callback: (event) => {
                const { onLongPress } = this.props;
                if (onLongPress) onLongPress(event, event);
            }
        },
        onPress: {
            onlyIf: () => Boolean(this.props.onPress),
            callback: (event) => {
                const { onPress } = this.props;
                if (onPress) onPress(event, event);
            }
        },
        onPressIn: {
            onlyIf: () => Boolean(this.props.onPressIn) || this.stylesObserve('_press'),
            callback: (event) => {
                if (this.stylesObserve('_press'))   this.setState({
                    ...this.state,
                    pressStartTime: Date.now(),
                    activeStates: {
                        ...this.state.activeStates,
                        _press: true
                    }
                })

                const { onPressIn } = this.props;
                if (onPressIn) onPressIn(event, event);
            }
        },
        onPressOut: {
            onlyIf: () => Boolean(this.props.onPressOut) || this.stylesObserve('_press'),
            callback: (event) => {
                if (this.stylesObserve('_press'))  {
                    const threshold = 250
                    const { pressStartTime } = this.state;
                    const elapsed = Date.now() - (pressStartTime ?? 0)
                    const remaining = Math.max(threshold - elapsed, 0)
                    setTimeout(() => this.setInteractionState('_press', false), remaining)
                }

                const { onPressOut } = this.props;
                if (onPressOut) onPressOut(event, event);
            }
        },
        onFocus: {
            onlyIf: () => Boolean(this.props.onFocus) || this.stylesObserve('_focus'),
            callback: (event) => {
                if (this.props.disabled) return;
                if (this.stylesObserve('_focus'))  this.setInteractionState('_focus', true)
                const { onFocus } = this.props;
                if (onFocus) onFocus(event);
            }
        },
        onBlur: {
            onlyIf: () => Boolean(this.props.onBlur) || this.stylesObserve('_focus'),
            callback: (event) => {
                if (this.stylesObserve('_focus'))  this.setInteractionState('_focus', false)
                const { onBlur } = this.props;
                if (onBlur) onBlur(event);
            }
        }
    }

    constructor(options: Options<S>, state: InternalInteractionsState, setState: (state: InternalInteractionsState) => void) {
        this.props = options.props;
        this.styleParser = options.styleParser;
        this.screenWidth = options.screenWidth;
        this.interactionStates = options.interactionStates

        this.state = state;
        this.setState = setState;

        this.stylesObserved = {
            _hover: this.calculateStylesObserve('_hover'),
            _press: this.calculateStylesObserve('_press'),
            _mounted: this.calculateStylesObserve('_mounted'),
            _displayed: this.calculateStylesObserve('_displayed'),
            _focus: this.calculateStylesObserve('_focus'),
            _disabled: this.calculateStylesObserve('_disabled'),
        }
    }

    stylesObserve(interactionState: InternalInteractionState) {
        return this.stylesObserved[interactionState];
    }

    isPressable() {
        return this.stylesObserve('_hover') || this.stylesObserve('_press') || this.props.onPress || this.props.onPressIn || this.props.onPressOut
    }

    getProps(): PressableProps {
        const props: PressableProps = { disabled: this.props.disabled };

        for (let key in this.handlers) {
            let propName = key as keyof InternalInteractionHandlers;
            const handler = this.handlers[propName]

            if (handler.onlyIf()) {
                Object.assign(props, { [propName]: handler.callback });
            }
        }

        return props;
    }

    getActiveStates(): S[] {
        const activeStates: S[] = [];

        for (let internalInteractionState in this.state.activeStates) {
            if (this.state.activeStates[internalInteractionState]) {
                const interactionState = this.getComponentAliasForInternalInteractionState(internalInteractionState as InternalInteractionState)
                activeStates.push(interactionState)
            }
        }

        for (let interactionState in this.props.forceState) {
            if (this.props.forceState[interactionState]) {
                activeStates.push(interactionState)
            }
        }

        return activeStates
    }

    getActiveStateIdentifiers(): InteractionStateIdentifier[] {
        return this.getActiveStates().map( activeState => this.interactionStates[activeState] )
    }

    getStylesForInteractionState(internalInteractionState: InternalInteractionState) {
        const { props, screenWidth } = this;
        const interactionState = this.getComponentAliasForInternalInteractionState(internalInteractionState);
        if (interactionState === null) return {};
        return this.styleParser.getStylesForInteractionState(interactionState, { screenWidth, props })
    }

    private setInteractionState(internalInteractionState: InternalInteractionState, value: boolean) {
        this.setState(state => ({
            ...state,
            activeStates: {
                ...state.activeStates,
                [internalInteractionState]: value
            }
        }))
    }

    private calculateStylesObserve(internalInteractionState: InternalInteractionState) {
        const { props, screenWidth } = this;
        const interactionState = this.getComponentAliasForInternalInteractionState(internalInteractionState);
        if (interactionState === null) return false;
        return this.styleParser.observesInteractionState(interactionState, { screenWidth, props })
    }

    private getComponentAliasForInternalInteractionState(internalInteractionState: InternalInteractionState): S | null {
        for (let interactionState in this.interactionStates) {
            if (this.interactionStates[interactionState].extends(internalInteractionStateIdentifiers[internalInteractionState])) {
                return interactionState;
            }
        }
        return null;
    }

}

type InternalInteractionHandlers =  {
    [key in keyof Pick<PressableProps, keyof InternalInteractionProps>]: {
        onlyIf: () => boolean
        callback: PressableProps[key]
    }
}
