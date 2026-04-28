import { act, renderHook } from "@testing-library/react-native";
import { ConfirmNumberCodeViewModel } from "../ConfirmNumberCodeViewModel";

import { ConfirmNumberCodeService } from "../../services/ConfirmNumberCodeService";
jest.mock("../../services/ConfirmNumberCodeService", () => ({
  ConfirmNumberCodeService: jest.fn(),
}));

describe("ConfirmNumberCodeViewModel", () => {
  const mockHandleConfirmCode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (ConfirmNumberCodeService as jest.Mock).mockReturnValue({
      handleConfirmCode: mockHandleConfirmCode,
    });
  });

  it("must initialize with default values (empty code and correct length)", () => {
    const { result } = renderHook(() => ConfirmNumberCodeViewModel(6));

    expect(result.current.code).toBe("");
    expect(result.current.CODE_LENGTH).toBe(6);
    expect(result.current.isFocused).toBe(false);
  });

  it("must update code and call service when fully filled", () => {
    const { result } = renderHook(() => ConfirmNumberCodeViewModel(6));

    const mockBlur = jest.fn();
    result.current.inputRef.current = { blur: mockBlur };

    act(() => {
      result.current.handleCodeChange("123456");
    });

    expect(result.current.code).toBe("123456");

    expect(mockHandleConfirmCode).toHaveBeenCalledWith("123456");

    expect(mockBlur).toHaveBeenCalled();
  });

  it("must not call service if code is shorter than CODE_LENGTH", () => {
    const { result } = renderHook(() => ConfirmNumberCodeViewModel(6));

    act(() => {
      result.current.handleCodeChange("123");
    });

    expect(result.current.code).toBe("123");
    expect(mockHandleConfirmCode).not.toHaveBeenCalled();
  });

  it("must trim input text to CODE_LENGTH", () => {
    const { result } = renderHook(() => ConfirmNumberCodeViewModel(4));

    act(() => {
      result.current.handleCodeChange("12345678");
    });

    expect(result.current.code).toBe("1234");
    expect(mockHandleConfirmCode).toHaveBeenCalledWith("1234");
  });

  it("must correctly change focus state", () => {
    const { result } = renderHook(() => ConfirmNumberCodeViewModel());

    act(() => {
      result.current.handleInputFocus();
    });
    expect(result.current.isFocused).toBe(true);

    act(() => {
      result.current.handleInputBlur();
    });
    expect(result.current.isFocused).toBe(false);
  });

  it("must return correct number of code cells", () => {
    const length = 6;
    const { result } = renderHook(() => ConfirmNumberCodeViewModel(length));

    expect(result.current.renderCodeCells.length).toBe(length);
  });
});
