const FALLBACK_BASE_RATE = 5;

export const calculateRidePrice = (
  distance: number,
  multiplier: number,
  baseRate = FALLBACK_BASE_RATE,
): number => {
  const total = baseRate * distance * multiplier;

  return Math.round(total * 100) / 100;
};
