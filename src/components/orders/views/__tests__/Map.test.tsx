import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Map from "../Map";

import { MapViewModel } from "../../viewModels/MapViewModel";
jest.mock("../../viewModels/MapViewModel");

jest.mock("../../services/MapService", () => ({
  setMapRef: jest.fn(),
}));

jest.mock("react-native-maps", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require("react-native");

  class MockMapView extends React.Component {
    render() {
      // @ts-ignore
      return <View testID="map-view">{this.props.children}</View>;
    }
  }

  class MockMarker extends React.Component {
    render() {
      return <View testID="map-marker" />;
    }
  }

  class MockPolyline extends React.Component {
    render() {
      return <View testID="map-polyline" />;
    }
  }

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    Polyline: MockPolyline,
    PROVIDER_GOOGLE: "google",
  };
});

describe("Map Component", () => {
  const mockHandleMapLongPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must show the loading screen if the location has not been received", () => {
    (MapViewModel as jest.Mock).mockReturnValue({
      location: null,
    });

    const { getByText } = render(<Map />);
    expect(getByText("Getting location...")).toBeTruthy();
  });

  it("must render the map when the location is available", () => {
    (MapViewModel as jest.Mock).mockReturnValue({
      location: { latitude: 48.62, longitude: 22.28 },
      mapRef: { current: null },
      pickupLocation: null,
      pointToLocation: null,
      routeCoords: [],
      handleMapLongPress: mockHandleMapLongPress,
    });

    const { getByTestId } = render(<Map />);
    expect(getByTestId("map-view")).toBeTruthy();
  });

  it("must render markers and route line", () => {
    (MapViewModel as jest.Mock).mockReturnValue({
      location: { latitude: 48.62, longitude: 22.28 },
      mapRef: { current: null },
      pickupLocation: { latitude: 48.62, longitude: 22.28 },
      pointToLocation: { latitude: 48.63, longitude: 22.29 },
      routeCoords: [
        { latitude: 48.62, longitude: 22.28 },
        { latitude: 48.63, longitude: 22.29 },
      ],
      handleMapLongPress: mockHandleMapLongPress,
    });

    const { getAllByTestId, getByTestId } = render(<Map />);

    expect(getAllByTestId("map-marker").length).toBe(2);

    expect(getByTestId("map-polyline")).toBeTruthy();
  });

  it("must call handleMapLongPress when long-pressing the map", () => {
    (MapViewModel as jest.Mock).mockReturnValue({
      location: { latitude: 48.62, longitude: 22.28 },
      mapRef: { current: null },
      pickupLocation: null,
      pointToLocation: null,
      routeCoords: [],
      handleMapLongPress: mockHandleMapLongPress,
    });

    const { getByTestId } = render(<Map />);
    const mapView = getByTestId("map-view");

    fireEvent(mapView, "onLongPress", {
      nativeEvent: {
        coordinate: { latitude: 48.65, longitude: 22.3 },
      },
    });

    expect(mockHandleMapLongPress).toHaveBeenCalledWith({
      latitude: 48.65,
      longitude: 22.3,
    });
  });
});
