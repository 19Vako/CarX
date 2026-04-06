import BottomWayMenu from "@/src/components/_views/BottomWayMenu";
import Map from "@/src/components/_views/Map";
import { auth } from "@/src/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, Text, View } from "react-native";
import { Button } from "react-native-paper";

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
      <Button
        style={{
          position: "absolute",
          zIndex: 4,
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={handlePress}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Out</Text>
      </Button>
      <Map />

      <BottomWayMenu />
    </View>
  );
}
