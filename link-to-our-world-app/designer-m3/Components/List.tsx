import { Body } from "./Typography";
import { Row } from "./Layout";
import { Theme } from "designer-m3";
import { StyledView } from "ui-core";

export const ListItem = Row
    .style((theme: Theme) => ({
        gap: theme.spacing.sm,
        minHeight: 56,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        backgroundColor: theme.colors.roles.surface,
        alignItems: 'center'
    }))

export const ListItemTitle = Body.Large;

export const ListItemLeadingIcon = StyledView
    .style((theme: Theme) => ({
        color: theme.colors.roles.onSurfaceVariant
    }))

export const ListItemTrailing = Row
    .style((theme: Theme) => ({
        flex: 1,
        flexDirection: 'row-reverse'
    }))
