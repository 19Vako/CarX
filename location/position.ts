import * as Location from "expo-location";
import store from "@/store/store"; 
import { setUserLocation, setCityName } from "@/store/Slices/map/mapSlice";

export const initGlobalLocationTracking = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 3000,  
        distanceInterval: 5,
      },
      async (location) => {
        const { latitude, longitude } = location.coords;
        store.dispatch(setUserLocation({ latitude, longitude }));

        const state = store.getState();
        if (!state.location.cityName) {
          const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
          
          if (reverse[0]?.city) {
            store.dispatch(setCityName(reverse[0].city));
          }
        }
      }
      
    );
  } catch (e) {
    console.error("Global tracking error:", e);
  }
};