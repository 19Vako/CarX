import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import OrderService from "../services/orderService";

const orderService = new OrderService();
const corsHandler = cors({ origin: true });

export const createOrder = onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method Not Allowed" });
    return;
  }

  corsHandler(req, res, async () => {
    const { userId, distance, price, location, status, rideType } = req.body;
    try {
      const orderId = await orderService.createOrder({
        userId,
        distance,
        price,
        location,
        status,
        rideType,
      });

      res
        .status(201)
        .json({ message: "Order created successfully", orderId: orderId });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });
});

export const cancelOrder = onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Method Not Allowed" });
    return;
  }

  corsHandler(req, res, async () => {
    const { orderId } = req.body;
    try {
      await orderService.cancelOrder(orderId);
      res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
      console.error("Error canceling order:", error);
      res.status(500).json({ error: "Failed to cancel order" });
    }
  });
});
