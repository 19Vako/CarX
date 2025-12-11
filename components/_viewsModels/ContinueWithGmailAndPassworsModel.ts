import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function ContinueWithGmailAndPassworsModel() {
  const { keyBoardVisible } = useKeyboardVisibility();
  const heightAnimation = useRef(new Animated.Value(300)).current;
  const positionButton = useRef(new Animated.Value(140)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heightAnimation, {
        toValue: keyBoardVisible ? 585 : 400,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(positionButton, {
        toValue: !keyBoardVisible ? 140 : 15,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [keyBoardVisible]);

  return {
    heightAnimation,
    positionButton,
  };
}
