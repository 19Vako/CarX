import DrawerButton from "@/src/components/navigation/views/DrawerButton";
import BottomWayMenu from "@/src/components/orders/views/BottomWayMenu";
import Map from "@/src/components/orders/views/Map";

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
