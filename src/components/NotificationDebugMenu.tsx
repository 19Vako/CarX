import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationTestService } from "../notifications/utils/notificationTestService"; // Скорректируй путь, если нужно

export function NotificationDebugMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Дебаг Push-уведомлений</Text>
      <Text style={styles.subtitle}>
        Используй эти кнопки для проверки навигации в разных состояниях
        приложения
      </Text>

      {/* 1. ТЕСТ В ФОКУСЕ */}
      <TouchableOpacity
        style={[styles.button, styles.foregroundButton]}
        onPress={NotificationTestService.triggerForegroundTest}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          1. Приложение открыто (Foreground)
        </Text>
        <Text style={styles.buttonHint}>
          Сработает моментально внутри приложения
        </Text>
      </TouchableOpacity>

      {/* 2. ТЕСТ В ФОНЕ */}
      <TouchableOpacity
        style={[styles.button, styles.backgroundButton]}
        onPress={NotificationTestService.triggerBackgroundTest}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>2. В фоне (Background)</Text>
        <Text style={styles.buttonHint}>
          Задержка 5 сек. Успей свернуть приложение
        </Text>
      </TouchableOpacity>

      {/* 3. ТЕСТ ХОЛОДНОГО СТАРТА */}
      <TouchableOpacity
        style={[styles.button, styles.coldStartButton]}
        onPress={NotificationTestService.triggerColdStartTest}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>3. Холодный старт (App Killed)</Text>
        <Text style={styles.buttonHint}>
          Задержка 12 сек. Полностью выгрузи приложение
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 16,
    backgroundColor: "#1c1c1e", // Темная тема в стиле премиум-SaaS
    borderRadius: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#8e8e93",
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
  },
  foregroundButton: {
    backgroundColor: "#0a84ff", // Синий
  },
  backgroundButton: {
    backgroundColor: "#30d158", // Зеленый
  },
  coldStartButton: {
    backgroundColor: "#ff453a", // Красный
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  buttonHint: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
  },
});
