const FALLBACK_BASE_RATE = 5;

export const calculateStripePrice = (
  distance: number,
  multiplier: number,
  baseRate = FALLBACK_BASE_RATE,
): number => {
  const safeDistance = distance <= 0 ? 1 : distance;
  const total = baseRate * safeDistance * multiplier;

  return Math.round(total * 100);
};

export const formatDisplayPrice = (priceInCents: number): string => {
  return (priceInCents / 100).toFixed(2);
};
