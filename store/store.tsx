import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../configs/ReactotronConfig";
import userReducer from "./Slices/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
