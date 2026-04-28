import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import BottomWayMenu from "../BottomWayMenu";

import { BottomWayMenuViewModel } from "../../viewModels/BottomWayMenuViewModel";
jest.mock("../../viewModels/BottomWayMenuViewModel");

jest.mock("../../views/OpenRideTypeModal", () => "OpenRideTypeModal");
jest.mock("../../views/WhereToModal", () => "WhereToModal");
jest.mock("../../views/PointFromModal", () => "PointFromModal");
jest.mock("../../views/RideTypeModal", () => "RideTypeModal");

jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: "MaterialCommunityIcons",
}));

describe("BottomWayMenu Component", () => {
  const mockSetModalVisible = jest.fn();
  const mockSetFromModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (BottomWayMenuViewModel as jest.Mock).mockReturnValue({
      modalVisible: false,
      setModalVisible: mockSetModalVisible,
      pointTo: "Ужгород, ул. Собранецкая 10",
      pointFrom: "Вокзал",
      fromModalVisible: false,
      setFromModalVisible: mockSetFromModalVisible,
    });
  });

  it("must display addresses 'From' and 'To' correctly", () => {
    const { getByText } = render(<BottomWayMenu />);

    expect(getByText("Вокзал")).toBeTruthy();
    expect(getByText("Ужгород, ул. Собранецкая 10")).toBeTruthy();
    expect(getByText("Where are you going?")).toBeTruthy();
  });

  it("must call setFromModalVisible(true) when pressing the 'From' address", () => {
    const { getByText } = render(<BottomWayMenu />);

    fireEvent.press(getByText("Вокзал"));
    expect(mockSetFromModalVisible).toHaveBeenCalledWith(true);
  });

  it("must call setModalVisible(true) when pressing 'Where are you going?'", () => {
    const { getByText } = render(<BottomWayMenu />);

    fireEvent.press(getByText("Where are you going?"));
    expect(mockSetModalVisible).toHaveBeenCalledWith(true);
  });

  it("must not display history block if pointTo is empty", () => {
    (BottomWayMenuViewModel as jest.Mock).mockReturnValue({
      modalVisible: false,
      setModalVisible: mockSetModalVisible,
      pointTo: null,
      pointFrom: "Вокзал",
      fromModalVisible: false,
      setFromModalVisible: mockSetFromModalVisible,
    });

    const { queryByText } = render(<BottomWayMenu />);

    expect(queryByText("Ужгород, ул. Собранецкая 10")).toBeNull();
  });
});
