import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";

import mapReducer from "@/src/store/Slices/map/mapSlice";
import paymentReducer, {
  setRideTypeModalVisible,
} from "@/src/store/Slices/payment/paymentSlice";
import { BottomWayMenuViewModel } from "../BottomWayMenuViewModel";

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      payment: paymentReducer,
      location: mapReducer,
    },
    preloadedState,
  });
};

describe("BottomWayMenuViewModel", () => {
  it("Given pointTo, should fetch data and trigger modal visible", () => {
    const store = createTestStore({
      location: {
        pointTo: { lat: 100, lng: 20 },
        pointFrom: { lat: 10, lng: 20 },
      },
      payment: {
        rideTypeModalVisible: false,
      },
    });

    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => BottomWayMenuViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.pointTo).toEqual({ lat: 100, lng: 20 });
    expect(result.current.pointFrom).toEqual({ lat: 10, lng: 20 });

    expect(spy).toHaveBeenCalledWith(setRideTypeModalVisible(true));
    expect(store.getState().payment.rideTypeModalVisible).toBe(true);
  });
});
