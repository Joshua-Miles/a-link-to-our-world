import { CoreStyleProps } from "./StyledComponent/StyledComponent";

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Breakpoint[] = [ 'xs', 'sm', 'md', 'lg', 'xl', '2xl' ]

export function isBreakpoint(x: any): x is Breakpoint {
    return breakpoints.includes(x)
}

export function mapBreakpointRecords<T extends Record<Breakpoint, any>, R>(breakpointRecord: T, callback: (value: T[Breakpoint]) => R): Record<Breakpoint, R>{
    const result = {} as  Record<Breakpoint, R>;
    for (let breakpoint of breakpoints) {
        result[breakpoint] = callback(breakpointRecord[breakpoint]);
    }
    return result;
}

export function mergeBreakpointStyles(...styles: Record<Breakpoint, CoreStyleProps>[]): Record<Breakpoint, CoreStyleProps> {
    const result = {} as  Record<Breakpoint, CoreStyleProps>;
    for (let style of styles) {
        for (let breakpoint of breakpoints) {
            result[breakpoint] = {
                ...result[breakpoint],
                ...style[breakpoint]
            }
        }
    }
    return result;
}
