import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./paymentInterfase";

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setRideTypeModalVisible(state, action: PayloadAction<boolean>) {
      state.rideTypeModalVisible = action.payload;
    },

    setOrderModalVisible(state, action: PayloadAction<boolean>) {
      state.orderModalVisible = action.payload;
      if (state.rideTypeModalVisible) {
        state.rideTypeModalVisible = false;
      }
    },
  },
});

export const { setRideTypeModalVisible, setOrderModalVisible } =
  paymentSlice.actions;
export default paymentSlice.reducer;
