import { useState } from "react";
import { getCoordsFromAddress } from '@/location/geocoding';
import { useDispatch, useSelector } from "react-redux";
import { setManualPickupLocation } from "@/store/Slices/map/mapSlice";
import * as MapService from '@/components/_services/MapService';
import { RootState } from "@/store/store";

export function PointFromModalViewModel() {
  const [fromInputValue, setFromInputValue] = useState("");
  
  const dispatch = useDispatch(); 
  
  // Достаем город, который определил наш глобальный сервис position.ts
  const cityName = useSelector((state: RootState) => state.location.cityName);
  console.log("Текущий город из глобального состояния:", cityName);
  
  const handleSelectAddress = async () => {
    // Используем динамический город или дефолтный, если GPS еще не сработал
    const currentCity = cityName || "Ужгород";
    
    const coords = await getCoordsFromAddress(fromInputValue, currentCity);

    if (coords) {
      dispatch(setManualPickupLocation(coords));
      MapService.animateTo(coords);
    }
  };

  return {
    fromInputValue,
    setFromInputValue,
    handleSelectAddress
  };
}