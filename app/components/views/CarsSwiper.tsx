import { Images } from '@/app/constants/images'
import React from 'react'
import { Image, View } from 'react-native'
import normalize from 'react-native-normalize'
import Swiper from 'react-native-swiper'

const CarsSwiper = () => {
  return (
    <Swiper style={{top:normalize(100), height:normalize(400), backgroundColor:"gray", }} showsPagination={false}>
        <View style={{height: normalize(400), justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
            <Image style={{height:normalize(350), width:normalize(350)}} source={Images.taxiCar}/>
        </View>
        <View style={{height: normalize(400), justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
            njkwsdnkcdjnsdskj
        </View>
        <View style={{height: normalize(400), justifyContent: "center", alignItems: "center", backgroundColor: "yellow" }}>
            cnkdjsjncdkcdns
        </View>
    </Swiper>
  )
}

export default CarsSwiper