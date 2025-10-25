import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import normalize from "react-native-normalize";

export function RegistrationAnimatedViewModel() {
  const carCentral = useRef(
    new Animated.ValueXY({ x: normalize(-40), y: normalize(340) }),
  ).current;
  const carCentralRotateVal = useRef(new Animated.Value(155)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carCentral, {
          toValue: { x: normalize(160), y: normalize(240) },
          duration: 10000,
          useNativeDriver: false,
        }),

        Animated.timing(carCentralRotateVal, {
          toValue: 245,
          duration: 1800,
          useNativeDriver: false,
        }),

        Animated.timing(carCentral, {
          toValue: { x: normalize(210), y: normalize(342) },
          duration: 5000,
          useNativeDriver: false,
        }),

        Animated.timing(carCentralRotateVal, {
          toValue: 155,
          duration: 1800,
          useNativeDriver: false,
        }),

        Animated.timing(carCentral, {
          toValue: { x: normalize(355), y: normalize(275) },
          duration: 5000,
          useNativeDriver: false,
        }),

        Animated.timing(carCentralRotateVal, {
          toValue: 245,
          duration: 1800,
          useNativeDriver: false,
        }),

        Animated.timing(carCentral, {
          toValue: { x: normalize(385), y: normalize(350) },
          duration: 1800,
          useNativeDriver: false,
        }),

        Animated.timing(carCentralRotateVal, {
          toValue: 155,
          duration: 1800,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const carCentralRotate = carCentralRotateVal.interpolate({
    inputRange: [-1, 0, 155, 170, 245, 265, 330, 360],
    outputRange: [
      "60deg",
      "90deg",
      "155deg",
      "170deg",
      "245deg",
      "265deg",
      "330deg",
      "340deg",
    ],
  });

  return {
    carCentral,
    carCentralRotate,
  };
}
