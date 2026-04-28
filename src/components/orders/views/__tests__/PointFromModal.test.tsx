import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { PointFromModalViewModel } from "../../viewModels/PointFromModalViewModel";
import PointFromModal from "../PointFromModal";

jest.mock("../../viewModels/PointFromModalViewModel");

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe("PointFromModal Component", () => {
  const mockOnClose = jest.fn();
  const mockSetPointFrom = jest.fn();
  const mockHandleSelectAddress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (PointFromModalViewModel as jest.Mock).mockReturnValue({
      pointFrom: "Airport",
      setPointFrom: mockSetPointFrom,
      handleSelectAddress: mockHandleSelectAddress,
    });
  });

  it("must render correctly with initial address", () => {
    const { getByDisplayValue, getByText } = render(
      <PointFromModal visible={true} onClose={mockOnClose} />,
    );

    expect(getByText("Where from?")).toBeTruthy();
    expect(getByDisplayValue("Airport")).toBeTruthy();
  });

  it("must call setPointFrom when typing in the input", () => {
    const { getByDisplayValue } = render(
      <PointFromModal visible={true} onClose={mockOnClose} />,
    );

    const input = getByDisplayValue("Airport");
    fireEvent.changeText(input, "New Home");
    expect(mockSetPointFrom).toHaveBeenCalledWith("New Home");
  });

  it("must call onClose when pressing the close button", () => {
    const { UNSAFE_getAllByType } = render(
      <PointFromModal visible={true} onClose={mockOnClose} />,
    );

    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("must call handleSelectAddress and onClose when pressing checkmark", () => {
    const { UNSAFE_getAllByType } = render(
      <PointFromModal visible={true} onClose={mockOnClose} />,
    );

    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(touchables[1]);

    expect(mockHandleSelectAddress).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("must clear input when pressing the clear button", () => {
    const { UNSAFE_getAllByType } = render(
      <PointFromModal visible={true} onClose={mockOnClose} />,
    );

    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(touchables[2]);

    expect(mockSetPointFrom).toHaveBeenCalledWith("");
  });
});
