import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import normalize from "react-native-normalize";

export function SplashViewModel() {
  const navigation = useNavigation<any>();
    const carAnimation = useRef(new Animated.ValueXY({x: 0, y: 0})).current
    const logoAnimation = useRef(new Animated.Value(0)).current
    const pointVision = useRef(new Animated.Value(0)).current
    const pointPosition = useRef(new Animated.ValueXY({x: 0, y:normalize(-100)})).current
  
    useEffect(() => {
        Animated.sequence([
          Animated.timing(carAnimation, {
            toValue:{x:normalize(-50), y:0},
            duration: 500,
            useNativeDriver:false,
          }),
    
          Animated.timing(carAnimation, {
            toValue:{x:normalize(500), y:0},
            duration: 500,
            useNativeDriver:false,
          }),
    
          Animated.timing(logoAnimation, {
            toValue:normalize(150),
            duration: 300,
            useNativeDriver:false,
          }),

          Animated.timing(pointPosition, {
            toValue: {x:0, y:normalize(365)},
            duration: 300,
            useNativeDriver:false,
          }),


        ]).start(() => {
          setTimeout(() => {
            navigation.replace("Drawer");
          }, 600);
        })
      },[])

      return {
         carAnimation,
         logoAnimation,
         pointPosition,
         pointVision
      }
}