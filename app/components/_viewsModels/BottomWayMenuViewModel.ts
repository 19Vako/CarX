import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function BottomWayMenuViewModel() {
  const [keyBoardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );

    return (showSub.remove(), hideSub.remove());
  }, []);

  return {
    keyBoardVisible,
  };
}
