import { Animated, Image, View } from 'react-native';
import { Images } from "../../constants/images";
import { RegistrationAnimatedViewModel } from '../_viewsModels/RegistrationAnimatedViewModel';


const RegistrationAnimatedView = () => {
  const { carCentral, carCentralRotate } = RegistrationAnimatedViewModel()
  return (
    <View style={{
      alignItems: "center", 
      justifyContent: "center", 
      position:"relative", 
      height: 1070,
      zIndex:1,
      width: 1200 
    }}>
      
      
      <Image 
        style={{
          flex:1,
          width: 1200
        }} 
        source={Images.cardSchema} 
      />


      <Animated.Image
        style={[
          carCentral.getLayout(),
          { position:"absolute", 
            height:20, 
            width: 35,
            transform: [{rotate:carCentralRotate}]
          }
        ]}
        source={Images.taxiCarTopView}
      />



  


    </View>
  )
}

export default RegistrationAnimatedView