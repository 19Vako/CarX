const FALLBACK_BASE_RATE = 2;

export const calculateRidePrice = (
  distance: number,
  multiplier: number,
  baseRate = FALLBACK_BASE_RATE,
): number => {
  return baseRate * distance * multiplier;
};
