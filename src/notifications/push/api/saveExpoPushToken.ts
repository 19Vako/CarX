import axios from "axios";

export const saveExpoPushToken = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SAVE_EXPO_PUSH_KEY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
