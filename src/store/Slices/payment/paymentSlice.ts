import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./paymentInterfase";

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setRideTypeModalVisible(state, action: PayloadAction<boolean>) {
      state.rideTypeModalVisible = action.payload;
    },
  },
});

export const { setRideTypeModalVisible } = paymentSlice.actions;
export default paymentSlice.reducer;
