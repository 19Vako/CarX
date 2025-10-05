import { Images } from '@/app/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import Swiper from 'react-native-swiper'

const CarsSwiper = () => {
  return (
    <Swiper style={{top:normalize(100), height:normalize(400), backgroundColor:"gray", }} showsPagination={false}>

        <View style={{height: normalize(400), display:"flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "yellow" }}>
          <Text style={{fontSize:normalize(50)}}>Basic</Text>
          <Image style={{height:normalize(220), width:normalize(350)}} source={Images.taxiCar}/>
        </View>

        <View style={{height: normalize(400), display:"flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "yellow" }}>
          <Text style={{fontSize:normalize(50)}}>Midle</Text>
          <Image style={{height:normalize(180), width:normalize(350)}} source={Images.taxiMidleCar} />
        </View>

        <View style={{height: normalize(400), display:"flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "yellow" }}>
          <Text style={{fontSize:normalize(50)}}>Premium</Text>
          <Image style={{height:normalize(160), width:normalize(320)}} source={Images.taxiPremium}/>
        </View>

    </Swiper>
  )
}

export default CarsSwiper