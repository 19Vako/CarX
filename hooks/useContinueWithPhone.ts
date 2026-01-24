import {
  ConfirmationResult,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";

export function useContinueWithPhone() {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isConfirmCodeLoading, setIsConfirmCodeLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSendCode = async (number: string) => {
    console.log(number)
    try {
      const response = await signInWithPhoneNumber(getAuth(), number);
      setConfirmationResult(response);
      setIsVisible(true);
      console.log(response);
    } catch (err) {
      console.error(err);
      setConfirmationResult(null);
      return null;
    }
  };

  const handleConfirmCode = async (code: string) => {
    if (!confirmationResult) {
      console.error("You shoud to get SMS");
      return null;
    }
    setIsConfirmCodeLoading(true);
    try {
      await confirmationResult.confirm(code);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConfirmCodeLoading(false);
    }
  };

  return {
    handleSendCode,
    handleConfirmCode,
    isConfirmCodeLoading,
    isVisible,
  };
}
