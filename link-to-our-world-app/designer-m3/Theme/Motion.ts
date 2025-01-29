import { timing, Transition } from "ui-core";

export type MotionTheme = {
    transitions: {
        standard: Transition
    }
}

export const defaultMotionTheme: MotionTheme = {
    transitions: {
        standard: timing(250)
    }
}
