import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ProfileLogOutButtonViewModel } from "../viewModels/ProfileLogOutButton";

export default function ProfileLogOutButton() {
  const { logOut } = ProfileLogOutButtonViewModel();

  return (
    <TouchableOpacity onPress={logOut} style={styles.logOutButton}>
      <Ionicons name="log-out-outline" size={20} color="#FF5C5C" />
      <Text style={styles.logOutText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#303641",
  },

  logOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5C5C",
    marginLeft: 8,
  },
});
