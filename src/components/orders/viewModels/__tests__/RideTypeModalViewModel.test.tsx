import mapReducer from "@/src/store/Slices/map/mapSlice";
import paymentReducer, {
  setRideTypeModalVisible,
} from "@/src/store/Slices/payment/paymentSlice";
import userReducer from "@/src/store/Slices/user/userSlice";

import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { RideTypeModalViewModel } from "../RideTypeModalViewModel";

// 1. Мокаем Stripe
const mockInitPaymentSheet = jest.fn();
const mockPresentPaymentSheet = jest.fn();
jest.mock("@stripe/stripe-react-native", () => ({
  useStripe: () => ({
    initPaymentSheet: mockInitPaymentSheet,
    presentPaymentSheet: mockPresentPaymentSheet,
  }),
  PaymentSheetError: { Canceled: "Canceled" },
}));

// 2. Мокаем API запрос
import { fetchPaymentSheetParams } from "@/src/payment/api/fetchPaymentSheetParams";
jest.mock("@/src/payment/api/fetchPaymentSheetParams", () => ({
  fetchPaymentSheetParams: jest.fn(),
}));

// 3. Мокаем Linking
jest.mock("expo-linking", () => ({
  createURL: jest.fn(() => "exp://test-url"),
}));

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      payment: paymentReducer,
      location: mapReducer,
      user: userReducer,
    },
    preloadedState,
  });
};

describe("RideTypeModalViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must calculate prices based on distance", () => {
    const store = createTestStore({
      location: { routeData: { distance: 10 } },
      payment: { rideTypeModalVisible: false },
    });

    const { result } = renderHook(() => RideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.rideOptions[0].priceInCents).toBeGreaterThan(0);
    expect(result.current.selectedRideId).toBe("1");
  });

  it("must initialize Stripe when the modal is opened", async () => {
    const store = createTestStore({
      user: { uid: "123", email: "test@test.com", name: "Sergii" },
      location: { routeData: { distance: 5 } },
      payment: { rideTypeModalVisible: true },
    });

    (fetchPaymentSheetParams as jest.Mock).mockResolvedValue({
      paymentIntent: "pi_test",
      customer: "cus_test",
      ephemeralKey: "ek_test",
    });

    mockInitPaymentSheet.mockResolvedValue({ error: null });

    const { result } = renderHook(() => RideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {});

    expect(fetchPaymentSheetParams).toHaveBeenCalledWith(
      result.current.selectedOption!.priceInCents,
      "123",
      "Sergii",
      "test@test.com",
    );
    expect(mockInitPaymentSheet).toHaveBeenCalledWith(
      expect.objectContaining({
        paymentIntentClientSecret: "pi_test",
        customerId: "cus_test",
        customerEphemeralKeySecret: "ek_test",
      }),
    );
  });

  it("must present payment sheet when called", async () => {
    const store = createTestStore({
      user: { uid: "123", name: "S", email: "e" },
      payment: { rideTypeModalVisible: true },
    });

    (fetchPaymentSheetParams as jest.Mock).mockResolvedValue({
      paymentIntent: "pi",
    });
    mockInitPaymentSheet.mockResolvedValue({ error: null });
    mockPresentPaymentSheet.mockResolvedValue({ error: null });

    const spy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => RideTypeModalViewModel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {});

    await act(async () => {
      await result.current.handlePayment();
    });

    expect(mockPresentPaymentSheet).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(setRideTypeModalVisible(false));
  });
});
