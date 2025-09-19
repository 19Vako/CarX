import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { MenuButton } from "../components/views/MenuButton";
import Account from "./views/Account";
import Activity from "./views/Activity";
import Cars from "./views/Cars";
import HomeScreen from "./views/HomeScreen";

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
        drawerStyle: {
          backgroundColor: "#21262c",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#ccc",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        headerLeft: () => <MenuButton />,
        headerTransparent: true,
        headerTitle: "",
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Activity"
        component={Activity}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cars"
        component={Cars}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
