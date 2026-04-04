import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export function BottomWayMenuViewModel() {
  const { pointFrom, pointTo } = useSelector(
    (state: RootState) => state.location,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [fromModalVisible, setFromModalVisible] = useState(false);

  return {
    modalVisible,
    setModalVisible,
    pointTo,
    pointFrom,
    fromModalVisible,
    setFromModalVisible,
  };
}
