import { Button } from '@react-navigation/elements'
import React from 'react'
import { Text, TextInput, View } from 'react-native'
import normalize from 'react-native-normalize'

export default function BottomWayMenu() {

  return (
    <View style={{position:"absolute", display:"flex", flexDirection:"column", alignItems:"center", zIndex:2, bottom:normalize(0), backgroundColor:"#637483", height:normalize(250), width:"100%"}}>

      <TextInput placeholder='where are you?' placeholderTextColor="#637483" style={{backgroundColor:"#424d57", color:"white", borderRadius:normalize(10), height:normalize(60), width:normalize(330)}}/>
      <Button style={{borderRadius:normalize(10), backgroundColor:"yellow", height:normalize(60), width:normalize(330)}}><Text style={{color:"#424d57"}}>turn on GPS</Text></Button>
      <TextInput placeholder='where are we going?' placeholderTextColor="#637483" style={{backgroundColor:"#424d57", color:"white", borderRadius:normalize(10), height:normalize(60), width:normalize(330)}}/>
     
    </View>
  )
}
