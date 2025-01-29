import { StyledText } from "ui-core";
import { createComponentWithVariants } from "../createComponentWithVariants";
import { Theme } from "../Theme";

export const Display = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.small
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.medium
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.display.base,
        ...theme.typography.display.large
    }),
})

export const Headline = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.small,
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.medium
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.headline.base,
        ...theme.typography.headline.large
    }),
})

export const Title = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.small
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.medium
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.title.base,
        ...theme.typography.title.large
    }),
})

export const Body = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.small
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.medium
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.body.base,
        ...theme.typography.body.large
    }),
})

export const Label = createComponentWithVariants(StyledText, {
    Small: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.small
    }),
    Medium: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.medium
    }),
    Large: (theme: Theme) => ({
        ...theme.typography.label.base,
        ...theme.typography.label.large
    }),
})
