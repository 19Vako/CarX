import * as Notifications from "expo-notifications";
import { Href, useRouter } from "expo-router";
import { useEffect } from "react";
import { PushNotificationViewModel } from "../viewModels/PushNotificationViewModel";

export const usePushNotifications = (autoRegister = false) => {
  const { register, error, isGranted, isLoading } = PushNotificationViewModel();
  const route = useRouter();

  useEffect(() => {
    if (autoRegister) {
      register();
    }
  }, [register, autoRegister]);

  useEffect(() => {
    const receivedListener = Notifications.addNotificationReceivedListener(
      (response) => {},
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;

        if (data && data.screen) {
          setTimeout(() => {
            route.push(data.screen as Href);
          }, 100);
        }
      });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, []);

  return { error, isGranted, isLoading };
};
