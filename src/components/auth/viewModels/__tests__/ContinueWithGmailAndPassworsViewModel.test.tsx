import { act, renderHook } from "@testing-library/react-native";
import { Animated } from "react-native";
import { ContinueWithGmailAndPassworsViewModel } from "../ContinueWithGmailAndPassworsViewModel";

import { ContinueWithGmailAndPassworsService } from "@/src/components/auth/services/ContinueWithGmailAndPassworsService";
jest.mock(
  "@/src/components/auth/services/ContinueWithGmailAndPassworsService",
  () => ({
    ContinueWithGmailAndPassworsService: jest.fn(),
  }),
);

import { useKeyboardVisibility } from "@/src/hooks/useKeyboardVisibility";
jest.mock("@/src/hooks/useKeyboardVisibility", () => ({
  useKeyboardVisibility: jest.fn(),
}));

describe("ContinueWithGmailAndPassworsViewModel", () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (ContinueWithGmailAndPassworsService as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
    });

    (useKeyboardVisibility as jest.Mock).mockReturnValue({
      keyBoardVisible: false,
    });

    jest.spyOn(Animated, "sequence").mockReturnValue({
      start: jest.fn(),
    } as any);
    jest.spyOn(Animated, "timing");
  });

  it("must to call signIn with correct parameters", () => {
    const { result } = renderHook(() =>
      ContinueWithGmailAndPassworsViewModel(),
    );

    act(() => {
      result.current.logIn("test@gmail.com", "password123");
    });

    expect(mockSignIn).toHaveBeenCalledWith("test@gmail.com", "password123");
  });

  it("must start sequential animation when keyboard is opened", () => {
    (useKeyboardVisibility as jest.Mock).mockReturnValue({
      keyBoardVisible: true,
    });

    renderHook(() => ContinueWithGmailAndPassworsViewModel());

    expect(Animated.sequence).toHaveBeenCalled();

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({ toValue: 585 }),
    );

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Animated.Value),
      expect.objectContaining({ toValue: 15 }),
    );
  });

  it("must return animation values in the initial state", () => {
    const { result } = renderHook(() =>
      ContinueWithGmailAndPassworsViewModel(),
    );

    expect(result.current.heightAnimation).toBeDefined();
    expect(result.current.positionButton).toBeDefined();
  });
});
