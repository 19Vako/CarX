import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";

import mapReducer, {
    setManualPickupLocation,
    setPointFrom,
} from "@/src/store/Slices/map/mapSlice";
import { PointFromModalViewModel } from "../PointFromModalViewModel";

import { getCoordsFromAddress } from "@/src/location/geocodingService";
jest.mock("@/src/location/geocodingService", () => ({
  getCoordsFromAddress: jest.fn(),
}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      location: mapReducer,
    },
    preloadedState,
  });
};

describe("PointFromModalViewModel", () => {
  it("must return the correct data and dispatch the correct action", () => {
    const store = createTestStore({
      location: { cityName: "Ужгород", pointFrom: "Вокзал" },
    });

    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => PointFromModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.setPointFrom("Вокзал");
    });

    expect(result.current.pointFrom).toBe("Вокзал");
    expect(spy).toHaveBeenCalledWith(setPointFrom("Вокзал"));
  });

  it("must dispatch the correct action when handleSelectAddress is called", async () => {
    const store = createTestStore({
      location: { cityName: "Ужгород", pointFrom: "Вокзал" },
    });
    (getCoordsFromAddress as jest.Mock).mockResolvedValue({
      latitude: 48.6208,
      longitude: 22.2879,
    });

    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => PointFromModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.handleSelectAddress();
    });

    expect(getCoordsFromAddress).toHaveBeenCalledWith("Вокзал", "Ужгород");
    expect(spy).toHaveBeenCalledWith(
      setManualPickupLocation({ latitude: 48.6208, longitude: 22.2879 }),
    );
  });
});
