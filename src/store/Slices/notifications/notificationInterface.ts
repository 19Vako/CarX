import { PushNotificationMessage } from "@/src/notifications";

export type NotificationItem = PushNotificationMessage & {
  id: string;
  read: boolean;
  createdAt: number;
};

export interface NotificationsState {
  lastNotificationId: string | null;
  unreadCount: number;
  notifications: NotificationItem[];
}

export const initialState: NotificationsState = {
  lastNotificationId: "",
  unreadCount: 0,
  notifications: [],
};
