import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export default class UserRepository {
  async addOrderToUser({
    userId,
    orderId,
  }: {
    userId: string;
    orderId: string;
  }): Promise<void> {
    admin
      .firestore()
      .collection("users")
      .doc(userId)
      .set({ orders: FieldValue.arrayUnion(orderId) });
  }
}
