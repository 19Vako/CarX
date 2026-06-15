import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { setupNotifications } from "../config/setupNotifications";
import { NotificationNavigationService } from "../services/NotificationNavigationService";
import { PushNotificationViewModel } from "../viewModels/PushNotificationViewModel";

export const usePushNotifications = ({
  isAuthenticated,
  isLoading,
}: {
  isAuthenticated: boolean;
  isLoading: boolean;
}) => {
  const { register, error, isGranted } = PushNotificationViewModel();

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      register();
    }
  }, [register, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;

    const response = Notifications.getLastNotificationResponse();
    if (!response) return;

    NotificationNavigationService(response.notification.request.content.data);
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const receivedListener = Notifications.addNotificationReceivedListener(
      () => {},
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        NotificationNavigationService(
          response.notification.request.content.data,
        );
      });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, [isAuthenticated]);

  return { error, isGranted };
};
