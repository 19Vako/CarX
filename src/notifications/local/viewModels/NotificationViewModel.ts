import { useEffect, useState } from "react";
import { NotificationService } from "../services/notificationService";

export function NotificationViewModel() {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    NotificationService.register().then(setIsGranted);
  }, []);

  const remindAboutFeedback = () =>
    NotificationService.scheduleFeedbackReminder();

  const cancelRemindAboutFeedback = () =>
    NotificationService.cancelFeedbackReminder();

  return { isGranted, remindAboutFeedback, cancelRemindAboutFeedback };
}
