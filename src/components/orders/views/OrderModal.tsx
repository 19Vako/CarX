import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const MOCK_DISTANCE_KM = 1.3;
const MOCK_ETA_MIN = 10;
const MOCK_PRICE = 6.5;
const MOCK_CURRENCY = "$";

interface OrderModalProps {
  visible: boolean;
  onClose?: () => void;
  onPay?: () => void;
}

export default function OrderModal({
  visible,
  onClose,
  onPay,
}: OrderModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.handle} />

        <View style={styles.infoRow}>
          <Text style={styles.distanceText}>{MOCK_DISTANCE_KM} km</Text>
          <Text style={styles.etaText}>{MOCK_ETA_MIN} min</Text>
        </View>

        <Text style={styles.priceText}>
          {MOCK_CURRENCY}
          {MOCK_PRICE.toFixed(2)}
        </Text>

        <Pressable
          onPress={onPay}
          style={({ pressed }) => [
            styles.payButton,
            pressed && styles.payButtonPressed,
          ]}
        >
          <Text style={styles.payButtonText}>
            Pay {MOCK_CURRENCY}
            {MOCK_PRICE.toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 300,
    width: "100%",
    backgroundColor: "#222730",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 15,
    zIndex: 15,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  distanceText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  etaText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
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
