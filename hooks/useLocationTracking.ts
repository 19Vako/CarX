import { LOCATION_TASK_NAME } from "@/location/services/locationTask";
import * as Location from "expo-location";
import { useState } from "react";

export const useLocationTracking = () => {
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    // 1. Проверка разрешений в активном режиме
    const { status: foreStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foreStatus !== "granted") return;

    // 2. Проверка разрешений в фоновом режиме
    const { status: backStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backStatus !== "granted") return;

    // 3. Запуск фоновой задачи
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // каждые 5 секунд
      distanceInterval: 10, // или каждые 10 метров
      deferredUpdatesInterval: 1000,
      foregroundService: {
        notificationTitle: "Вы на линии",
        notificationBody: "Идет поиск заказов в вашем районе",
      },
    });

    setIsTracking(true);
  };

  const stopTracking = async () => {
    const hasStarted =
      await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      setIsTracking(false);
    }
  };

  return { isTracking, startTracking, stopTracking };
};
