import MapView from "react-native-maps";

let mapRef: MapView | null = null;

export const setMapRef = (ref: MapView | null) => {
  mapRef = ref;
};

export const animateTo = (coords: { latitude: number; longitude: number }) => {
  mapRef?.animateToRegion(
    {
      ...coords,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
    1000,
  );
};
export const fitToCoords = (
  coordsArray: { latitude: number; longitude: number }[],
) => {
  if (coordsArray.length < 2) return;

  mapRef?.fitToCoordinates(coordsArray, {
    edgePadding: { top: 50, right: 50, bottom: 300, left: 50 },
    animated: true,
  });
};
