import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";

import mapReducer, {
  setPointTo,
  setPointToLocation,
  setRouteData,
} from "@/src/store/Slices/map/mapSlice";
import { MapViewModel } from "../MapViewModel";

import * as Location from "expo-location";
jest.mock("expo-location", () => ({
  reverseGeocodeAsync: jest.fn(),
}));

import * as MapService from "../../services/MapService";
jest.mock("../../services/MapService", () => ({
  fitToCoords: jest.fn(),
  animateTo: jest.fn(),
  fetchRoute: jest.fn(),
}));

import { calculateRoute } from "@/src/location/routeService";
jest.mock("@/src/location/routeService", () => ({
  calculateRoute: jest.fn(),
}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      location: mapReducer,
    },
    preloadedState,
  });
};

describe("MapViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must focus the camera on pickupLocation if pointToLocation is not specified", () => {
    const store = createTestStore({
      location: {
        pickupLocation: { lat: 10, lng: 20 },
        pointToLocation: null,
      },
    });

    renderHook(() => MapViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(MapService.animateTo).toHaveBeenCalledWith({ lat: 10, lng: 20 });
    expect(MapService.fitToCoords).not.toHaveBeenCalled();
  });

  it(" must focus the camera on both points if they are both specified", () => {
    const store = createTestStore({
      location: {
        pickupLocation: { lat: 10, lng: 20 },
        pointToLocation: { lat: 30, lng: 40 },
      },
    });

    renderHook(() => MapViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(MapService.fitToCoords).toHaveBeenCalledWith([
      { lat: 10, lng: 20 },
      { lat: 30, lng: 40 },
    ]);
  });

  it("handleRouteReady must calculate route and dispatch setRouteData", () => {
    const store = createTestStore({ location: {} });
    const spy = jest.spyOn(store, "dispatch");

    (calculateRoute as jest.Mock).mockReturnValue({
      distance: 5.5,
      duration: 12,
    });

    const { result } = renderHook(() => MapViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.handleRouteReady({ distance: 5500, duration: 720 });
    });

    expect(calculateRoute).toHaveBeenCalledWith({
      distance: 5500,
      duration: 720,
    });
    expect(spy).toHaveBeenCalledWith(
      setRouteData({ distance: 5.5, duration: 12 }),
    );
  });

  it("handleMapLongPress must calculate route and dispatch setRouteData", async () => {
    const mockRouteInfo = {
      coordinates: [
        { lat: 1, lng: 1 },
        { lat: 2, lng: 2 },
      ],
      distance: 1000,
      duration: 500,
    };

    (MapService.fetchRoute as jest.Mock).mockResolvedValue(mockRouteInfo);

    (calculateRoute as jest.Mock).mockReturnValue({ distance: 1, duration: 8 });

    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      { street: "Собранецкая", name: "10", city: "Ужгород" },
    ]);

    const store = createTestStore({
      location: {
        userLocation: { lat: 48.62, lng: 22.28 },
        isManualSelection: false,
      },
    });
    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => MapViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const targetCoords = { lat: 48.63, lng: 22.29 };

    await act(async () => {
      await result.current.handleMapLongPress(targetCoords as any);
    });

    expect(spy).toHaveBeenCalledWith(setPointToLocation(targetCoords));

    expect(MapService.fetchRoute).toHaveBeenCalledWith(
      { lat: 48.62, lng: 22.28 },
      targetCoords,
    );

    expect(result.current.routeCoords).toEqual(mockRouteInfo.coordinates);

    expect(Location.reverseGeocodeAsync).toHaveBeenCalledWith(targetCoords);
    expect(spy).toHaveBeenCalledWith(setPointTo("Собранецкая 10"));
  });
});
