import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { CountryCode } from "react-native-country-picker-modal";
import { BottomLogInMenuService } from "../_services/BottomLogInMenuService";

export function BottomLogInMenuViewModel() {
  const { handleContinueWithGoogle, handleSendCode, isVisible } =
    BottomLogInMenuService();

  const [countryTextCode, setCountryTextCode] = useState<CountryCode>("UA");
  const [countryCode, setCountryCode] = useState("380");
  const [phone, setPhone] = useState("");

  const handleSendCode_ = () => {
    handleSendCode(`+${countryCode}${phone}`);
  };

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
    handleSendCode_,
    phone,
    setPhone,
    isVisible,
    countryTextCode,
    setCountryTextCode,
    countryCode,
    setCountryCode,
  };
}
