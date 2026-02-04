import { LogService } from "@/utils/LogService";
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
    try {
      const response = await signInWithPhoneNumber(getAuth(), number);
      setConfirmationResult(response);
      setIsVisible(true);
    } catch (err) {
      LogService.error(err, "phone_auth", {
        stage: "send_code",
        err: "send code error",
      });
      setConfirmationResult(null);
    }
  };

  const handleConfirmCode = async (code: string) => {
    if (!confirmationResult) {
      LogService.warn("You shoud to get SMS", "phone_auth", {
        stage: "confirm_code",
        err: "No confirmation result",
      });
      return;
    }
    setIsConfirmCodeLoading(true);
    try {
      await confirmationResult.confirm(code);
    } catch (err) {
      LogService.error(err, "phone_auth", {
        stage: "confirm_code",
        err: "confirmation result error",
      });
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
