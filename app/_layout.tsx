import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "../store/store";
import RootStack from "./RootStack";

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
      <RootStack />
    </Provider>
  );
}
