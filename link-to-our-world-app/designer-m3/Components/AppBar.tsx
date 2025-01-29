import { Theme } from "designer-m3";
import { StatusBar } from "react-native";
import { StyledView } from "ui-core";
import { Title } from "./Typography";

const APP_BAR_HEIGHT = 48;

const AppBarContainer = StyledView
    .style( (theme: Theme) => ({
        flexDirection: 'row',
        backgroundColor: theme.colors.roles.surfaceContainer,
        color: theme.colors.roles.onSurface,
        paddingTop: (StatusBar.currentHeight ?? 0),
        paddingHorizontal: theme.spacing.xs,
        alignItems: 'center',
        height: (StatusBar.currentHeight ?? 0) + APP_BAR_HEIGHT,
        width: '100%',
    }))

export function AppBar(props: Parameters<typeof AppBarContainer>[0]) {
    return <AppBarContainer {...props} />
}

export const AppBarTitle = Title.Large
    .style( (theme: Theme) => ({
        color: theme.colors.roles.onSurface
    }))
