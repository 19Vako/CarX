import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PAYMENT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
