import { RouteInfo } from "@/src/types/routeTypes";

export const calculateRoute = (
  result: Omit<RouteInfo, "coordinates">,
): Omit<RouteInfo, "coordinates"> => {
  const rawDistance = result.distance;
  const rawDuration = result.duration;

  return {
    distance: Math.round(rawDistance * 10) / 10,
    duration: Math.ceil(rawDuration),
  };
};
