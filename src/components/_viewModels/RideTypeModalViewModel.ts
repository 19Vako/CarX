import { Images } from "@/src/constants/images";
import { setPrice } from "@/src/store/Slices/payment/paymentSlice";
import { RideType } from "@/src/types/rideTypes";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function RideTypeModalViewModel() {
  const dispatch = useDispatch();
  const RIDE_TYPES = [
    {
      id: "1",
      title: "CarX Standard",
      image: Images.carStandard,
      multiplier: 1,
      time: "10 min",
    },
    {
      id: "2",
      title: "CarX Comfort",
      image: Images.carComfort,
      multiplier: 1.5,
      time: "7 min",
    },
    {
      id: "3",
      title: "CarX VIP",
      image: Images.carVip,
      multiplier: 2.2,
      time: "5 min",
    },
  ];
  const [selectedRide, setSelectedRide] = useState<string>("1");

  const selectRideType = (item: RideType, price: number) => {
    setSelectedRide(item.id as string);
    dispatch(setPrice(price));
  };

  return {
    RIDE_TYPES,
    selectedRide,
    setSelectedRide,
    selectRideType,
  };
}
