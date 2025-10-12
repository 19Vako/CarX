import BottomLogInMenu from "@/app/components/_views/BottomLogInMenu";
import React from "react";
import { Image, View } from "react-native";
import { Images } from "../../constants/images";

export default function Registration() {
  return (
    <View style={{ flex: 1, backgroundColor: "#21262c", alignItems: "center" }}>
      <Image style={{ flex: 1, width: "100%" }} source={Images.cardSchema} />
      <BottomLogInMenu />
    </View>
  );
}
