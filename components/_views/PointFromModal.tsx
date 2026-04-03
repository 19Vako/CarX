import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PointFromModalViewModel } from "../_viewsModels/PointFromModalViewModel";

export default function PointFromModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { pointFrom, setPointFrom, handleSelectAddress } =
    PointFromModalViewModel();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => onClose()}
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
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => onClose()}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Where from?</Text>

            <TouchableOpacity
              style={styles.headerYellowBtn}
              onPress={() => {
                onClose();
                handleSelectAddress();
              }}
            >
              <Ionicons name="checkmark" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.singleInputContainer}>
            <View
              style={[styles.dot, { borderColor: "#4A90E2", borderWidth: 4 }]}
            />

            <TextInput
              style={styles.textInput}
              value={pointFrom}
              onChangeText={setPointFrom}
              autoFocus={true}
              selectionColor="#fff"
            />

            {pointFrom.length > 0 && (
              <TouchableOpacity
                onPress={() => setPointFrom("")}
                style={styles.clearBtn}
              >
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: { flex: 1, backgroundColor: "#222730" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerBtn: { backgroundColor: "#303641", padding: 8, borderRadius: 12 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  headerYellowBtn: { backgroundColor: "#FDE047", padding: 8, borderRadius: 12 },

  singleInputContainer: {
    backgroundColor: "#303641",
    borderRadius: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#303641",
    marginRight: 15,
  },
  textInput: { flex: 1, color: "#fff", fontSize: 16, height: "100%" },
  clearBtn: { paddingLeft: 10 },

  tagsWrapper: { marginTop: 20, marginBottom: 15, maxHeight: 40 },
  tagBtn: {
    backgroundColor: "#303641",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: { color: "#fff", fontSize: 14 },

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
  chooseOnMapText: { color: "#fff", fontSize: 16 },
});
