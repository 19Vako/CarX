import BottomLogInMenu from "@/app/components/_views/BottomLogInMenu";
import React from "react";
import { View } from "react-native";

import RegistrationAnimatedView from "@/app/components/_views/RegistrationAnimatedView";

export default function Registration() {
  return (
    <View style={{ flex: 1, backgroundColor: "#21262c", alignItems: "center" }}>
      <RegistrationAnimatedView/>
      <BottomLogInMenu />
    </View>
  );
}
