import { PushNotificationMessage } from "@/src/types/pushNotification.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./notificationInterface";

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initialState,
  reducers: {
    addNotification(state, action: PayloadAction<PushNotificationMessage>) {
      const notification = action.payload;

      const exists = state.notifications.find(
        (n) => n.data.id === notification.data.id,
      );

      if (exists) return;

      state.notifications.unshift(notification);
      state.lastNotificationId = notification.data.id;
      state.unreadCount += 1;
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
