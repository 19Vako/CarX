import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OrderModalViewModel } from "../viewModels/OrderModalViewModel";

export default function OrderModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { selectedPayment, showPaymentSheet, loading } = OrderModalViewModel();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.carImageContainer}>
          <Image
            style={styles.carImage}
            source={selectedPayment?.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoRowBox}>
            <Text style={styles.infoTitle}>Distance:</Text>
            <Text style={styles.distanceText}>
              {selectedPayment?.multiplier} km
            </Text>
          </View>
          <View style={styles.infoRowBox}>
            <Text style={styles.infoTitle}>Driver arrival:</Text>
            <Text style={styles.etaText}>{selectedPayment?.time} min</Text>
          </View>
        </View>
        <View style={styles.infoRowBox}>
          <Text style={styles.infoTitle}>Price:</Text>
          <Text style={styles.priceText}>{selectedPayment?.displayPrice}$</Text>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={showPaymentSheet}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? "Loading..." : "Pay"}
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
    justifyContent: "flex-end",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#303641",
    alignItems: "center",
    justifyContent: "center",
  },

  carImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  carImage: {
    height: 200,
    width: "100%",

    marginHorizontal: 15,
  },

  infoRow: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  infoRowBox: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  infoTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 10,
  },

  distanceText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 20,
  },
  etaText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 20,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: "#FFD13C",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  payButtonPressed: {
    backgroundColor: "#E8BC30",
  },
  payButtonText: {
    color: "#1B1F2A",
    fontSize: 17,
    fontWeight: "700",
  },
});
