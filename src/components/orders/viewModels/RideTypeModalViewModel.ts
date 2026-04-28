import { Images } from "@/src/constants/images";
import { fetchPaymentSheetParams } from "@/src/payment/api/fetchPaymentSheetParams";
import { setRideTypeModalVisible } from "@/src/store/Slices/payment/paymentSlice";
import { RootState } from "@/src/store/store";
import { calculateStripePrice, formatDisplayPrice } from "@/src/utils/pricing";

import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";

import * as Linking from "expo-linking";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { STRIPE_CONFIG } from "../../../configs/payment/stripeConfig";

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
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { routeData } = useSelector((state: RootState) => state.location);
  const { uid, email, name } = useSelector((state: RootState) => state.user);
  const { rideTypeModalVisible } = useSelector(
    (state: RootState) => state.payment,
  );
  let distance = routeData?.distance ? routeData.distance : 0;

  const [loading, setLoading] = useState(false);
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
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

  const onClose = () => {
    dispatch(setRideTypeModalVisible(false));
  };

  const initialisePaymentSheet = useCallback(async () => {
    setLoading(true);
    try {
      const { paymentIntent, customer, ephemeralKey } =
        await fetchPaymentSheetParams(
          selectedOption!.priceInCents,
          uid!,
          name!,
          email!,
        );

      const { error } = await initPaymentSheet({
        merchantDisplayName: STRIPE_CONFIG.merchantDisplayName,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        returnURL: Linking.createURL("stripe-redirect"),

        applePay: {
          merchantCountryCode: STRIPE_CONFIG.countryCode,
        },

        googlePay: {
          merchantCountryCode: STRIPE_CONFIG.countryCode,
          testEnv: STRIPE_CONFIG.testEnv,
          currencyCode: STRIPE_CONFIG.currencyCode,
        },

        defaultBillingDetails: {
          name: name!,
          email: email!,
        },
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      } else {
        Alert.alert(`Ошибка инициализации: ${error.code}`, error.message);
      }
    } catch (e) {
      console.log("Ошибка при загрузке параметров платежа", e);
    } finally {
      setLoading(false);
    }
  }, [initPaymentSheet, selectedOption]);

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        console.log("Payment canceled");
      } else {
        Alert.alert(`Ошибка: ${error.code}`, error.message);
      }
    } else {
      setPaymentSheetEnabled(false);
      dispatch(setRideTypeModalVisible(false));
    }
  };

  useEffect(() => {
    if (rideTypeModalVisible) {
      initialisePaymentSheet();
    }
  }, [initialisePaymentSheet, rideTypeModalVisible]);

  const handlePayment = async () => {
    if (paymentSheetEnabled) {
      await openPaymentSheet();
    }
  };

  return {
    distance: distance,
    rideOptions,
    selectedRideId,
    selectedOption,
    visible: rideTypeModalVisible,
    loading,
    selectRideType,
    handlePayment,
    onClose,
  };
}
