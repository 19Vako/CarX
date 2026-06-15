import { LogService } from "@/src/utils/LogService";
import axios from "axios";
import { SaveExpoPushTokenError } from "../../types/pushNotification.types";

export const saveExpoPushToken = async (userId: string, token: string) => {
  try {
    await axios.post(process.env.EXPO_PUBLIC_SAVE_EXPO_PUSH_KEY_API_URL!, {
      userId,
      token,
    });
  } catch (error: any) {
    const err = error.response.data as SaveExpoPushTokenError;
    LogService.error(err.message, err.type);
  }
};
