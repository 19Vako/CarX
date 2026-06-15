import * as Notifications from "expo-notifications";

export const NotificationTestService = {
  /**
   * 1. ТРИГГЕР ДЛЯ ОТКРЫТОГО ПРИЛОЖЕНИЯ (Foreground)
   * Срабатывает мгновенно. Тестирует показ баннера внутри приложения
   * и работу addNotificationReceivedListener.
   */
  triggerForegroundTest: async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⚡️ App is Open!",
        body: "Вы открыли пуш внутри приложения. Переходим в историю?",
        sound: true,
        data: {
          id: "dddcf",
          type: "history",
          screen: "/History",
        },
      },
      trigger: null, // null — показать мгновенно
    });
  },

  /**
   * 2. ТРИГГЕР ДЛЯ СВЕРНУТОГО ПРИЛОЖЕНИЯ (Background)
   * Дает задержку 5 секунд, чтобы ты успел свернуть приложение на домашний экран.
   */
  triggerBackgroundTest: async () => {
    console.log("Ждем 5 секунд... Сверни приложение прямо сейчас!");

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🌙 App in Background",
        body: "Приложение было свернуто. Проверим свитч на аккаунт?",
        sound: true,
        data: {
          id: "dddcfdce",
          type: "account",
          screen: "/Account",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  },

  /**
   * 3. ТРИГГЕР ДЛЯ ХОЛОДНОГО СТАРТА (App Killed / Cold Start)
   * Дает задержку 12 секунд. Тестирует логику getLastNotificationResponseAsync в хуке.
   */
  triggerColdStartTest: async () => {
    console.log(
      "Ждем 12 секунд... ПОЛНОСТЬЮ выгрузи приложение из многозадачности!",
    );

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "❄️ Cold Start Test",
        body: "Приложение было убито. Роутер должен подняться и открыть Историю.",
        sound: true,
        data: {
          id: "dddcfmklw",
          type: "history",
          screen: "/History",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 12,
      },
    });
  },
};
