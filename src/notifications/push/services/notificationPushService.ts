import Constants from "expo-constants";
import * as Notification from "expo-notifications";
import { Platform } from "react-native";
import { saveExpoPushToken } from "../api/saveExpoPushToken";

export class NotificationPushService {
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
    let currentStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notification.requestPermissionsAsync();
      currentStatus = status;
    }

    if (currentStatus !== "granted") {
      return { isGranted: false };
    }

    const { data: token } = await Notification.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });

    let mockId = "qv7RjX2AOPNdZsljDaBz";

    await saveExpoPushToken.post("/savePushToken", { mockId, token });

    return { isGranted: currentStatus === "granted" };
  }
}
