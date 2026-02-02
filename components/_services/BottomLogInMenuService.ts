import { useContinueWithFacebook } from "@/hooks/useContinueWithFacebook";
import { useContinueWithGoogle } from "@/hooks/useContinueWithGoogle";
import { useContinueWithPhone } from "@/hooks/useContinueWithPhone";

export function BottomLogInMenuService() {
  const { handleContinueWithGoogle } = useContinueWithGoogle();
  const { handleContinueWithFacebook } = useContinueWithFacebook();
  const { handleSendCode, isVisible } = useContinueWithPhone();

  const ContinueWithApple = () => {};

  return {
    ContinueWithApple,
    handleContinueWithGoogle,
    handleContinueWithFacebook,
    handleSendCode,
    isVisible,
  };
}
