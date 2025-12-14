import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ConfirmNumberCodeService } from "../_services/ConfirmNumberCodeService";

export function ConfirmNumberCodeViewModel(CODE_LENGTH = 6) {
  const { handleConfirmCode } = ConfirmNumberCodeService();

  const [code, setCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<any | null>(null);

  const codeArray = code.split("");

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleCodeChange = (code: string) => {
    const confirmCode = code.slice(0, CODE_LENGTH);
    setCode(confirmCode);

    if (confirmCode.length === CODE_LENGTH) {
      handleConfirmCode(confirmCode);
      
      inputRef.current?.blur();
    }
  };

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => setIsFocused(false);

  const renderCodeCells = [...Array(CODE_LENGTH)].map((_, index) => {
    const symbol = codeArray[index];
    const isCurrentCell = index === code.length;
    const shouldHighlight = isCurrentCell && isFocused;
    return (
      <View
        key={index}
        style={[styles.cell, shouldHighlight && styles.focusCell]}
      >
        <Text style={styles.cellText}>{symbol ? symbol : ""}</Text>
      </View>
    );
  });

  return {
    code,
    inputRef,
    isFocused,
    renderCodeCells,
    codeArray,
    CODE_LENGTH,

    handlePress,
    handleCodeChange,
    handleInputFocus,
    handleInputBlur,
  };
}

const styles = StyleSheet.create({
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
  cell: {
    width: 35,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "gray",
    marginHorizontal: 2,
  },
  cellText: {
    fontSize: 24,
    color: "white",
  },
  focusCell: {
    borderColor: "yellow",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
