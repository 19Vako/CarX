import { auth } from "@/src/configs/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { ProfileLogOutButtonViewModel } from "../ProfileLogOutButton";

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("@/src/configs/firebase/firebaseConfig", () => ({
  auth: { currentUser: { uid: "test-uid" } },
}));

describe("ProfileLogOutButtonViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("Happy Path: must call signOut with correct auth config", async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);
    const { logOut } = ProfileLogOutButtonViewModel();

    await logOut();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("Edge Case: must log error to console when signOut fails", async () => {
    const mockError = new Error("Network Error");
    (signOut as jest.Mock).mockRejectedValue(mockError);
    const { logOut } = ProfileLogOutButtonViewModel();

    await logOut();

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
