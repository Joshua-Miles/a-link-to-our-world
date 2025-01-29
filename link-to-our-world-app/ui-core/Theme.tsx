import { createContext, useContext } from "react";
import { Breakpoint } from "./Breakpoints";

export type BaseTheme = {
    breakpoints: Record<Breakpoint, number>
}

export const defaultTheme: BaseTheme = {
    breakpoints: {
        xs: 240,
        sm: 480,
        md: 768,
        lg: 992,
        xl: 1280,
        '2xl': 1536
    }
}

const ThemeContext = createContext<BaseTheme>(defaultTheme);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = function<Theme extends BaseTheme>(){
    return useContext(ThemeContext) as Theme;
};
