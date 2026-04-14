import { useCallback } from "react";

import { initPaymentSheet, presentPaymentSheet } from "../actions/functions";

import type {
  InitPaymentSheetResult,
  PaymentSheet,
  PresentPaymentSheetResult,
} from "@/src/types/paymentTypes";

export function useStripe() {
  // Инициализация шторки (Технический минимум №2)
  const _initPaymentSheet = useCallback(
    async (
      params: PaymentSheet.SetupParams,
    ): Promise<InitPaymentSheetResult> => {
      return initPaymentSheet(params);
    },
    [],
  );

  // Показ шторки (Технический минимум №3)
  const _presentPaymentSheet = useCallback(
    async (
      options?: PaymentSheet.PresentOptions,
    ): Promise<PresentPaymentSheetResult> => {
      return presentPaymentSheet(options);
    },
    [],
  );

  return {
    presentPaymentSheet: _presentPaymentSheet,
    initPaymentSheet: _initPaymentSheet,
  };
}
