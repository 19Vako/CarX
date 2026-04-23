import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerMenuItem({
  icon,
  label,
  badge,
  onPress,
}: {
  icon: any;
  label: string;
  badge?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color="#fff"
        style={styles.menuIcon}
      />
      <Text style={styles.menuLabel}>{label}</Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: { marginRight: 15 },
  menuLabel: { color: "#fff", fontSize: 16, flex: 1 },
  badge: {
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
