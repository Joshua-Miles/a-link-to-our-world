import { StyledText } from "ui-core";
import { createComponentWithVariants } from "../createComponentWithVariants";
import { Theme } from "../Theme";

export const Display = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.small,
        color: theme.colors.roles.onSurface
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.medium,
        color: theme.colors.roles.onSurface
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.large,
        color: theme.colors.roles.onSurface
    }),
})

export const Headline = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.small,
        color: theme.colors.roles.onSurface
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.medium,
        color: theme.colors.roles.onSurface
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.large,
        color: theme.colors.roles.onSurface
    }),
})

export const Title = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.small,
        color: theme.colors.roles.onSurface
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.medium,
        color: theme.colors.roles.onSurface
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.large,
        color: theme.colors.roles.onSurface
    }),
})

export const Body = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.small,
        color: theme.colors.roles.onSurface
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.medium,
        color: theme.colors.roles.onSurface
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.large,
        color: theme.colors.roles.onSurface
    }),
})

export const Label = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.small,
        color: theme.colors.roles.onSurface
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.medium,
        color: theme.colors.roles.onSurface
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.large,
        color: theme.colors.roles.onSurface
    }),
})
