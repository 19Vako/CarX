import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BottomWayMenuViewModel } from "../_viewsModels/BottomWayMenuViewModel";
import PointFromModal from "./PointFromModal";
import RideTypeModal from "./RideTypeModal";
import WhereToModal from "./WhereToModal";

export default function BottomWayMenu() {
  const {
    modalVisible,
    setModalVisible,
    pointTo,
    pointFrom,
    fromModalVisible,
    distance,
    setFromModalVisible,
    rideTypeModalVisible,
    setRideTypeModalVisible,
  } = BottomWayMenuViewModel();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.addressBlock}>
          <TouchableOpacity
            onPress={() => setFromModalVisible(true)}
            style={styles.row}
          >
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color="#fcfcfc"
            />
            <Text style={styles.addressText} numberOfLines={1}>
              {pointFrom}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#fcfcfc"
            />
            <Text style={styles.addressTextEmpty}>Where are you going?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.row, styles.historyRow]}>
          {pointTo && (
            <>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#9CA3AF"
              />
              <View style={styles.historyTextContainer}>
                <Text style={styles.historyText} numberOfLines={2}>
                  {pointTo}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
      <WhereToModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <PointFromModal
        visible={fromModalVisible}
        onClose={() => setFromModalVisible(false)}
      />
      <RideTypeModal
        distance={distance || 0}
        visible={rideTypeModalVisible}
        onClose={() => setRideTypeModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#222730",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingBottom: 30,
    zIndex: 10,
  },
  addressBlock: {
    backgroundColor: "#303641",
    borderRadius: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  addressText: { color: "#ffffff", fontSize: 16, marginLeft: 15, flex: 1 },
  addressTextEmpty: { color: "#9CA3AF", fontSize: 16, marginLeft: 15, flex: 1 },
  divider: {
    height: 1,
    backgroundColor: "#424A58",
    marginLeft: 50,
    marginRight: 15,
  },
  rightIcons: { flexDirection: "row", alignItems: "center" },
  actionIcon: {
    backgroundColor: "#424A58",
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  historyRow: { marginTop: 5, marginHorizontal: 15 },
  historyTextContainer: { flex: 1, marginLeft: 15 },
  historyText: { color: "#fcfcfc", fontSize: 15, lineHeight: 20 },
});
