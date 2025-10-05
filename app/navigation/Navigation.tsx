import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DrawerNavigation from "./DrawerNavigation";
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
      <Stack.Screen name="Drawer" component={DrawerNavigation}  />
    </Stack.Navigator>
  );
}
