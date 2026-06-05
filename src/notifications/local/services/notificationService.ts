import * as Notification from "expo-notifications";
import { Platform } from "react-native";
import { NotificationPayload } from "../types/Notification.types";

export class NotificationService {
  static async register() {
    if (Platform.OS === "android") {
      await Notification.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } = await Notification.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notification.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === "granted";
  }

  static async schedule(payload: NotificationPayload) {
    await Notification.scheduleNotificationAsync({
      content: {
        title: payload.title,
        body: payload.body,
        data: { screen: payload.screen },
      },
      trigger: payload.seconds
        ? {
            type: Notification.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: payload.seconds,
          }
        : null,
    });
  }

  static async scheduleFeedbackReminder() {
    return this.schedule({
      title: "CarX",
      body: "dont forget to leave your feedback!",
      screen: "/(app)/Account",
      seconds: 60,
    });
  }

  static async cancelFeedbackReminder() {
    await Notification.cancelAllScheduledNotificationsAsync();
  }
}
