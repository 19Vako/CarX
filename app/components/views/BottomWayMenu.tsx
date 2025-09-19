import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import Animated from 'react-native-reanimated';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function BottomWayMenu() {

  return (
   <View>

    <Animated.View style={{position:"absolute", zIndex:2, bottom:normalize(320), right:normalize(25)} }>
      <TouchableOpacity>
        <MaterialIcons name="assistant-navigation" size={normalize(35)} color="#424d57" />
      </TouchableOpacity>
    </Animated.View>

    <Animated.View style={{position:"absolute", zIndex:2, bottom:normalize(240), right:normalize(10)} }>
      <TouchableOpacity>
        <Animated.Image style={{width:normalize(60), height:normalize(60)}} source={require("@/assets/images/car.png")}/>
      </TouchableOpacity>
    </Animated.View>

    <Animated.View 
     style={{
      position:"absolute", 
      display:"flex", 
      flexDirection:"column", 
      justifyContent:"space-between", 
      alignItems:"center", 
      paddingBottom:normalize(70), 
      paddingTop:normalize(40), 
      zIndex:2, 
      bottom:normalize(0), 
      backgroundColor:"#21262c", 
      height:normalize(250), 
      width:"100%"
     }}
    >

      <TextInput placeholder='where are we going?' placeholderTextColor="#21262c" style={{padding:normalize(5), backgroundColor:"#424d57", color:"white", borderRadius:normalize(10), height:normalize(60), width:normalize(330)}}/>

      <TouchableOpacity style={{backgroundColor:"yellow", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:normalize(10), height:normalize(60), width:normalize(330)}}>
        <Text style={{color:"#21262c", fontSize:normalize(20), fontWeight:"700"}}>Go</Text>
      </TouchableOpacity>
     
    </Animated.View>
   </View>
  )
}
