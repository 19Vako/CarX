import * as Location from "expo-location";
import { LocationModel } from "../_models/CarMapModel";

export const requestLocation = async (): Promise<LocationModel | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return null;
  }

  const pos = await Location.getCurrentPositionAsync({});
  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
  };
};


