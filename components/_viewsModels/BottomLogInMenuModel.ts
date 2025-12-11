import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { BottomLogInMenuService } from "../_services/BottomLogInMenuService";

export function BottomLogInMenuModel() {
  const { handleContinueWithGoogle, ContinueWithApple, handleContinueWithFacebook } = BottomLogInMenuService();
  const { keyBoardVisible } = useKeyboardVisibility();

  

  const heightAnimation = useRef(new Animated.Value(300)).current;
  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: keyBoardVisible ? 555 : 400,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [keyBoardVisible]);

  return {
    heightAnimation,
    handleContinueWithGoogle, 
    ContinueWithApple, 
    handleContinueWithFacebook
  };
}
