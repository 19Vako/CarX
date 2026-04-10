import BottomWayMenu from "@/src/components/_views/BottomWayMenu";
import DrawerButton from "@/src/components/_views/DrawerButton";
import Map from "@/src/components/_views/Map";

import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DrawerButton />
      <Map />
      <BottomWayMenu />
    </View>
  );
}
