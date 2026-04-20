import { Ionicons } from "@expo/vector-icons";

import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RideTypeModalViewModel } from "../_viewModels/RideTypeModalViewModel";
import RideItem from "./RideItem";

export default function RideTypeModal() {
  const {
    distance,
    rideOptions,
    selectedRideId,
    visible,
    selectedOption,
    loading,
    onClose,
    selectRideType,
    handlePayment,
  } = RideTypeModalViewModel();

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
          data={rideOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RideItem
              item={item}
              isSelected={selectedRideId === item.id}
              onSelect={() => selectRideType(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          onPress={handlePayment}
          style={[styles.chooseButton, loading && { opacity: 0.7 }]}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#15151A" />
          ) : (
            <Text style={styles.chooseButtonText}>
              {`Pay ${selectedOption.displayPrice}`}
            </Text>
          )}
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
