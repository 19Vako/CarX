import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../configs/ReactotronConfig";
import location from "./Slices/map/mapSlice";
import payment from "./Slices/payment/paymentSlice";
import userReducer from "./Slices/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: location,
    payment: payment,
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
