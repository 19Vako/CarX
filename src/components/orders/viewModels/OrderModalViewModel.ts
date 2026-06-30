import { setOrderModalVisible } from "@/src/store/Slices/payment/paymentSlice";
import { RootState } from "@/src/store/store";
import { LogService } from "@/src/utils/LogService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePaymentService } from "../services/PaymentService";

export function OrderModalViewModel() {
  const dispatch = useDispatch();
  const { openPaymentSheet, initialisePaymentSheet } = usePaymentService();
  const { uid, email, name } = useSelector((state: RootState) => state.user);
  const { orderModalVisible, selectedPayment } = useSelector(
    (state: RootState) => state.payment,
  );
  const [loading, setLoading] = useState(false);

  const initPayment = async () => {
    setLoading(true);
    try {
      await initialisePaymentSheet({
        priceInCents: selectedPayment?.priceInCents,
        uid,
        name,
        email,
      });
    } catch (err) {
      LogService.error(err, "init payment");
    } finally {
      setLoading(false);
    }
  };

  const showPaymentSheet = async () => {
    try {
      await openPaymentSheet();
      dispatch(setOrderModalVisible(false));
    } catch (err) {
      LogService.error(err, "open payment sheet");
    }
  };

  useEffect(() => {
    if (orderModalVisible) {
      initPayment();
    }
  }, [orderModalVisible]);

  return {
    loading,
    showPaymentSheet,
    selectedPayment,
  };
}
