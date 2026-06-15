import { RootState } from "@/src/store/store";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { saveExpoPushToken } from "../api/saveExpoPushToken";
import { NotificationPushService } from "../services/notificationPushService";
import { PushNotificationState } from "../types/push.types";

const initialState: PushNotificationState = {
  isGranted: false,
  isLoading: false,
  error: null,
};

export function PushNotificationViewModel() {
  const [state, setState] = useState<PushNotificationState>(initialState);
  const { getPermissions } = useMemo(() => NotificationPushService(), []);
  const { uid } = useSelector((state: RootState) => state.user);

  const register = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!uid) {
      return;
    }

    try {
      const result = await getPermissions();

      await saveExpoPushToken(uid!, result.token!);

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
  }, [uid]);

  return { ...state, register };
}
