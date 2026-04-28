import { calculateRoute } from "@/src/location/routeService";
import {
  setPointTo,
  setPointToLocation,
  setRouteData,
} from "@/src/store/Slices/map/mapSlice";
import { RootState } from "@/src/store/store";
import { Coords, RouteInfo } from "@/src/types/routeTypes";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as MapService from "../services/MapService";

export function MapViewModel() {
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const [routeCoords, setRouteCoords] = useState<Coords[]>([]);
  const { userLocation, pickupLocation, isManualSelection, pointToLocation } =
    useSelector((state: RootState) => state.location);

  useEffect(() => {
    if (pickupLocation && pointToLocation) {
      MapService.fitToCoords([pickupLocation!, pointToLocation]);
    } else if (pickupLocation) {
      MapService.animateTo(pickupLocation);
    }
  }, [pickupLocation, pointToLocation]);

  const handleRouteReady = (result: Omit<RouteInfo, "coordinates">) => {
    const routeInfo = calculateRoute(result);
    dispatch(
      setRouteData({
        distance: routeInfo.distance,
        duration: routeInfo.duration,
      }),
    );
  };

  const handleMapLongPress = async (coords: Coords) => {
    dispatch(setPointToLocation(coords));
    try {
      let startLocation = isManualSelection ? pickupLocation : userLocation;
      const route = await MapService.fetchRoute(startLocation!, coords);
      setRouteCoords(route!.coordinates);
      handleRouteReady(route!);

      const reverse = await Location.reverseGeocodeAsync(coords);
      if (reverse[0]) {
        const address =
          `${reverse[0].street || ""} ${reverse[0].name || ""}`.trim();
        const city = reverse[0].city || "";
        dispatch(setPointTo(address || `Точка в ${city}`));
      }
    } catch (e) {
      console.error("Reverse geocoding error:", e);
    }
  };

  return {
    mapRef,
    location: userLocation,
    pickupLocation,
    pointToLocation,
    handleMapLongPress,
    handleRouteReady,
    routeCoords,
  };
}
