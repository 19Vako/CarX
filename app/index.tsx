import * as Font from 'expo-font';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, View } from "react-native";
import Navigation from "./navigation/Navigation";
const { height, width } = Dimensions.get("window");


export default function App() {

const [fontsLoaded] = Font.useFonts({
    'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
    'Roboto-Medium': require('@/assets/fonts/Roboto-Medium.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
   <>
    <StatusBar translucent={true} />
    <View style={{position:"absolute", height, width}}>
      <Navigation />
    </View>
   </>
  );
}
