export interface PaymentState {
  rideTypeModalVisible: boolean;
  orderModalVisible: boolean;
}

export const initialState: PaymentState = {
  rideTypeModalVisible: false,
  orderModalVisible: false,
};
