import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { setMapRef } from "../_services/MapService";
import { MapViewModel } from "../_viewsModels/MapViewModel";

export default function Map() {
  const {
    mapRef,
    location,
    pickupLocation,
    pointToLocation,
    handleMapDoublePress,
  } = MapViewModel();

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>{"Определяем местоположение..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          mapRef.current = ref;
          setMapRef(ref);
        }}
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        onDoublePress={(e) => {
          const coords = e.nativeEvent.coordinate;
          handleMapDoublePress(coords);
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {pickupLocation && (
          <Marker
            coordinate={{
              latitude: pickupLocation.latitude,
              longitude: pickupLocation.longitude,
            }}
            title="Точка посадки"
          />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
