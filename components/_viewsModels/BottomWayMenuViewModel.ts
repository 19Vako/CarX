import { useState } from "react";

export function BottomWayMenuViewModel() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pointTo, setPointTo] = useState<string>(
    "Железнодорожная станция Татаров (Тата...ная улица, 7)",
  );
  const [pointFrom, setPointFrom] = useState<string>(
    "Гагаріна вулиця (Верхній Бистрий)",
  );
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
