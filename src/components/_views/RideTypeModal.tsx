import { calculateRidePrice } from "@/src/utils/pricing";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RideTypeModalViewModel } from "../_viewModels/RideTypeModalViewModel";
import RideItem from "./RideItem";

export default function RideTypeModal({
  distance,
  visible,
  onClose,
}: {
  distance: number;
  visible: boolean;
  onClose: () => void;
}) {
  const { RIDE_TYPES, selectedRide, selectRideType } = RideTypeModalViewModel();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 40 }} />

          <Text style={styles.headerTitle}>
            Select a Ride - {distance == 0 ? 5 : distance} km
          </Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={RIDE_TYPES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const currentPrice = calculateRidePrice(
              distance == 0 ? 5 : distance,
              item.multiplier,
            );

            return (
              <RideItem
                item={item}
                selectedRide={selectedRide}
                selectRideType={selectRideType}
                price={currentPrice}
              />
            );
          }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          onPress={() => router.push("/(app)/PaymentsUICompleteScreen")}
          style={styles.chooseButton}
          activeOpacity={0.8}
        >
          <Text style={styles.chooseButtonText}>
            Choose {RIDE_TYPES.find((r) => r.id === selectedRide)?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
    paddingHorizontal: 15,

    zIndex: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#303641",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  chooseButton: {
    backgroundColor: "#FDE047", // Твой желтый
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  chooseButtonText: {
    color: "#15151A",
    fontSize: 18,
    fontWeight: "bold",
  },
});
