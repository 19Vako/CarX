import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { PaymentFormViewModel } from "../_viewModels/PaymentFormViewModel";

export default function PaymentForm() {
  const { openPaymentSheet, loading, paymentSheetEnabled } =
    PaymentFormViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали оплаты</Text>
      <View style={styles.card}>
        <Text style={styles.label}>К оплате:</Text>
        <Text style={styles.amount}>15.00 $</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          (!paymentSheetEnabled || loading) && styles.buttonDisabled,
        ]}
        disabled={!paymentSheetEnabled || loading}
        onPress={openPaymentSheet}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Оплатить сейчас</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
