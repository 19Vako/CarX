import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileSectionViewModel } from "../_viewModels/ProfileSectionViewModel";

export default function ProfileSection() {
  const { userEmail, userImage, userName } = ProfileSectionViewModel();

  return (
    <View style={styles.profileSection}>
      <View style={styles.avatarWrapper}>
        <Image
          source={userImage}
          contentFit="cover"
          transition={200}
          style={styles.avatarImage}
        />
      </View>

      <Text style={styles.profileName}>{userName}</Text>
      <Text style={styles.profilePhone}>{userEmail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: "#1C1C1E",
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
});
