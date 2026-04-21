import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OpenRideTypeModalViewModel } from "../_viewModels/OpenRideTypeModalViewModel";

export default function OpenRideTypeModal() {
  const { onPress, rideTypeModalVisible, pointTo } =
    OpenRideTypeModalViewModel();

  return (
    !rideTypeModalVisible &&
    pointTo && (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        activeOpacity={0.7}
      >
        <FontAwesome5 name="car" size={28} color="black" />
      </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FDE047",
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    bottom: 230,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
