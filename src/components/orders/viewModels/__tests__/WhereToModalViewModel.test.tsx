import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import mapReducer, {
  setPointTo,
  setPointToLocation,
} from "@/src/store/Slices/map/mapSlice";
import { WhereToModalViewModel } from "../WhereToModalViewModel";

import { getCoordsFromAddress } from "@/src/location/geocodingService";
jest.mock("@/src/location/geocodingService", () => ({
  getCoordsFromAddress: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest
    .fn()
    .mockReturnValue({ top: 40, bottom: 20, left: 0, right: 0 }),
}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      location: mapReducer,
    },
    preloadedState,
  });
};

describe("WhereToModalViewModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("must initialize with correct data", () => {
    const store = createTestStore({
      location: { pointTo: "Вокзал", cityName: "Ужгород" },
    });

    const { result } = renderHook(() => WhereToModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.pointTo).toBe("Вокзал");
  });

  it("must update pointTo when setPointTo is called", () => {
    const store = createTestStore({
      location: { pointTo: "", cityName: "Ужгород" },
    });
    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => WhereToModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.setPointTo("Аэропорт");
    });

    expect(spy).toHaveBeenCalledWith(setPointTo("Аэропорт"));
  });

  it("handleSelectDestination must not do anything if pointTo is empty", async () => {
    const store = createTestStore({
      location: { pointTo: "   ", cityName: "Ужгород" },
    });
    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => WhereToModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.handleSelectDestination();
    });

    expect(getCoordsFromAddress).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalledWith(setPointToLocation(expect.anything()));
  });

  it("handleSelectDestination must get coordinates and save them to the store", async () => {
    const mockCoords = { lat: 48.6208, lng: 22.2879 };
    (getCoordsFromAddress as jest.Mock).mockResolvedValueOnce(mockCoords);

    const store = createTestStore({
      location: { pointTo: "Киевская 10", cityName: "Мукачево" },
    });
    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => WhereToModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.handleSelectDestination();
    });

    expect(getCoordsFromAddress).toHaveBeenCalledWith(
      "Киевская 10",
      "Мукачево",
    );
    expect(spy).toHaveBeenCalledWith(setPointToLocation(mockCoords));
  });

  it("must use 'Ужгород' as the default city if cityName is not specified", async () => {
    (getCoordsFromAddress as jest.Mock).mockResolvedValueOnce({
      lat: 10,
      lng: 10,
    });

    const store = createTestStore({
      location: { pointTo: "Центр", cityName: "" },
    });

    const { result } = renderHook(() => WhereToModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.handleSelectDestination();
    });
    expect(getCoordsFromAddress).toHaveBeenCalledWith("Центр", "Ужгород");
  });
});
