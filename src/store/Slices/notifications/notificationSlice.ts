import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, NotificationItem } from "./notificationInterface";

const notificatioSlice = createSlice({
  name: "notificatioSlice",
  initialState: initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationItem>) {
      const notification = action.payload;

      const exists = state.notifications.find((n) => n.id === notification.id);

      if (exists) return;

      state.notifications.unshift(notification);

      state.lastNotificationId = notification.id;

      state.unreadCount += 1;
    },

    markAsRead(state, action: PayloadAction<string>) {
      const id = action.payload;
      const notification = state.notifications.find((n) => n.id === id);

      if (!notification) return;
      if (notification.read) return;

      notification.read = true;

      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
  },
});

export const { addNotification, markAsRead } = notificatioSlice.actions;
export default notificatioSlice.reducer;
