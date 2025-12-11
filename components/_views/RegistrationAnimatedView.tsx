import { Animated, Image, View } from "react-native";

import normalize from "react-native-normalize";
import { Images } from "../../constants/images";
import { RegistrationAnimatedViewModel } from "../_viewsModels/RegistrationAnimatedViewModel";

const RegistrationAnimatedView = () => {
  const { carCentral, carCentralRotate } = RegistrationAnimatedViewModel();
  return (
    <View
      style={{
        alignItems: "center",
        position: "relative",
        flex: 1,
      }}
    >
      <Image
        style={{
          height: normalize(608),
          width: normalize(600),
          resizeMode: "contain",
        }}
        source={Images.cardSchema}
      />

      <Animated.Image
        style={[
          carCentral.getLayout(),
          {
            position: "absolute",
            height: normalize(15),
            width: normalize(30),
            transform: [{ rotate: carCentralRotate }],
          },
        ]}
        source={Images.taxiCarTopView}
      />
    </View>
  );
};

export default RegistrationAnimatedView;
