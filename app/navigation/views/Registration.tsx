import React from "react";
import { View } from "react-native";

import BottomLogInMenu from "@/app/components/_views/BottomLogInMenu";
import RegistrationAnimatedView from "@/app/components/_views/RegistrationAnimatedView";

export default function Registration() {
  return (
    <View style={{ flex: 3, backgroundColor: "#21262c" }}>
      <RegistrationAnimatedView />
      <BottomLogInMenu />
    </View>
  );
}
