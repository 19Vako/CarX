import { PushNotificationMessage } from "@/src/types/pushNotification.types";

export interface NotificationsState {
  lastNotificationId: string | null;
  unreadCount: number;
  notifications: PushNotificationMessage[];
}

export const initialState: NotificationsState = {
  lastNotificationId: "",
  unreadCount: 0,
  notifications: [],
};
