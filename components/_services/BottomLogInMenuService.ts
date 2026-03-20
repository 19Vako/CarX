import { useContinueWithGoogle } from "@/hooks/useContinueWithGoogle";
import { useContinueWithPhone } from "@/hooks/useContinueWithPhone";

export function BottomLogInMenuService() {
  const { handleContinueWithGoogle } = useContinueWithGoogle();
  const { handleSendCode, isVisible } = useContinueWithPhone();

  return {
    handleContinueWithGoogle,
    handleSendCode,
    isVisible,
  };
}
