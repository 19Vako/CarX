import { apiClient } from "./apiClient";

export const fetchPaymentSheetParams = async () => {
  try {
    const { data } = await apiClient.post("/paymentSheet", {
      currency: "usd",
      amount: 1500,
    });

    return {
      paymentIntent: data.paymentIntent,
      customer: data.customer,
      ephemeralKey: data.ephemeralKey,
    };
  } catch (error) {
    console.error("Stripe error:", error);
    throw error;
  }
};
