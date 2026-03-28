import { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function MapViewModel() {
  const mapRef = useRef<MapView>(null);

  const { userLocation, pickupLocation, currentAddress } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    if (pickupLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000 
      );
    }
  }, [pickupLocation]);

  return {
    mapRef,
    location:userLocation,   
    pickupLocation,
    address: currentAddress,
  };
}