import { SelectedPayment } from "@/src/types/paymentTypes";
export interface PaymentState {
  rideTypeModalVisible: boolean;
  orderModalVisible: boolean;
  selectedPayment: SelectedPayment | null;
}

export const initialState: PaymentState = {
  rideTypeModalVisible: false,
  orderModalVisible: false,
  selectedPayment: null,
};
