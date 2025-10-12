import * as Font from "expo-font";
import React from "react";
import { Dimensions, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../app/store/store";
import Navigation from "./navigation/Navigation";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ position: "absolute", height, width }}>
          <Navigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
