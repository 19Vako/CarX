import { Animated, View } from 'react-native';
import normalize from 'react-native-normalize';
import { SplashViewModel } from "../viewsmodel/SplashScreenModel";

const SplashScreen = () => {
 
  const { carAnimation, logoAnimation, pointPosition, } = SplashViewModel();

  return (
    <View style={{flex:1, flexDirection:"column", backgroundColor: "yellow", justifyContent:"center", alignItems:"center"}}>
      <Animated.Image 
        source={require("../../../assets/images/car.png")}
        style={[
          carAnimation.getLayout(), 
          {position:"absolute", 
           top:normalize(400),  
           width:normalize(250), 
           height:normalize(150)
          }
        ]}
      />

      <Animated.Image 
        style={[
          pointPosition.getLayout(),
          {position:"absolute", 
           left:normalize(40),
           width:normalize(65),
           height:normalize(63),
          },
        ]}  
        source={require("../../../assets/images/point.png")} 
      />

    
      <Animated.Text
        style={{
            position:"absolute", 
            top:normalize(300), 
            fontWeight:"700",
            fontSize: logoAnimation.interpolate({
              inputRange: [0, 150],
              outputRange: [0, 150],
            }),
            opacity: logoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
       }}
      >
        CarX
      </Animated.Text>
      
    </View>
  )
}

export default SplashScreen