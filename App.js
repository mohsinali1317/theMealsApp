import React from "react";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <MealsNavigator />;
}
