import React from "react";
import { View } from "react-native";
import Registration from "./Registration";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>
      <Registration />
    </View>
  );
};

export default HomeScreen;
