import * as Font from "expo-font";
import { Provider } from "react-redux";
import RootStack from "./RootStack";
import store from "./store/store";


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
     <RootStack/>
   </Provider>
    

  );
}
