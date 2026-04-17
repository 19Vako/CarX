import { fetchPaymentSheetParams } from "@/src/payment/api/fetchPaymentSheetParams";
import { RootState } from "@/src/store/store";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

export function PaymentFormViewModel() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const { price } = useSelector((state: RootState) => state.payment);

  const initialisePaymentSheet = useCallback(async () => {
    setLoading(true);
    try {
      const { paymentIntent, customer, ephemeralKey } =
        await fetchPaymentSheetParams(price);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "CarX Taxi",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      } else {
        Alert.alert(`Ошибка инициализации: ${error.code}`, error.message);
      }
    } catch (e) {
      console.log("Ошибка при загрузке параметров платежа", e);
    } finally {
      setLoading(false);
    }
  }, [initPaymentSheet]);

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        console.log("Payment canceled");
      } else {
        Alert.alert(`Ошибка: ${error.code}`, error.message);
      }
    } else {
      Alert.alert("Успех", "Оплата прошла успешно!");
      setPaymentSheetEnabled(false);
    }
  };

  useEffect(() => {
    initialisePaymentSheet();
  }, [initialisePaymentSheet]);

  return {
    openPaymentSheet,
    loading,
    paymentSheetEnabled,
  };
}
