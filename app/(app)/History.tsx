import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function History() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Center Empty State */}
        <View style={styles.emptyStateContainer}>
          {/* Illustration Mock (Map and Pin) */}
          <View style={styles.illustration}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={80}
              color="#FFD60A"
              style={styles.pinIcon}
            />
            <MaterialCommunityIcons
              name="map-outline"
              size={100}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.emptyStateText}>
            Ride history will appear here.{"\n"}Time to go!
          </Text>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity style={styles.bottomButton}>
          <View style={styles.bottomButtonIconContainer}>
            <Ionicons name="car-outline" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.bottomButtonText}>Order a ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222730", // Темно-серый фон, характерный для iOS
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerBtn: {
    backgroundColor: "#303641",
    padding: 8,
    borderRadius: 12,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: -80, // Немного смещаем вверх для визуального баланса
  },
  illustration: {
    alignItems: "center",
    marginBottom: 40,
  },
  pinIcon: {
    marginBottom: -10, // Накладываем маркер на карту
    zIndex: 1,
  },
  emptyStateText: {
    fontSize: 17,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
  },
  bottomButton: {
    position: "absolute",
    bottom: 40,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomButtonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8, // Немного скругленный квадрат, как на макете
    backgroundColor: "#5E5CE6", // Сине-фиолетовый акцентный цвет
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bottomButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
