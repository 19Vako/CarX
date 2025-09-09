import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Account from "./views/Account";
import Activity from "./views/Activity";
import HomeScreen from "./views/HomeScreen";
import SplashScreen from "./views/SplashScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
}
