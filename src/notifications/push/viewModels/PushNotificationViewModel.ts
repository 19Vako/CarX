import { useCallback, useState } from "react";
import { NotificationPushService } from "../services/notificationPushService";
import { PushNotificationState } from "../types/push.types";

const initialState: PushNotificationState = {
  isGranted: false,
  isLoading: false,
  error: null,
};

export const PushNotificationViewModel = () => {
  const [state, setState] = useState<PushNotificationState>(initialState);

  const register = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await NotificationPushService.register();

      setState({
        isGranted: result.isGranted,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Unable register notifications",
      }));
    }
  }, []);

  return { ...state, register };
};
