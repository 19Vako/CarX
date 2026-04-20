import type {
  InitPaymentSheetResult,
  PaymentSheet,
  PresentPaymentSheetResult,
} from "@/src/types/paymentTypes";
import { NativeModules } from "react-native";

const { StripeSdk } = NativeModules;

if (!StripeSdk) {
  console.error(
    "Stripe SDK native module is not installed. Make sure you've rebuilt your native app.",
  );
}

export const initPaymentSheet = async (
  params: PaymentSheet.SetupParams,
): Promise<InitPaymentSheetResult> => {
  return await StripeSdk.initPaymentSheet(params);
};
export const presentPaymentSheet = async (
  options: PaymentSheet.PresentOptions = {},
): Promise<PresentPaymentSheetResult> => {
  return await StripeSdk.presentPaymentSheet(options);
};
