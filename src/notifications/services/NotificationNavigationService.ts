import { Href, router } from "expo-router";
import { PushNotificationMessage } from "../../types/pushNotification.types";

export function NotificationNavigationService(
  data: PushNotificationMessage["data"],
) {
  if (!data) return;

  switch (data.type) {
    case "history":
      router.push("/History");
      break;

    case "account":
      router.push("/Account");
      break;

    default:
      if (data.screen) {
        router.push(data.screen as Href);
      }
  }
}
