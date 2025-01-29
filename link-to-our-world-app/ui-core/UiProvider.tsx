import { PortalHost, PortalProvider } from "@gorhom/portal";
import { BaseTheme, defaultTheme, ThemeProvider } from './Theme';

export type UiProviderProps = {
    theme?: BaseTheme
    children: React.ReactNode
}

export function UiProvider({ children, theme }: UiProviderProps) {
    return (
        <ThemeProvider value={theme ?? defaultTheme}>
            <PortalProvider>
                {children}
                <PortalHost name="FixedPosition"  />
            </PortalProvider>
        </ThemeProvider>
    )
}
