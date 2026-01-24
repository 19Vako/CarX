import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ConfirmNumberCodeViewModel } from "../_viewsModels/ConfirmNumberCodeViewModel";

export default function ConfirmNumberCode({
  isVisible = false,
}: {
  isVisible: boolean;
}) {
  const {
    code,
    inputRef,
    CODE_LENGTH,
    renderCodeCells,
    handlePress,
    handleCodeChange,
    handleInputFocus,
    handleInputBlur,
  } = ConfirmNumberCodeViewModel();

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Введіть код підтвердження</Text>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={handlePress}
            activeOpacity={1}
          >
            <View style={styles.codeWrap}>{renderCodeCells}</View>

            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              textContentType="oneTimeCode"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#262E38",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 20,
    width: 350,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  codeWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
