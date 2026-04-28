import { setRideTypeModalVisible } from "@/src/store/Slices/payment/paymentSlice";
import { RootState } from "@/src/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function BottomWayMenuViewModel() {
  const dispatch = useDispatch();
  const { pointFrom, pointTo } = useSelector(
    (state: RootState) => state.location,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [fromModalVisible, setFromModalVisible] = useState(false);

  useEffect(() => {
    if (pointTo) {
      dispatch(setRideTypeModalVisible(true));
    }
  }, [pointTo]);

  return {
    modalVisible,
    setModalVisible,
    pointTo,
    pointFrom,
    fromModalVisible,
    setFromModalVisible,
  };
}
