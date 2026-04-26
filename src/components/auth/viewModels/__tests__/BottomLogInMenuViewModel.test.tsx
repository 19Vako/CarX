import { act, renderHook } from "@testing-library/react-native";
import { Animated } from "react-native";
import { BottomLogInMenuViewModel } from "../BottomLogInMenuViewModel";

import { BottomLogInMenuService } from "../../services/BottomLogInMenuService";
jest.mock("../../services/BottomLogInMenuService", () => ({
  BottomLogInMenuService: jest.fn(),
}));

import { useKeyboardVisibility } from "@/src/hooks/useKeyboardVisibility";
jest.mock("@/src/hooks/useKeyboardVisibility", () => ({
  useKeyboardVisibility: jest.fn(),
}));

describe("BottomLogInMenuViewModel", () => {
  const mockHandleSendCode = jest.fn();
  const mockHandleContinueWithGoogle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (BottomLogInMenuService as jest.Mock).mockReturnValue({
      handleSendCode: mockHandleSendCode,
      handleContinueWithGoogle: mockHandleContinueWithGoogle,
      isVisible: true,
    });

    (useKeyboardVisibility as jest.Mock).mockReturnValue({
      keyBoardVisible: false,
    });

    jest.spyOn(Animated, "timing").mockReturnValue({
      start: jest.fn(),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("must initialize with default values (UA, 380)", () => {
    const { result } = renderHook(() => BottomLogInMenuViewModel());

    expect(result.current.countryTextCode).toBe("UA");
    expect(result.current.countryCode).toBe("380");
    expect(result.current.phone).toBe("");
    expect(result.current.isVisible).toBe(true);
  });

  it("must format phone number correctly when sending code", () => {
    const { result } = renderHook(() => BottomLogInMenuViewModel());

    act(() => {
      result.current.setPhone("991234567");
    });

    act(() => {
      result.current.handleSendCode_();
    });

    expect(mockHandleSendCode).toHaveBeenCalledWith("+380991234567");
  });

  it("must update country code", () => {
    const { result } = renderHook(() => BottomLogInMenuViewModel());

    act(() => {
      result.current.setCountryCode("1");
      result.current.setCountryTextCode("US");
      result.current.setPhone("5551234567");
    });

    act(() => {
      result.current.handleSendCode_();
    });

    expect(mockHandleSendCode).toHaveBeenCalledWith("+15551234567");
    expect(result.current.countryTextCode).toBe("US");
  });

  it("must animate modal height to 400 if keyboard is closed", () => {
    renderHook(() => BottomLogInMenuViewModel());

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({
        toValue: 400,
        duration: 300,
        useNativeDriver: false,
      }),
    );
  });

  it("must animate modal height to 555 if keyboard is open", () => {
    (useKeyboardVisibility as jest.Mock).mockReturnValue({
      keyBoardVisible: true,
    });

    renderHook(() => BottomLogInMenuViewModel());

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({
        toValue: 555,
        duration: 300,
        useNativeDriver: false,
      }),
    );
  });
});
