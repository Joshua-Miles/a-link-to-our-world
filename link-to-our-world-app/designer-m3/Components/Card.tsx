import { Theme } from "designer-m3";
import { Column } from "./Layout";

export const Card = Column.style((theme: Theme) => ({
    shadow: {
        ...theme.shadows.resting,
        color: theme.colors.roles.shadow
    },
    borderRadius: theme.spacing.corner.xs,
}))

export const CardContent = Column.style((theme: Theme) => ({
    margin: theme.spacing.sm
}))
