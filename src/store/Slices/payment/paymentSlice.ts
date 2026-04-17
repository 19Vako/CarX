import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./paymentInterfase";

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

export const { setPrice } = paymentSlice.actions;
export default paymentSlice.reducer;
