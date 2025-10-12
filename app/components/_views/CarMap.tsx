import React from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useCarXMapViewModel } from "../_viewsModels/CarMapViewModel";

export default function CarXMap() {
  const { location, loading } = useCarXMapViewModel();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
}
