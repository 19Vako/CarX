import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../configs/reactotron/ReactotronConfig";
import location from "./Slices/map/mapSlice";
import notification from "./Slices/notifications/notificationSlice";
import payment from "./Slices/payment/paymentSlice";
import userReducer from "./Slices/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: location,
    payment: payment,
    notification: notification,
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
