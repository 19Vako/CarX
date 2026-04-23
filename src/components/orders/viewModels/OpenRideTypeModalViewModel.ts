import { setRideTypeModalVisible } from "@/src/store/Slices/payment/paymentSlice";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";

export function OpenRideTypeModalViewModel() {
  const { rideTypeModalVisible } = useSelector(
    (state: RootState) => state.payment,
  );
  const { pointTo } = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(setRideTypeModalVisible(true));
  };

  return {
    onPress,
    rideTypeModalVisible,
    pointTo,
  };
}
