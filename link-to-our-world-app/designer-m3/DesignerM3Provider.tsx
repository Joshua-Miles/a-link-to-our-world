import { UiProvider, UiProviderProps } from "ui-core";
import { Theme } from "./Theme";

export type DesignerM3ProviderProps = UiProviderProps & {
    theme: Theme
}

export function DesignerM3Provider({ theme, children }: DesignerM3ProviderProps) {
    return <UiProvider theme={theme}>{children}</UiProvider>
}
