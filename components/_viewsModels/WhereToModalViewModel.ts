import { getCoordsFromAddress } from "@/location/geocoding";
import { setPointTo, setPointToLocation } from "@/store/Slices/map/mapSlice";
import { RootState } from "@/store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export function WhereToModalViewModel() {
  const dispatch = useDispatch();
  const { pointTo, cityName } = useSelector(
    (state: RootState) => state.location,
  );
  const insets = useSafeAreaInsets();

  const handleSelectDestination = async () => {
    if (!pointTo.trim()) return;

    const currentCity = cityName || "Ужгород";
    const coords = await getCoordsFromAddress(pointTo, currentCity);

    if (coords) {
      dispatch(setPointToLocation(coords));
    }
  };

  return {
    pointTo,
    setPointTo: (text: string) => dispatch(setPointTo(text)),
    handleSelectDestination,
    insets,
  };
}
