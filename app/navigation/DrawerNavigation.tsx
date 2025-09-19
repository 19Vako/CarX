import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Account from "./views/Account";
import Activity from "./views/Activity";
import Cars from "./views/Cars";
import HomeScreen from "./views/HomeScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {

  return (
   <Drawer.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTransparent: true,
      headerTitle: "",
    }}
   >
    
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Cars" component={Cars} />
      
   </Drawer.Navigator>
  );
}
