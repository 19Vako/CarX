import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AccountMenuItem from "./AccountMenuItem";

export default function AccountMenuList() {
  return (
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
        icon={<Ionicons name="settings-outline" size={24} color="#8A8A8E" />}
        label="Application Settings"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuListContainer: {
    backgroundColor: "#303641",
    borderRadius: 16,
    marginBottom: 20,
    paddingVertical: 8,
  },
});
