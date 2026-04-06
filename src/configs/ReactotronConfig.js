import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure()
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();

Reactotron.onCustomCommand({
  title: "Google Sign-out",
  command: "google-sign-out",
  handler: () => {
    AsyncStorage.clear();
    NativeModules.DevSettings.reload();
  },
});

export default reactotron;
