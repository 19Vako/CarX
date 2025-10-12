import { Animated, View } from "react-native";
import { SplashViewModel } from "../viewsmodel/SplashScreenModel";

const SplashScreen = () => {
  const { carAnimation, logoAnimation, pointPosition } = SplashViewModel();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
      }}
    >
      <View
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          width: "auto",
        }}
      >
        <Animated.Image
          source={require("../../../assets/images/car.png")}
          style={[
            carAnimation.getLayout(),
            {
              top: 10,
              width: 260,
              height: 222,
            },
          ]}
        />

        <Animated.Image
          source={require("../../../assets/images/point.png")}
          style={[
            pointPosition.getLayout(),
            {
              position: "absolute",
              left: -17,
              height: 60,
              width: 60,
            },
          ]}
        />

        <Animated.Text
          style={[
            {
              position: "absolute",

              fontFamily: "Roboto-Medium",
              fontSize: logoAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              }),
              opacity: logoAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          CarX
        </Animated.Text>
      </View>
    </View>
  );
};

export default SplashScreen;
