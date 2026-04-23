import { useContinueWithGoogle } from "@/src/auth/useContinueWithGoogle";
import { useContinueWithPhone } from "@/src/auth/useContinueWithPhone";

export function BottomLogInMenuService() {
  const { handleContinueWithGoogle } = useContinueWithGoogle();
  const { handleSendCode, isVisible } = useContinueWithPhone();

  return {
    handleContinueWithGoogle,
    handleSendCode,
    isVisible,
  };
}
