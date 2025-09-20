import CarsSwiper from '@/app/components/views/CarsSwiper'
import React from 'react'
import { View } from 'react-native'


const Cars = () => {
  return (
    <View style={{flex:1, backgroundColor:"#21262c"}}>
      <CarsSwiper/>
    </View>
  )
}

export default Cars