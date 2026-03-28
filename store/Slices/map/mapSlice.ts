import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, MapState } from "./mapInterfase";

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
    setCurrentAddress: (state, action: PayloadAction<string>) => {
      state.currentAddress = action.payload;
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
    }
  },
});

export const { setUserLocation, setCurrentAddress, setManualPickupLocation, setCityName, resetManualSelection } = mapSlice.actions;
export default mapSlice.reducer;