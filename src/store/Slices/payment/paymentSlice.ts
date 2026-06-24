import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, PaymentState } from "./paymentInterfase";

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

    setSelectedPayment(
      state,
      action: PayloadAction<PaymentState["selectedPayment"]>,
    ) {
      state.selectedPayment = action.payload;
    },
  },
});

export const {
  setRideTypeModalVisible,
  setOrderModalVisible,
  setSelectedPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
