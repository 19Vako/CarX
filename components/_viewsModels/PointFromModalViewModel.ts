import { useState } from "react";

export function PointFromModalViewModel() {
  const [fromInputValue, setFromInputValue] = useState(
    "Гагаріна вулиця (Верхній Бистрий)",
  );

  return {
    fromInputValue,
    setFromInputValue,
  };
}
