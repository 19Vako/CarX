import BottomWayMenu from "@/src/components/_views/BottomWayMenu";
import DrawerButton from "@/src/components/_views/DrawerButton";
import Map from "@/src/components/_views/Map";
import { auth } from "@/src/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, View } from "react-native";

export default function Index() {
  async function handlePress() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      Alert.alert("Ошибка", "Не удалось выйти из аккаунта.");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DrawerButton />
      <Map />
      <BottomWayMenu />
    </View>
  );
}
