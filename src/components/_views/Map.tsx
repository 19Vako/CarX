import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { setMapRef } from "../_services/MapService";
import { MapViewModel } from "../_viewModels/MapViewModel";

export default function Map() {
  const {
    mapRef,
    location,
    pickupLocation,
    pointToLocation,
    handleMapLongPress,

    routeCoords,
  } = MapViewModel();

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>{"Getting location..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          if (ref) {
            mapRef.current = ref;
            setMapRef(ref);
          }
        }}
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          handleMapLongPress({ latitude, longitude });
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#4A90E2"
            strokeWidth={4}
            lineJoin="round"
          />
        )}

        {pickupLocation && (
          <Marker coordinate={pickupLocation} title="Точка посадки" />
        )}

        {pointToLocation && (
          <Marker
            coordinate={pointToLocation}
            title="Точка назначения"
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { width: "100%", height: "100%" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
