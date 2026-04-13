import { CardField, useConfirmSetupIntent } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

const API_URL = "https://your-backend-url.com";

export default function SetupFuturePaymentScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Хук для подтверждения намерения сохранить карту
  const { confirmSetupIntent } = useConfirmSetupIntent();

  // 1. Создаем SetupIntent на бэкенде
  const createSetupIntentOnBackend = async (customerEmail: string) => {
    const response = await fetch(`${API_URL}/create-setup-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: customerEmail }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // 2. Основная функция сохранения карты
  const handleSaveCard = async () => {
    if (!email) {
      Alert.alert("Ошибка", "Введите email");
      return;
    }

    setLoading(true);

    try {
      // Шаг А: Получаем секрет от сервера
      const clientSecret = await createSetupIntentOnBackend(email);

      // Шаг Б: Подтверждаем сохранение через данные из CardField (Stripe подтянет их сам)
      const { error, setupIntent } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: { email },
        },
      });

      if (error) {
        Alert.alert(`Ошибка: ${error.code}`, error.message);
      } else if (setupIntent) {
        Alert.alert("Успех", "Карта успешно привязана к вашему аккаунту!");
        // Здесь можно отправить ID способа оплаты на свой сервер, если нужно
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Ошибка", "Не удалось связаться с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Привязать карту</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Ваш E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Поле для ввода данных карты (номер, дата, CVC) */}
      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: "0000 0000 0000 0000" }}
        cardStyle={styles.cardStyle}
        style={styles.cardField}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={handleSaveCard}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Сохранение..." : "Сохранить карту"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Карта будет сохранена для быстрой оплаты будущих поездок.
      </Text>
    </View>
  );
}

// Заменяем кастомный Button на обычный TouchableOpacity для чистоты примера
const TouchableOpacity = require("react-native").TouchableOpacity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 20,
  },
  cardStyle: {
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
