import AccountMenuItem from "@/src/components/_views/AccountMenuItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azj[fQWBRjayfRayfQfQM{M|azj[azj[fQWBRjayfRayfQfQM{M|azj[azj[fQWB";

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* === Header === */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* === Profile Section (Avatar & Name) === */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source="https://i.pravatar.cc/150?u=rider_doge" // Заменишь на Firebase URL
              placeholder={blurhash}
              contentFit="cover"
              transition={200}
              style={styles.avatarImage}
            />
          </View>

          <Text style={styles.profileName}>Райдер</Text>
          <Text style={styles.profilePhone}>+380676697865</Text>
        </View>

        {/* === Rating Block === */}
        <View style={styles.statItem}>
          <View style={[styles.iconWrapper, { backgroundColor: "#FFD700" }]}>
            <Ionicons name="star" size={20} color="#15151A" />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#8A8A8E"
          />
        </View>

        {/* === Main Menu List === */}
        <View style={styles.menuListContainer}>
          <AccountMenuItem
            icon={<Ionicons name="person-outline" size={24} color="#8A8A8E" />}
            label="My Profile"
            hasBadge
          />
          <AccountMenuItem
            icon={<Ionicons name="heart-outline" size={24} color="#FF5C5C" />}
            label="Favorites"
          />
          <AccountMenuItem
            icon={
              <MaterialCommunityIcons
                name="account-search-outline"
                size={24}
                color="#8A8A8E"
              />
            }
            label="Black List"
            value="0"
          />
          <AccountMenuItem
            icon={<Ionicons name="cash-outline" size={24} color="#8A8A8E" />}
            label="Default Tips"
          />
          <AccountMenuItem
            icon={
              <Ionicons name="settings-outline" size={24} color="#8A8A8E" />
            }
            label="Application Settings"
          />
        </View>

        {/* === Logout Button === */}
        <TouchableOpacity style={styles.logOutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FF5C5C" />
          <Text style={styles.logOutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222730",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  // === Header ===
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
  },
  closeButton: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  // === Profile ===
  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#303641",
  },
  editAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1C1C1E", // Под тон фона wrapperа
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  profilePhone: {
    fontSize: 16,
    color: "#8A8A8E",
  },

  // === StatItem (Rating) ===
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303641",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginLeft: 4,
  },
  statTextContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "#8A8A8E",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  // === MenuList ===
  menuListContainer: {
    backgroundColor: "#303641",
    borderRadius: 16,
    marginBottom: 20,
    paddingVertical: 8,
  },
  // === Corporate Account Switch ===
  switchAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303641",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  iconWrapperCorporate: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#3F444D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconPlusBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#3F444D",
  },
  switchAccountLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  // === Feedback Button ===
  logOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#303641",
  },

  logOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5C5C",
    marginLeft: 8,
  },
});

export default Account;
