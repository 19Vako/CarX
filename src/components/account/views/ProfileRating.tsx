import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileRatingViewModel } from "../viewModels/ProfileRatingViewModel";

export default function ProfileRating() {
  const { rating } = ProfileRatingViewModel();

  return (
    <View style={styles.statItem}>
      <View style={[styles.iconWrapper, { backgroundColor: "#FFD700" }]}>
        <Ionicons name="star" size={20} color="#15151A" />
      </View>
      <View style={styles.statTextContainer}>
        <Text style={styles.statLabel}>Rating</Text>
        <Text style={styles.statValue}>{rating}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#8A8A8E" />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
