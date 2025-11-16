import React from "react";
import { View } from "react-native";

/* let MapView:any, Marker:any;

const isWeb = (Platform.OS as any) === "web";

if (!isWeb) {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
} */

export default function CarXMap() {
  /*  const { location, loading } = useCarXMapViewModel();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (isWeb) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <ActivityIndicator size="small" color="#666" />
        </View>
      </View>
    ); 
  }*/

  return (
    <View style={{ flex: 1 }}>
     {/*  {!isWeb && (
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation
        initialRegion={{
          latitude: location?.latitude || 50.4501,
          longitude: location?.longitude || 30.4,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      )
    } */}
    </View>
  );

}
