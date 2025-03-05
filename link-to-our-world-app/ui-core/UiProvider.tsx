import { PortalHost, PortalProvider } from "@gorhom/portal";
import { NavigationProvider, OnNavigate } from "./Navigation";
import { BaseTheme, defaultTheme, ThemeProvider } from './Theme';

export type UiProviderProps = {
    theme?: BaseTheme
    onNavigate?: OnNavigate
    children: React.ReactNode
}

export function UiProvider({ children, theme, onNavigate }: UiProviderProps) {
    return (
        <ThemeProvider value={theme ?? defaultTheme}>
            <NavigationProvider onNavigate={onNavigate}>
            <PortalProvider>
                {children}
                <PortalHost name="FixedPosition"  />
            </PortalProvider>
            </NavigationProvider>
        </ThemeProvider>
    )
}
