import { useEffect, useState } from "react";
import { LocationModel } from "../_models/CarMapModel";
import { requestLocation } from "../_services/CarMapService";

export function useCarXMapViewModel() {
  const [location, setLocation] = useState<LocationModel | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    setLoading(true);
    const loc = await requestLocation();
    setLocation(loc);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    location,
    loading,
    fetchLocation,
  };
}
