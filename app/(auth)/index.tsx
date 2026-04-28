import RegistrationAnimatedView from "@/src/components/auth/views/RegistrationAnimatedView";

import React from "react";
import { View } from "react-native";
import { RegistrationViewModel } from "./viewModels/RegistrationViewModel";

export default function Registration() {
  const { ActiveView } = RegistrationViewModel();
  return (
    <View style={{ flex: 1, backgroundColor: "#1E252F" }}>
      <RegistrationAnimatedView />
      {ActiveView()}
    </View>
  );
}
