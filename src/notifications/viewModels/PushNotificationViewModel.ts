import { addNotification } from "@/src/store/Slices/notifications/notificationSlice";
import { RootState } from "@/src/store/store";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PushNotificationMessage,
  PushNotificationState,
} from "../../types/pushNotification.types";
import { saveExpoPushToken } from "../api/saveExpoPushToken";
import { NotificationPushService } from "../services/notificationPushService";

const initialState: PushNotificationState = {
  isGranted: false,
  isLoading: false,
  error: null,
};

export function PushNotificationViewModel() {
  const [state, setState] = useState<PushNotificationState>(initialState);
  const { getPermissions } = useMemo(() => NotificationPushService(), []);
  const dispatch = useDispatch();
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

  const handleMessage = (message: PushNotificationMessage) => {
    dispatch(addNotification(message));
  };

  return { ...state, register, handleMessage };
}
