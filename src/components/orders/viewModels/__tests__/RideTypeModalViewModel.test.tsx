import mapReducer from "@/src/store/Slices/map/mapSlice";
import paymentReducer from "@/src/store/Slices/payment/paymentSlice";
import userReducer from "@/src/store/Slices/user/userSlice";

import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { RideTypeModalViewModel } from "../RideTypeModalViewModel";

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      payment: paymentReducer,
      location: mapReducer,
      user: userReducer,
    },
    preloadedState,
  });
};

describe("RideTypeModalViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must calculate prices based on distance", () => {
    const store = createTestStore({
      location: { routeData: { distance: 10 } },
      payment: { rideTypeModalVisible: false },
    });

    const { result } = renderHook(() => RideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.rideOptions[0].priceInCents).toBeGreaterThan(0);
    expect(result.current.selectedRideId).toBe("1");
  });
});
