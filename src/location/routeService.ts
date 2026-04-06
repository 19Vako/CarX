import { RouteInfo } from "@/src/types/routeTypes";

export const calculateRoute = (result: any): Omit<RouteInfo, "coordinates"> => {
  const rawDistance = result.distance; // Гугл отдает в км
  const rawDuration = result.duration; // Гугл отдает в минутах

  return {
    // Округляем до одного знака (например, 5.2 км)
    distance: Math.round(rawDistance * 10) / 10,
    // Округляем минуты всегда в большую сторону (целые числа)
    duration: Math.ceil(rawDuration),
  };
};
