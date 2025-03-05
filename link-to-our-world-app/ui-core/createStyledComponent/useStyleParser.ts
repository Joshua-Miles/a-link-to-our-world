import { useMemo } from 'react';
import { Breakpoint, isBreakpoint } from '../Breakpoints';
import { CoreStyleProps, CreateStyledComponentOptions, InteractionState, InteractionStateIdentifierRecord, StyleCreator, StyleProps } from './createStyledComponent'
import { BaseTheme, useTheme } from '../Theme';
import { Transitions } from './useStylesWithTransitions';
import { StyleSheet, TextStyle, useWindowDimensions, ViewProps, ViewStyle } from 'react-native';
import { viewStyleProps } from '../viewStyleProps';
import { InteractionStateIdentifier } from './StyledComponentInterface';
import { textStyleProps } from '../textStyleProps';
import { BoxShadow } from 'ui-core/SVGShadow';
import { resolveCoreStylePropAlias } from './aliases';

export function useStyleParser<S extends InteractionState>(options: CreateStyledComponentOptions<any, S>) {
    const theme = useTheme();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    const styleParser = useMemo(() => new StyleParser(options, theme, screenWidth, screenHeight), [ options, theme, screenWidth, screenHeight ])

    return styleParser;
}

type BaseStyle = (ViewStyle & TextStyle) & { isFixedPositioned?: boolean, shadow?: BoxShadow }

type CategorizedStylesRecord<S extends InteractionState> = {
     // Prioirity 4
    baseStyle: BaseStyle

     // Priority 3
    breakpointStyles: Partial<Record<Breakpoint, BaseStyle>>

     // Prioirity 2
    interactionStateStyles: Partial<Record<S, BaseStyle>>

     // Prioirity 1
    breakpointInteractionStateStyles: Partial<Record<Breakpoint, Partial<Record<S, BaseStyle>>>>


    forcedStates: S[]

    transitions: Transitions
}

type CategorizeStylesReturnValue<S extends InteractionState> = {
    view: CategorizedStylesRecord<S>
    text: CategorizedStylesRecord<S>
}


type ParseOptions<S extends InteractionState> = {
    props: StyleProps<S>
    screenWidth: number
    parentInteractionStates: InteractionStateIdentifier[]
    internalInteractionStates: S[]
}

export class StyleParser<S extends InteractionState> {

    private categorizedStyles: CategorizedStylesRecord<S>

    private optimizedStyles: CategorizedStylesRecord<S>

    private categorizedTextStyles: CategorizedStylesRecord<S>

    private optimizedTextStyles: CategorizedStylesRecord<S>

    private interactionStates: InteractionStateIdentifierRecord<S>

    private inherritedInteractionStates: InteractionStateIdentifierRecord<S>

    private theme: BaseTheme;

    private screenWidth: number
    private screenHeight: number;


    constructor(options: CreateStyledComponentOptions<any, S>, theme: BaseTheme, screenWidth: number, screenHeight: number){
        this.interactionStates = options.interactionStates;
        this.inherritedInteractionStates = options.inheritedInteractionStates;
        this.theme = theme;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        const { text, view } = this.runStyleCreators(options.styleCreators);

        this.categorizedStyles = view;
        this.optimizedStyles = this.optimizeCategorizedStyles(this.categorizedStyles);

        this.categorizedTextStyles = text;
        this.optimizedTextStyles = this.optimizeCategorizedStyles(this.categorizedTextStyles);
    }

    getStylesForInteractionState(interactionState: S, options: { screenWidth: number, props: StyleProps<S> }) {
        let result: CoreStyleProps = {}

        if (interactionState in this.categorizedStyles.interactionStateStyles) result = {
            ...result,
            ...this.categorizedStyles.interactionStateStyles[interactionState]
        } as CoreStyleProps

        if (interactionState in options.props) result = {
            ...result,
            ...options.props[interactionState]
        }

        const activeBreakpoints = this.getActiveBreakpoints(options.screenWidth);

        for (let activeBreakpoint of activeBreakpoints) {
            const breakpointStyles = this.categorizedStyles.breakpointInteractionStateStyles[activeBreakpoint]

            if (breakpointStyles && interactionState in breakpointStyles) result = {
                ...result,
                ...breakpointStyles[interactionState]
            } as CoreStyleProps

            const runtimeBreakpointStyles = options.props[activeBreakpoint];
            if (runtimeBreakpointStyles && interactionState in runtimeBreakpointStyles) result = {
                ...result,
                ...runtimeBreakpointStyles[interactionState]
            } as CoreStyleProps
        }

        return result;
    }

    observesInteractionState(interactionState: S, options: { screenWidth: number, props: StyleProps<S> }) {
        if (interactionState in this.categorizedStyles.interactionStateStyles) return true;
        if (interactionState in options.props && options.props[interactionState]) return true;

        const activeBreakpoints = this.getActiveBreakpoints(options.screenWidth);

        for (let activeBreakpoint of activeBreakpoints) {
            const breakpointStyles = this.categorizedStyles.breakpointInteractionStateStyles[activeBreakpoint]
            if (breakpointStyles && interactionState in breakpointStyles && breakpointStyles[interactionState]) return true;

            const runtimeBreakpointStyles = options.props[activeBreakpoint];
            if (runtimeBreakpointStyles && interactionState in runtimeBreakpointStyles && runtimeBreakpointStyles[interactionState]) return true;
        }

        return false;
    }

    parse(options: ParseOptions<S>): [ ParsedStyles<S>, ParsedStyles<S> ] {
        const activeBreakpoints = this.getActiveBreakpoints(options.screenWidth);

        const activeInteractionStates = this.getActiveInteractionStates(options.parentInteractionStates, options.internalInteractionStates, options.props.forceState);

        const { view: runtimeViewStyles, text: runtimeTextStyles } = this.categorizeStyleProps(options.props);

        const viewStyles = new ParsedStyles({
            activeBreakpoints,
            activeInteractionStates,
            categorizedStyles: this.categorizedStyles,
            optimizedStyles: this.optimizedStyles,
            runtimeStyles: runtimeViewStyles
        });

        const textStyles = new ParsedStyles({
            activeBreakpoints,
            activeInteractionStates,
            categorizedStyles: this.categorizedTextStyles,
            optimizedStyles: this.optimizedTextStyles,
            runtimeStyles: runtimeTextStyles
        });

        return [ viewStyles, textStyles ]
    }

    private getActiveInteractionStates(parentInteractionStates: InteractionStateIdentifier[], internalInteractionStates: S[], forceState?: Partial<Record<S, boolean>>): S[] {
        const activeInteractionStates: S[] = [ ...this.categorizedStyles.forcedStates, ...internalInteractionStates ];

        if (forceState) {
            activeInteractionStates.push(...this.parseForceState(forceState))
        }

        for (let key in this.inherritedInteractionStates) {
            const interactionStateIdentifier = this.inherritedInteractionStates[key]
            if (!interactionStateIdentifier) continue;
            if (parentInteractionStates.some( parentInteractionStateIdentifier => parentInteractionStateIdentifier.extends(interactionStateIdentifier))) {
                activeInteractionStates.push(key);
            }
        }

        return activeInteractionStates;
    }

    private parseForceState(forceState: Partial<Record<S, boolean>>): S[] {
        const activeInteractionStates: S[] = [];

        for (let key in forceState) {
            if (forceState[key]) activeInteractionStates.push(key);
        }

        return activeInteractionStates;
    }

    private getActiveBreakpoints(screenWidth: number): Breakpoint[] {
        const activeBreakpoints: Breakpoint[] = [];

        const { breakpoints } = this.theme;
        for (let breakpoint in breakpoints) {
            if (breakpoints[breakpoint as Breakpoint] < screenWidth) {
                activeBreakpoints.push(breakpoint as Breakpoint)
            }
        }

        return activeBreakpoints;
    }

    private runStyleCreators(styleCreators: StyleCreator<S, any>[]): CategorizeStylesReturnValue<S> {
        const allStyleProps = styleCreators.map( creator => creator(this.theme));
        const styleProps = deepMerge(...allStyleProps) ?? {};
        return this.categorizeStyleProps(styleProps);
    }

    private categorizeStyleProps(styleProps: StyleProps<S>): CategorizeStylesReturnValue<S> {
        const forcedStates: S[] = [];
        const transitions = {}

        const parsed: CategorizedStylesRecord<S>  = {
            baseStyle: {},
            breakpointStyles: {},
            interactionStateStyles: {},
            breakpointInteractionStateStyles: {},

            forcedStates,
            transitions
        }

        const parsedText: CategorizedStylesRecord<S>  = {
            baseStyle: {},
            breakpointStyles: {},
            interactionStateStyles: {},
            breakpointInteractionStateStyles: {},

            forcedStates,
            transitions
        }

        for (let key in styleProps) {
            const propName = key as keyof StyleProps<S>;

            if (propName === 'forceState') {
                const styleProp = styleProps[propName]
                if (styleProp) forcedStates.push(...this.parseForceState(styleProp))
                continue;
            }

            if (propName === 'transitions') {
                Object.assign(transitions, styleProps[propName]);
                continue;
            }

            if (isBreakpoint(propName)) {
                const styleProp = styleProps[propName]
                if (!styleProp) continue;
                const parsedBreakpointStyles = this.categorizeStyleProps(styleProp)
                parsed.breakpointStyles[propName] = parsedBreakpointStyles.view.baseStyle;
                parsed.breakpointInteractionStateStyles[propName] = parsedBreakpointStyles.view.interactionStateStyles;
                parsedText.breakpointStyles[propName] = parsedBreakpointStyles.text.baseStyle;
                parsedText.breakpointInteractionStateStyles[propName] = parsedBreakpointStyles.text.interactionStateStyles;
                continue;
            }

            if (this.isInteractionState(propName)) {
                const { view, text } = this.categorizeStyleProps(styleProps[propName])
                parsed.interactionStateStyles[propName] = view.baseStyle;
                parsedText.interactionStateStyles[propName] = text.baseStyle;
                continue;
            }

            let unaliasedPropName = resolveCoreStylePropAlias(propName);
            let propValue = styleProps[propName];

            if (typeof propValue === 'string' && propValue.endsWith('vw')) {
                propValue = parseFloat(propValue) / 100 * this.screenWidth;
            }

            if (typeof propValue === 'string' && propValue.endsWith('vh')) {
                propValue = parseFloat(propValue) / 100 * this.screenHeight;
            }

            if (propValue === 'fixed') {
                parsed.baseStyle.isFixedPositioned = true
                propValue = 'absolute';
            }

            if (propName === 'shadow') {
                parsed.baseStyle.shadow = propValue as BoxShadow;
            }

            if (this.isViewStyle(unaliasedPropName)) {
                Object.assign(parsed.baseStyle, { [unaliasedPropName]:  propValue });
            }

            if (this.isTextStyle(unaliasedPropName)) {
                Object.assign(parsedText.baseStyle, { [unaliasedPropName]:  propValue });
            }
        }

        return { view: parsed, text: parsedText };
    }

    private optimizeCategorizedStyles(categorizedStyles: CategorizedStylesRecord<S>): CategorizedStylesRecord<S> {
        const { baseStyle, breakpointStyles, interactionStateStyles, breakpointInteractionStateStyles, forcedStates, transitions } = categorizedStyles;
        return {
            baseStyle: StyleSheet.create({ baseStyle }).baseStyle,
            breakpointStyles: StyleSheet.create(breakpointStyles),
            // @ts-ignore
            interactionStateStyles: StyleSheet.create(interactionStateStyles),
            breakpointInteractionStateStyles: this.optimizeBreakPointInteractionStateStyles(breakpointInteractionStateStyles),
            forcedStates,
            transitions
        }
    }

    private optimizeBreakPointInteractionStateStyles(
        breakpointInteractionStateStyles: CategorizedStylesRecord<S>['breakpointInteractionStateStyles']
    ): CategorizedStylesRecord<S>['breakpointInteractionStateStyles'] {
        const result: CategorizedStylesRecord<S>['breakpointInteractionStateStyles'] = {}

        for (let breakpoint in breakpointInteractionStateStyles) {
            // @ts-ignore
            result[breakpoint] = StyleSheet.create(breakpointInteractionStateStyles[breakpoint]);
        }

        return result;
    }

    private isInteractionState(x: any): x is S {
        return x in this.interactionStates || x in this.inherritedInteractionStates;
    }

    private isViewStyle(x: any): x is keyof ViewStyle {
        return viewStyleProps.includes(x);
    }

    private isTextStyle(x: any): x is keyof TextStyle {
        return textStyleProps.includes(x);
    }
}


type ParsedStylesOptions<S extends InteractionState> = {
    activeBreakpoints: Breakpoint[]
    activeInteractionStates: S[]

    categorizedStyles: CategorizedStylesRecord<S>
    optimizedStyles: CategorizedStylesRecord<S>
    runtimeStyles: CategorizedStylesRecord<S>

}

export class ParsedStyles<S extends InteractionState>  {

    private raw: BaseStyle[] = [];

    private optimized: BaseStyle[] = [];

    private transitions: Transitions = {};

    private append(raw: BaseStyle, optimized: BaseStyle) {
        if (!raw) throw Error (`Attempted to append falsey raw value to ParsedStyles "${JSON.stringify(raw)}"`)
        if (!optimized) throw Error (`Attempted to append falsey optimized value to ParsedStyles "${JSON.stringify(optimized)}"`)
        this.raw.push(raw);
        this.optimized.push(optimized);
    }

    appendRuntime(style: BaseStyle) {
        if (!style) throw Error (`Attempted to append falsey runtime value to ParsedStyles "${JSON.stringify(style)}"`)
        this.raw.push(style);
        this.optimized.push(style);
    }

    constructor(options: ParsedStylesOptions<S>) {
        const { categorizedStyles, optimizedStyles, runtimeStyles, activeBreakpoints, activeInteractionStates } = options;

        this.transitions = {
            ...categorizedStyles.transitions,
            ...runtimeStyles.transitions
        }

        // Priority 4- base
        this.append(categorizedStyles.baseStyle, optimizedStyles.baseStyle);
        this.appendRuntime(runtimeStyles.baseStyle);

        // Priority 3- breakpoint styles, in mobile-first breakpoint priority
        for (let breakpoint of activeBreakpoints) {
            const breakpointStyle = categorizedStyles.breakpointStyles[breakpoint]
            if (breakpointStyle) {
                // @ts-ignore
                this.append(breakpointStyle, optimizedStyles.breakpointStyles[breakpoint])
            }
            const runtimeBreakpointStyle = runtimeStyles.breakpointStyles[breakpoint];
            if (runtimeBreakpointStyle) {
                this.appendRuntime(runtimeBreakpointStyle)
            }
        }

        // Priority 2- interaction state styles, in the order the style was applied
        for (let interactionState in categorizedStyles.interactionStateStyles) {
            const interactionStateStyle = categorizedStyles.interactionStateStyles[interactionState]
            if (interactionStateStyle && activeInteractionStates.includes(interactionState)) {
                // @ts-ignore
                this.append(interactionStateStyle, optimizedStyles.interactionStateStyles[interactionState]);
            }
        }
        for (let interactionState in runtimeStyles.interactionStateStyles) {
            const interactionStateStyle = runtimeStyles.interactionStateStyles[interactionState]
            if (activeInteractionStates.includes(interactionState) && interactionStateStyle) {
                this.appendRuntime(interactionStateStyle);
            }
        }

        // Priority 1- breakpoint interaction state styles in mobile-first breakpoint, then application, order
        for (let breakpoint of activeBreakpoints) {
            const breakpointInteractionStateStyle = categorizedStyles.breakpointInteractionStateStyles[breakpoint]
            if (breakpointInteractionStateStyle) {
                for (let interactionState in breakpointInteractionStateStyle) {
                    const interactionStateStyle = breakpointInteractionStateStyle[interactionState]
                    if (interactionStateStyle && activeInteractionStates.includes(interactionState)) {
                        // @ts-ignore
                        this.append(interactionStateStyle, optimizedStyles.breakpointInteractionStateStyles[breakpoint][interactionState]);
                    }
                }
            }
            const runtimeBreakpointInteractionStateStyle = runtimeStyles.breakpointInteractionStateStyles[breakpoint]
            if (runtimeBreakpointInteractionStateStyle) {
                for (let interactionState in runtimeBreakpointInteractionStateStyle) {
                    const interactionStateStyle = runtimeBreakpointInteractionStateStyle[interactionState]
                    if (interactionStateStyle && activeInteractionStates.includes(interactionState)) {
                        this.appendRuntime(interactionStateStyle);
                    }
                }
            }
        }
    }

    getCurrentValue(propertyName: keyof BaseStyle) {
        for (let i = this.raw.length - 1; i >= 0; i--) {
            const viewStyle = this.raw[i];
            if (viewStyle[propertyName] !== undefined) return viewStyle[propertyName];
        }
    }

    hasFixedPosition() {
        return this.getCurrentValue('isFixedPositioned')
    }

    getOptimized() {
        return this.optimized;
    }

    getRaw() {
        return this.raw;
    }

    getTransitions() {
        return this.transitions;
    }

    hasTransitions() {
        return Object.keys(this.transitions).length !== 0;
    }
}



function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}


export function deepMerge<T>(...sources: T[]): null | T {
    if (!sources.length) return null;
    const target = sources.shift() ?? null;

    if (!sources.length) return target;

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
            // @ts-ignore
            if (!target[key]) Object.assign(target, { [key]: {} });
            // @ts-ignore
            deepMerge(target[key], source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
      }
    }
    // @ts-ignore
    return deepMerge(target, ...sources);
}
