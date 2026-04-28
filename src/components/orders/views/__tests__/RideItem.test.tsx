import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import RideItem from "../RideItem";

const mockRide = {
  displayPrice: "10.00",
  id: "1",
  title: "Ride to Airport",
  image: null,
  time: "10 min",
};

describe("RideItem component", () => {
  it("RiderItem View", () => {
    const { getByText } = render(
      <RideItem item={mockRide} isSelected={false} onSelect={jest.fn()} />,
    );

    expect(getByText("Ride to Airport")).toBeTruthy();
    expect(getByText("10 min")).toBeTruthy();
    expect(getByText("$10.00")).toBeTruthy();
  });

  it("RiderItem onPress", () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <RideItem item={mockRide} isSelected={false} onSelect={onSelectMock} />,
    );

    fireEvent.press(getByText("Ride to Airport"));
    expect(onSelectMock).toHaveBeenCalled();
  });
});
