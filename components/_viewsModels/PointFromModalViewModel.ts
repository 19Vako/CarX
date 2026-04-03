import { getCoordsFromAddress } from "@/location/geocoding";
import {
  setManualPickupLocation,
  setPointFrom,
} from "@/store/Slices/map/mapSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export function PointFromModalViewModel() {
  const dispatch = useDispatch();

  const { cityName, pointFrom } = useSelector(
    (state: RootState) => state.location,
  );

  const handleSelectAddress = async () => {
    const currentCity = cityName || "Ужгород";

    const coords = await getCoordsFromAddress(pointFrom, currentCity);

    if (coords) {
      dispatch(setManualPickupLocation(coords));
    }
  };

  return {
    pointFrom,
    setPointFrom: (value: string) => dispatch(setPointFrom(value)),
    handleSelectAddress,
  };
}
