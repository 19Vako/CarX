import { deviceType } from '@/app/hooks/deviceType';
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function RegistrationAnimatedViewModel() {

    const { isTablet } = deviceType()
    const carCentral = useRef(new Animated.ValueXY({x:100, y:235 })).current
    const carCentralRotateVal = useRef(new Animated.Value(155)).current


    useEffect(() => {
        Animated.loop(
          Animated.sequence(  
           [
            Animated.timing(carCentral, {
               toValue:{x: 475, y: 6},
               duration:10000,
               useNativeDriver: false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:245,
               duration:1800, 
               useNativeDriver: false,
            }),
            Animated.timing(carCentral, {
               toValue:{x: 550, y: 150},
               duration:2100,
               useNativeDriver: false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:265,
               duration:800, 
               useNativeDriver: false,
            }),
            Animated.timing(carCentral, {
               toValue:{x: 549.8, y: 165},
               duration:500,
               useNativeDriver: false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:245,
               duration:1000, 
               useNativeDriver: false,
            }),
            Animated.timing(carCentral, {
               toValue:{x: 600, y: 255},
               duration:1800,
               useNativeDriver: false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:360,
               duration:1800,
               useNativeDriver: false
            }),
            Animated.timing(carCentral, {
               toValue:{x:490, y:290},
               duration: 2000,
               useNativeDriver:false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:330,
               duration:1800,
               useNativeDriver: false
            }),
            Animated.timing(carCentral, {
               toValue:{x:-1, y:535},
               duration: 6000,
               useNativeDriver:false,
            }),
            Animated.timing(carCentral, {
               toValue:{x:-1, y: 235},
               duration: 10000,
               useNativeDriver:false,
            }),
            Animated.timing(carCentralRotateVal, {
               toValue:155,
               duration:800,
               useNativeDriver: false
            }),    
            
           ]
        )).start();
    },
    [])

    const carCentralRotate = carCentralRotateVal.interpolate({
        inputRange: [-1, 0, 155, 170, 245, 265, 330, 360],
        outputRange: ["60deg", "90deg", "155deg", "170deg", "245deg", "265deg", "330deg", "340deg"],
    })



    return{
        carCentral,
        carCentralRotate
    }


    

}

