import { Images } from "@/src/constants/images";

import {
  setOrderModalVisible,
  setRideTypeModalVisible,
  setSelectedPayment,
} from "@/src/store/Slices/payment/paymentSlice";
import { RootState } from "@/src/store/store";
import { calculateStripePrice, formatDisplayPrice } from "@/src/utils/pricing";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BASE_RIDE_TYPES = [
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

export function RideTypeModalViewModel() {
  const dispatch = useDispatch();
  const { routeData } = useSelector((state: RootState) => state.location);
  const { rideTypeModalVisible } = useSelector(
    (state: RootState) => state.payment,
  );
  let distance = routeData?.distance ? routeData.distance : 0;
  const [selectedRideId, setSelectedRideId] = useState<string>("1");

  const { rideOptions, selectedOption } = useMemo(() => {
    const options = BASE_RIDE_TYPES.map((ride) => {
      const priceInCents = calculateStripePrice(distance, ride.multiplier);
      return {
        ...ride,
        priceInCents,
        displayPrice: formatDisplayPrice(priceInCents),
      };
    });
    const selected = options.find((r) => r.id === selectedRideId) || options[0];
    return { rideOptions: options, selectedOption: selected };
  }, [distance, selectedRideId]);

  const selectRideType = (id: string) => {
    setSelectedRideId(id);
  };

  useEffect(() => {
    dispatch(setSelectedPayment(selectedOption));
  }, [selectedOption]);

  const onClose = () => {
    dispatch(setRideTypeModalVisible(false));
  };

  const handleRideType = () => {
    dispatch(setOrderModalVisible(true));
  };

  return {
    distance: distance,
    rideOptions,
    selectedRideId,
    selectedOption,
    visible: rideTypeModalVisible,
    selectRideType,
    onClose,
    handleRideType,
  };
}
