import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountMenuItem({
  icon,
  label,
  value,
  hasBadge,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasBadge?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIconWrapper}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>

      {value && <Text style={styles.menuValue}>{value}</Text>}
      {hasBadge && <View style={styles.badge} />}

      <MaterialCommunityIcons name="chevron-right" size={24} color="#8A8A8E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIconWrapper: {
    width: 40,
    marginRight: 12,
    alignItems: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  menuValue: {
    fontSize: 16,
    color: "#8A8A8E",
    marginRight: 10,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5C5C",
    marginRight: 10,
  },
});
