import { RootState } from "@/src/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export function DrawerButtonViewModel() {
  const user = useSelector((state: RootState) => state.user);
  const city = useSelector((state: RootState) => state.location.cityName || "");
  const [rating, setRating] = useState(5);

  return {
    userImage: user.photoURL || "",
    userName: user.name,
    userEmail: user.email,
    userCity: city,
    rating,
  };
}
