import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export function SplashViewModel() {
  const navigation = useNavigation<any>();

  const carAnimation = useRef(new Animated.ValueXY({ x: -100, y: 0 })).current;
  const logoAnimation = useRef(new Animated.Value(1)).current;
  const pointPosition = useRef(new Animated.ValueXY({ x: 0, y: -1000 }),).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(carAnimation, {
        toValue: { x: -150, y: 0 },
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(carAnimation, {
        toValue: { x: wp(150), y: 0 },
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(logoAnimation, {
        toValue: 154,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(pointPosition, {
        toValue: { x: 0, y: 125 },
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace("Drawer");
      }, 600);
    });
  }, []);

  return {
    carAnimation,
    logoAnimation,
    pointPosition,
  };
}
