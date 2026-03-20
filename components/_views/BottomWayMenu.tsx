import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomWayMenuModal from "./BottomWayMenuModal";

export default function BottomWayMenu() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.addressBlock}>
          <TouchableOpacity style={styles.row}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color="#fcfcfc"
            />
            <Text style={styles.addressText} numberOfLines={1}>
              Гагаріна вулиця (Верхній Бистрий)
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* ТУТ ДОБАВЛЕН ЭКШЕН НА ОТКРЫТИЕ МОДАЛКИ */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#fcfcfc"
            />
            <Text style={styles.addressTextEmpty}>Куда едем?</Text>

            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.actionIcon}>
                <MaterialCommunityIcons
                  name="map-marker-plus-outline"
                  size={20}
                  color="#fcfcfc"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <MaterialCommunityIcons
                  name="layers-plus"
                  size={20}
                  color="#fcfcfc"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.row, styles.historyRow]}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#9CA3AF" />
          <View style={styles.historyTextContainer}>
            <Text style={styles.historyText} numberOfLines={2}>
              Железнодорожная станция Татаров (Тата...ная улица, 7)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomWayMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // --- Стили основного экрана ---
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#222730",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingBottom: 30,
    zIndex: 10,
  },
  addressBlock: {
    backgroundColor: "#303641",
    borderRadius: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  addressText: { color: "#ffffff", fontSize: 16, marginLeft: 15, flex: 1 },
  addressTextEmpty: { color: "#9CA3AF", fontSize: 16, marginLeft: 15, flex: 1 },
  divider: {
    height: 1,
    backgroundColor: "#424A58",
    marginLeft: 50,
    marginRight: 15,
  },
  rightIcons: { flexDirection: "row", alignItems: "center" },
  actionIcon: {
    backgroundColor: "#424A58",
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  historyRow: { marginTop: 5, marginHorizontal: 15 },
  historyTextContainer: { flex: 1, marginLeft: 15 },
  historyText: { color: "#fcfcfc", fontSize: 15, lineHeight: 20 },
});
