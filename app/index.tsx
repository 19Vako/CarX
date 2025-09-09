import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, View } from "react-native";
import Navigation from "./navigation/Navigation";
const { height, width } = Dimensions.get("window");


export default function App() {
  return (
  <>
    <StatusBar translucent={true} />
      <View style={{position:"absolute", height, width}}>
        <Navigation />
      </View>
  </>
  );
}
