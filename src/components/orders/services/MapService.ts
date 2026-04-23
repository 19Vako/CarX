import { Coords, RouteInfo } from "@/src/types/routeTypes";
import polyline from "@mapbox/polyline";
import MapView from "react-native-maps";

let mapRef: MapView | null = null;

export const setMapRef = (ref: MapView | null) => {
  mapRef = ref;
};

export const animateTo = (coords: Coords) => {
  mapRef?.animateToRegion(
    {
      ...coords,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
    1000,
  );
};

export const fitToCoords = (coordsArray: Coords[], paddingBottom = 500) => {
  if (coordsArray.length < 2) return;

  mapRef?.fitToCoordinates(coordsArray, {
    edgePadding: {
      top: 100,
      right: 50,
      bottom: paddingBottom,
      left: 50,
    },
    animated: true,
  });
};

export const fetchRoute = async (
  origin: Coords,
  dest: Coords,
): Promise<RouteInfo | null> => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${dest.latitude},${dest.longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.routes.length > 0) {
      const route = data.routes[0];
      const points = polyline.decode(route.overview_polyline.points);

      return {
        distance: route.legs[0].distance.value / 1000,
        duration: route.legs[0].duration.value / 60,
        coordinates: points.map((p: any) => ({
          latitude: p[0],
          longitude: p[1],
        })),
      };
    }
    return null;
  } catch (error) {
    console.error("Manual Directions Error:", error);
    return null;
  }
};
