import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Payment() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>Payment methods</Text>

        {/* Section Header */}
        <Text style={styles.sectionTitle}>Default payment method</Text>

        {/* Payment Options */}
        <View>
          {/* Apple Pay */}
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconContainer}>
              <View style={styles.applePayBadge}>
                <FontAwesome5 name="apple" size={10} color="black" />
                <Text style={styles.applePayText}>Pay</Text>
              </View>
            </View>
            <Text style={styles.optionText}>Apple Pay</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Cash */}
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={26}
                color="#34C759"
              />
            </View>
            <Text style={styles.optionText}>Cash</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Add Card */}
          <TouchableOpacity style={styles.addCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="card-outline" size={26} color="#34C759" />
            </View>
            <Text style={styles.optionText}>Add card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222730",
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerBtn: {
    backgroundColor: "#303641",
    padding: 8,
    borderRadius: 12,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    backgroundColor: "transparent",
  },
  editButtonText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#8E8E93",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#303641",
  },
  addCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#303641",
    marginTop: 5,
  },
  iconContainer: {
    width: 36,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 17,
    color: "white",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#2C2C2E",
    marginLeft: 64,
  },
  applePayBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  applePayText: {
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 2,
  },
});
