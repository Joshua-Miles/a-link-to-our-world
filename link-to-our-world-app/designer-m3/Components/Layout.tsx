import { StyledView } from "ui-core";
import { PageContainer } from "./Page";

const Box = StyledView
    .inheritInteractionState(PageContainer.is('_navTransitionIn'), '_navTransitionIn')
    .inheritInteractionState(PageContainer.is('_navTransitionOut'), '_navTransitionOut')

export const Row = Box.style(() => ({
    flexDirection: 'row'
}))

export const RowReverse = Box.style(() => ({
    flexDirection: 'row-reverse'
}))

export const Column = Box.style(() => ({
    flexDirection: 'column'
}))

export const ColumnReverse = Box.style(() => ({
    flexDirection: 'column-reverse'
}))

