import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RideItem({
  item,
  isSelected,
  onSelect,
}: {
  item: any;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.rideItem, isSelected && styles.rideItemActive]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Image source={item.image} style={styles.carImage} resizeMode="contain" />

      <View style={styles.rideDetails}>
        <Text style={styles.rideTitle}>{item.title}</Text>
        <Text style={styles.rideTime}>{item.time}</Text>
      </View>

      <Text style={styles.price}>${item.displayPrice}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303641",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  rideItemActive: {
    borderColor: "#FDE047",
    backgroundColor: "#2A2A35",
  },
  carImage: {
    width: 64,
    height: 40,
    marginRight: 16,
  },
  rideDetails: {
    flex: 1,
  },
  rideTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  rideTime: {
    color: "#8A8A8E",
    fontSize: 14,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
