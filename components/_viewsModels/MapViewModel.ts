import { calculateRoute } from "@/location/routeService";
import {
  setPointTo,
  setPointToLocation,
  setRouteData,
} from "@/store/Slices/map/mapSlice";
import { RootState } from "@/store/store";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as MapService from "../_services/MapService";

export function MapViewModel() {
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);

  const { userLocation, pickupLocation, pointToLocation } = useSelector(
    (state: RootState) => state.location,
  );

  useEffect(() => {
    if (pickupLocation && pointToLocation) {
      MapService.fitToCoords([pickupLocation, pointToLocation]);
    } else if (pickupLocation) {
      MapService.animateTo(pickupLocation);
    }
  }, [pickupLocation, pointToLocation]);

  const handleMapLongPress = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    dispatch(setPointToLocation(coords));
    try {
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

  const handleRouteReady = (result: any) => {
    // 1. Прогоняем через твой новый сервис
    const routeInfo = calculateRoute(result);

    // 2. Сохраняем в Redux чистые данные
    dispatch(
      setRouteData({
        distance: routeInfo.distance,
        duration: routeInfo.duration,
      }),
    );
  };

  return {
    mapRef,
    location: userLocation,
    pickupLocation,
    pointToLocation,
    handleMapLongPress,
    handleRouteReady,
  };
}
