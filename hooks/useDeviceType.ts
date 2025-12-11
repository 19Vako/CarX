import { Dimensions } from "react-native";

export function useDeviceType() {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 600;

  return { isTablet };
}
