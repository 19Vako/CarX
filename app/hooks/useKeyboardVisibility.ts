import { useEffect, useState } from "react";
import { Keyboard } from "react-native";


export function useKeyboardVisibility() {
  const [keyBoardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardVisible(false),
    );

  
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return {
    keyBoardVisible,
  };
}