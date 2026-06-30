import { fetchPaymentSheetParams } from "@/src/payment/api/fetchPaymentSheetParams";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { STRIPE_CONFIG } from "../../../configs/payment/stripeConfig";

type InitialiseParams = {
  priceInCents: number | undefined;
  uid: string | null;
  name: string | null;
  email: string | null;
};

export function usePaymentService() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  async function initialisePaymentSheet({
    priceInCents,
    uid,
    name,
    email,
  }: InitialiseParams) {
    if (!priceInCents || !uid || !name || !email) {
      throw new Error("uid, name и email reqired!");
    }
    const { paymentIntent, customer, ephemeralKey } =
      await fetchPaymentSheetParams(priceInCents, uid, name, email);

    await initPaymentSheet({
      merchantDisplayName: STRIPE_CONFIG.merchantDisplayName,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: Linking.createURL("stripe-redirect"),
      applePay: {
        merchantCountryCode: STRIPE_CONFIG.countryCode,
      },
      googlePay: {
        merchantCountryCode: STRIPE_CONFIG.countryCode,
        testEnv: STRIPE_CONFIG.testEnv,
        currencyCode: STRIPE_CONFIG.currencyCode,
      },
      defaultBillingDetails: { name, email },
    });
  }

  async function openPaymentSheet() {
    await presentPaymentSheet();
  }

  return { initialisePaymentSheet, openPaymentSheet };
}
