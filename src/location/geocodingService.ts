import * as Location from "expo-location";

export const getCoordsFromAddress = async (address: string, city: string) => {
  try {
    
    const fullAddress = `${city}, ${address}`;
    const result = await Location.geocodeAsync(fullAddress);

    if (result.length > 0) {
      const { latitude, longitude } = result[0];
      return { latitude, longitude };
    }
    return null;
    
  } catch (e) {
    console.error("Geocoding error:", e);
    return null;
  }
};