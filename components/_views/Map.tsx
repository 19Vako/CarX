import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapViewModel } from '../_viewsModels/MapViewModel';
import { setMapRef } from '../_services/MapService';

export default function Map() {
  const { mapRef, location, pickupLocation} = MapViewModel();

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>{'Определяем местоположение...'}</Text>
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
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} 
        showsUserLocation={true}      
        showsMyLocationButton={false}
        showsCompass={false}
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
            // В будущем ты заменишь это кастомным изображением:
            // image={require('@/assets/images/pickup-marker.png')} 
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});