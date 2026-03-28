import MapView from "react-native-maps";

let mapRef: MapView | null = null;

export const setMapRef = (ref: MapView | null) => { mapRef = ref; };

export const animateTo = (coords: { latitude: number, longitude: number }) => {
  mapRef?.animateToRegion({
    ...coords,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }, 1000);
};