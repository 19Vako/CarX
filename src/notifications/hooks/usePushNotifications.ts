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
  const { register, error, isGranted, handleMessage } =
    PushNotificationViewModel();

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    register();
  }, [register, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;

    const response = Notifications.getLastNotificationResponse();
    if (!response) return;

    NotificationNavigationService(
      response.notification.request.content.data as any,
    );
    handleMessage(response.notification.request.content as any);
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const receivedListener = Notifications.addNotificationReceivedListener(
      (response) => {
        handleMessage(response.request.content as any);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleMessage(response.notification.request.content as any);
        NotificationNavigationService(
          response.notification.request.content.data as any,
        );
      });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, [isAuthenticated]);

  return { error, isGranted };
};
