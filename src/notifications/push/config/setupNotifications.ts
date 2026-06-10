import * as Notifications from "expo-notifications";

export const setupNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: false,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};
