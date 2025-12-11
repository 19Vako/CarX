import { useContinueWithFacebook } from "@/hooks/useContinueWithFacebook";
import { useContinueWithGoogle } from "@/hooks/useContinueWithGoogle";

export function BottomLogInMenuService() {
  const { handleContinueWithGoogle } = useContinueWithGoogle();
  const { handleContinueWithFacebook } = useContinueWithFacebook()


  const ContinueWithApple = () => {
    
  };




  return {
    ContinueWithApple,
    handleContinueWithGoogle,
    handleContinueWithFacebook
  };
}
