import * as Sentry from "@sentry/react-native";
import * as Font from "expo-font";
import { Text } from "react-native";
import { Provider } from "react-redux";
import store from "../store/store";
import RootStack from "./RootStack";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  sendDefaultPii: true,
  enableLogs: true,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
});

if (__DEV__) {
  import("../configs/ReactotronConfig");
}

export default Sentry.wrap(function App() {
  const [fontsLoaded] = Font.useFonts({
    "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Sentry.ErrorBoundary fallback={<Text>Something went wrong</Text>}>
        <RootStack />
      </Sentry.ErrorBoundary>
    </Provider>
  );
});
