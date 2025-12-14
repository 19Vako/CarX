import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { BottomLogInMenuService } from "../_services/BottomLogInMenuService";

export function BottomLogInMenuViewModel() {
  const {
    handleContinueWithGoogle,
    ContinueWithApple,
    handleContinueWithFacebook,
    handleSendCode,
    isVisible
  } = BottomLogInMenuService();
  const [phone, setPhone] = useState("");
  const handleSendCode_ = () => {
    handleSendCode(phone)
  }

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
    handleContinueWithFacebook,
    handleSendCode_,
    phone, 
    setPhone,
    isVisible
  };
}
 