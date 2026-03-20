import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomWayMenuModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [destination, setDestination] = useState("");

  const locations = [
    {
      id: 1,
      title: "Железнодорожная станция Татаров",
      subtitle: "83.4 км • Татаров, Ж...нодорожная улица, 7",
    },
    { id: 2, title: "Паркинг №1", subtitle: "72.3 км • Урочище Щевки, 1" },
    { id: 3, title: "Аквапарк Мавка", subtitle: "70.6 км • Урочище Щевки" },
  ];
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalBackground,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Шапка модалки */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.headerBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Маршрут</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Блок адресов */}
          <View style={styles.routeBlock}>
            <View style={styles.routeGraphic}>
              <View
                style={[styles.dot, { borderColor: "#4A90E2", borderWidth: 4 }]}
              />
              <View style={styles.dottedLine} />
              <View
                style={[
                  styles.dot,
                  {
                    borderColor: "#fff",
                    borderWidth: 4,
                    backgroundColor: "#222730",
                  },
                ]}
              />
            </View>

            <View style={styles.routeInputs}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText} numberOfLines={1}>
                  Гагаріна вулиця (Верхній Бистри...
                </Text>
                <MaterialCommunityIcons name="menu" size={24} color="#9CA3AF" />
              </View>
              <View style={styles.routeDivider} />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Место назначения"
                  placeholderTextColor="#9CA3AF"
                  value={destination}
                  onChangeText={setDestination}
                  autoFocus={true}
                />
                <MaterialCommunityIcons name="menu" size={24} color="#9CA3AF" />
              </View>
            </View>
          </View>

          {/* Контент списка */}
          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={{ paddingBottom: 20 }} // Доп. отступ снизу для красоты
          >
            {/* Теги внутри скролла или над ним */}
            <View style={{ marginBottom: 15 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.tagBtn}>
                  <Text style={styles.tagText}>Рекомендуемые</Text>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color="#fff"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagBtn}>
                  <Text style={styles.tagText}>Подъёмник</Text>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color="#fff"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>

            {locations.map((loc) => (
              <TouchableOpacity key={loc.id} style={styles.listItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#fff"
                  style={styles.listIcon}
                />
                <View style={styles.listItemTextContainer}>
                  <Text style={styles.listItemTitle}>{loc.title}</Text>
                  <Text style={styles.listItemSubtitle}>{loc.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.chooseOnMapBtn}>
              <View style={styles.chooseOnMapIconWrapper}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color="#fff"
                />
              </View>
              <Text style={styles.chooseOnMapText}>Выбрать на карте</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#222730", // Темный фон
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerBtn: {
    backgroundColor: "#303641",
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  // Блок инпутов в модалке
  routeBlock: {
    backgroundColor: "#303641",
    borderRadius: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 10,
    marginTop: 10,
  },
  routeGraphic: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#303641",
  },
  dottedLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#424A58", // Линия между точками
    marginVertical: 4,
  },
  routeInputs: {
    flex: 1,
    paddingRight: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  inputText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    height: "100%",
  },
  routeDivider: {
    height: 1,
    backgroundColor: "#424A58",
  },

  // Теги
  tagsContainer: {
    marginTop: 20,
    maxHeight: 40,
  },
  tagBtn: {
    backgroundColor: "#303641",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },

  // Список
  listContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  listIcon: {
    marginRight: 15,
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  listItemSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  // Кнопка выбрать на карте
  chooseOnMapBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  chooseOnMapIconWrapper: {
    backgroundColor: "#303641",
    padding: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  chooseOnMapText: {
    color: "#fff",
    fontSize: 16,
  },
});
