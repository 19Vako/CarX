import { RouteInfo } from "@/types/routeTypes";

export interface MapState {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  pickupLocation: { latitude: number; longitude: number } | null;
  cityName: string | null;
  isManualSelection: boolean;
  pointFrom: string;
  pointTo: string;
  pointToLocation: { latitude: number; longitude: number } | null;
  routeData: Omit<RouteInfo, "coordinates"> | null;
}

export const initialState: MapState = {
  userLocation: null,
  pickupLocation: null,
  cityName: null,
  isManualSelection: false,
  pointFrom: "",
  pointTo: "",
  pointToLocation: null,
  routeData: null,
};
