import BottomWayMenu from '@/app/components/_views/BottomWayMenu';
import CarXMap from '@/app/components/_views/CarMap';
import React from 'react';
import { View } from 'react-native';


const HomeScreen = () => {
  return (
      <View style={{flex:1, backgroundColor:"gray"}}>
        <CarXMap/>
        <BottomWayMenu/>
      </View>
  )
}

export default HomeScreen