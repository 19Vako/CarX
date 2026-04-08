import { RootState } from "@/src/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function BottomWayMenuViewModel() {
  const { pointFrom, pointTo, routeData } = useSelector(
    (state: RootState) => state.location,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [rideTypeModalVisible, setRideTypeModalVisible] = useState(false);

  useEffect(() => {
    if (pointTo) {
      setRideTypeModalVisible(true);
    }
  }, [pointTo]);

  return {
    modalVisible,
    setModalVisible,
    pointTo,
    pointFrom,
    distance: routeData?.distance,
    fromModalVisible,
    setFromModalVisible,
    rideTypeModalVisible,
    setRideTypeModalVisible,
  };
}
