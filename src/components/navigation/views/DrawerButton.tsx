import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DrawerButtonViewModel } from "../viewModels/DrawerButtonViewModel";

export default function DrawerButton() {
  const { openDrawer } = DrawerButtonViewModel();

  return (
    <TouchableOpacity style={styles.container} onPress={openDrawer}>
      <Ionicons name="menu" size={25} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1000,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#303641",
  },
});
