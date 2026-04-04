import { RouteInfo } from "@/types/routeTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./mapInterfase";

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
      if (!state.isManualSelection) {
        state.pickupLocation = action.payload;
      }
    },
    setPointFrom: (state, action: PayloadAction<string>) => {
      state.pointFrom = action.payload;
    },
    setPointTo: (state, action: PayloadAction<string>) => {
      state.pointTo = action.payload;
    },
    setPointToLocation: (state, action) => {
      state.pointToLocation = action.payload;
    },
    setManualPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
      state.isManualSelection = true;
    },
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    resetManualSelection: (state) => {
      state.isManualSelection = false;
      state.pickupLocation = state.userLocation;
    },

    setRouteData: (
      state,
      action: PayloadAction<Omit<RouteInfo, "coordinates"> | null>,
    ) => {
      state.routeData = action.payload;
    },
  },
});

export const {
  setUserLocation,
  setPointFrom,
  setPointTo,
  setPointToLocation,
  setManualPickupLocation,
  setCityName,
  resetManualSelection,
  setRouteData,
} = mapSlice.actions;
export default mapSlice.reducer;
