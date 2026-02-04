import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function index() {
  async function handlePress() {
    await AsyncStorage.removeItem(
      "firebase:authUser:AIzaSyDOknjaCySh31wgv0k9qbJ-KmAxzd6bPGI:[DEFAULT]",
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}
        onPress={handlePress}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Out</Text>
      </Button>
    </View>
  );
}
