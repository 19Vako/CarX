import { apiClient } from "./apiClient";

export const fetchPaymentSheetParams = async (
  price: number,
  uid: string,
  name: string,
  email: string,
) => {
  try {
    const { data } = await apiClient.post("/paymentSheet", {
      currency: "usd",
      amount: price,
      firebaseUID: uid,
      email: email,
      name: name,
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
