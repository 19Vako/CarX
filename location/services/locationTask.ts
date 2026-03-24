import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    // Логируем ошибку, например в Sentry
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];

    if (location) {
      // Прямая отправка на сервер или сохранение в локальный стор (Redux/Zustand)
      // В режиме такси здесь обычно идет POST запрос на бэкенд с координатами
      console.log(
        "Новые координаты (фон):",
        location.coords.latitude,
        location.coords.longitude,
      );
    }
  }
});
