export interface MapState {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  pickupLocation: { latitude: number; longitude: number } | null;
  cityName: string | null;
  isManualSelection: boolean;
  currentAddress: string | null;
}

export const initialState: MapState = {
  userLocation: null,
  pickupLocation:null,
  cityName:null,
  isManualSelection: false,
  currentAddress: null,
};
