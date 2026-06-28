import * as admin from "firebase-admin";
import { AddOrderArgs } from "../types";

export default class OrderRepository {
  async addOrder({
    userId,
    distance,
    price,
    location,
    status,
    rideType,
  }: AddOrderArgs): Promise<string> {
    const orderId = await admin.firestore().collection("orders").add({
      userId,
      distance,
      price,
      location,
      status,
      rideType,
      createdAt: new Date(),
    });

    return orderId.id;
  }

  async cancelOrder({ orderId }: { orderId: string }) {
    await admin
      .firestore()
      .collection("orders")
      .doc(orderId)
      .update({ status: "canseld" });
  }

  async getById(orderId: string) {
    const orderDoc = await admin
      .firestore()
      .collection("orders")
      .doc(orderId)
      .get();

    if (!orderDoc.exists) {
      return null;
    }

    return orderDoc.data();
  }
}
