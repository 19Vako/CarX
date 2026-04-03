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
}

export const initialState: MapState = {
  userLocation: null,
  pickupLocation: null,
  cityName: null,
  isManualSelection: false,
  pointFrom: "",
  pointTo: "",
  pointToLocation: null,
};
