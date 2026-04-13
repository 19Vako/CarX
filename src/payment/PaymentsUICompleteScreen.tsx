import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "https://your-backend-url.com";

export default function PaymentsUICompleteScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

  // 1. Получение параметров платежа от твоего бэкенда
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency: "usd", amount: 1500 }), // сумма в копейках/центах
    });

    const { paymentIntent, customer, ephemeralKey } = await response.json();

    return {
      paymentIntent,
      customer,
      ephemeralKey,
    };
  };

  // 2. Инициализация нативной шторки Stripe
  const initialisePaymentSheet = useCallback(async () => {
    setLoading(true);
    try {
      const { paymentIntent, customer, ephemeralKey } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "CarX Taxi",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe", // Можно подтянуть из твоего Auth сессии
        },
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      } else {
        Alert.alert(`Ошибка инициализации: ${error.code}`, error.message);
      }
    } catch (e) {
      console.log("Ошибка при загрузке параметров платежа", e);
    } finally {
      setLoading(false);
    }
  }, [initPaymentSheet]);

  // 3. Показ самой шторки
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Пользователь просто закрыл шторку — это не ошибка
        console.log("Payment canceled");
      } else {
        Alert.alert(`Ошибка: ${error.code}`, error.message);
      }
    } else {
      Alert.alert("Успех", "Оплата прошла успешно!");
      setPaymentSheetEnabled(false); // Деактивируем кнопку после успеха
    }
  };

  useEffect(() => {
    initialisePaymentSheet();
  }, [initialisePaymentSheet]);

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
