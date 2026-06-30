import OrderRepository from "../repositories/ordersRepository";
import UserRepository from "../repositories/userRepository";
import { AddOrderArgs } from "../types";

export default class OrderService {
  private orderRepository = new OrderRepository();
  private userRepository = new UserRepository();

  async createOrder({
    userId,
    distance,
    price,
    location,
    status,
    rideType,
  }: AddOrderArgs) {
    if (
      !userId ||
      !distance ||
      !price ||
      !location.latitude ||
      !location.longitude ||
      !status ||
      !rideType
    ) {
      throw Error("Missing required fields");
    }

    const orderId = await this.orderRepository.addOrder({
      userId,
      distance,
      price,
      location,
      status,
      rideType,
    });

    await this.userRepository.addOrderToUser({
      orderId,
      userId,
    });

    return orderId;
  }

  async cancelOrder({ orderId }: { orderId: string }) {
    if (!orderId) {
      throw Error("Missing required fields");
    }

    const order = await this.orderRepository.getById(orderId);
    if (!order) {
      throw new Error(`Order", ${orderId}`);
    }

    if (order.status === "completed") {
      throw new Error("Cannot cancel completed order");
    }
    await this.orderRepository.cancelOrder({ orderId });
  }
}
