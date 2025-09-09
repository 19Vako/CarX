import CarXMap from '@/app/components/views/CarMap'
import React from 'react'
import { View } from 'react-native'


const HomeScreen = () => {
  return (
    <View style={{flex:1, backgroundColor:"gray"}}>
      <CarXMap/>
    </View>
  )
}

export default HomeScreen