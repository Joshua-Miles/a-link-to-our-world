import { Slot } from "expo-router";
import * as Api from 'api'
import { DesignerM3Provider, theme } from "designer-m3"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Globals } from "@triframe/ambassador";

Globals.storage = AsyncStorage

if (typeof window !== 'undefined') {
    Object.assign(window, Api);
}

export default function RootLayout() {
    return (
        <DesignerM3Provider theme={theme}>
            <Slot />
        </DesignerM3Provider>
    )
}
