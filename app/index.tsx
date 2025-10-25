import * as Font from "expo-font";
import { Dimensions, View } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./navigation/Navigation";
import store, { persistor } from "./store/store";

import { usePushNotifications } from "./notifications/useNotification";

const { height, width } = Dimensions.get("window");

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();

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
