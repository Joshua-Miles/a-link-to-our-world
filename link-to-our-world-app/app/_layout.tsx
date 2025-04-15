import { Slot } from "expo-router";
import * as Api from "api";
import {
  DesignerM3Provider,
  theme as defaultTheme,
  ColorTheme,
  KeyColor,
  KeyToneSet,
  Column,
} from "designer-m3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Globals } from "@triframe/ambassador";
import { StatusBar } from "react-native";
import { useFonts } from 'expo-font'
import { SoundtrackProvider } from "shared";


Globals.storage = AsyncStorage;

if (typeof window !== "undefined") {
  Object.assign(window, Api);
}

const keyTones: KeyToneSet = {
  set: 60,
  onSet: 0,
  setContainer: 10,
  onSetContainer: 90,

  surface: 2,
  onSurface: 90,
  onSurfaceVariant: 70,

  elevationLowest: 0,
  elevationLow: 4,
  elevation: 6,
  elevationHigh: 8,
  elevationHighest: 10,

  outline: 50,
  shadow: 100,
};

const theme = {
  ...defaultTheme,
  colors: ColorTheme.fromSourceColor("#55edfe", keyTones),
};

StatusBar.setBackgroundColor(theme.colors.roles.surfaceContainerLowest)

export default function RootLayout() {
  useFonts({
    'TriForce': require('../assets/Triforce.ttf'),
  });
  return (
    <SoundtrackProvider preload={['item-get', 'game-over']}>
      <DesignerM3Provider theme={theme}>
        <Column
          flex={1}
          backgroundColor={theme.colors.roles.surfaceContainerLowest}
        >
          <StatusBar barStyle="light-content" />
          <Slot />
        </Column>
      </DesignerM3Provider>
    </SoundtrackProvider>
  );
}
