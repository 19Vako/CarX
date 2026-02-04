import RegistrationAnimatedView from "@/components/_views/RegistrationAnimatedView";

import React from "react";
import { View } from "react-native";
import { RegistrationModel } from "../(app)/models/RegistrationModel";

export default function Registration() {
  const { ActiveView } = RegistrationModel();
  return (
    <View style={{ flex: 1, backgroundColor: "#1E252F" }}>
      <RegistrationAnimatedView />
      {ActiveView()}
    </View>
  );
}
