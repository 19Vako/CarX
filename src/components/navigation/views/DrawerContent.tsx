import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerButtonViewModel } from "../viewModels/DrawerContentViewModel";
import DrawerMenuItem from "./DrawerMenuItem";

export default function DrawerContent() {
  const { userImage, userName, userEmail, userCity, rating } =
    DrawerButtonViewModel();

  return (
    <DrawerContentScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <TouchableOpacity
        style={styles.profileHeader}
        onPress={() => router.push("/(app)/Account")}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userImage }} style={styles.avatarImage} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileSubtitle}>{userEmail}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#888" />
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="star" size={24} color="#FFC107" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statValue}>{rating}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            size={24}
            color="#888"
          />
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>City</Text>
            <Text style={styles.statValue}>{userCity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <DrawerMenuItem
          icon="history"
          label="History"
          onPress={() => router.push("/(app)/History")}
        />
      </View>

      <View style={styles.footerMenu}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>About</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222730" },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  avatarContainer: { marginRight: 15 },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: { flex: 1 },
  profileName: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  profileSubtitle: { color: "#888", fontSize: 14, marginTop: 4 },
  statsContainer: {
    padding: 20,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  statItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  statTextContainer: { flex: 1, marginLeft: 15 },
  statLabel: { color: "#888", fontSize: 12 },
  statValue: { color: "#fff", fontSize: 16, marginTop: 2 },
  menuContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
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
  footerMenu: { padding: 20 },
  footerItem: { paddingVertical: 10 },
  footerText: { color: "#fff", fontSize: 16 },
});
