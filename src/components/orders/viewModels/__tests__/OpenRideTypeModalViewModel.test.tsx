import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import mapReducer from "@/src/store/Slices/map/mapSlice";
import paymentReducer, {
    setRideTypeModalVisible,
} from "@/src/store/Slices/payment/paymentSlice";
import { OpenRideTypeModalViewModel } from "../OpenRideTypeModalViewModel";

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      payment: paymentReducer,
      location: mapReducer,
    },
    preloadedState,
  });
};

describe("OpenRideTypeModalViewModel", () => {
  it("должен возвращать корректные данные из обоих слайсов", () => {
    const store = createTestStore({
      payment: { rideTypeModalVisible: false },
      location: { pointTo: "Ужгород, ул. Собранецкая" },
    });

    const { result } = renderHook(() => OpenRideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.rideTypeModalVisible).toBe(false);
    expect(result.current.pointTo).toBe("Ужгород, ул. Собранецкая");
  });

  it("должен диспатчить setRideTypeModalVisible(true) при вызове onPress", () => {
    const store = createTestStore({
      payment: { rideTypeModalVisible: false },
    });

    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => OpenRideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.onPress();
    });

    expect(spy).toHaveBeenCalledWith(setRideTypeModalVisible(true));

    expect(store.getState().payment.rideTypeModalVisible).toBe(true);
  });
});
