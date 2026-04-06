import { useContinueWithPhone } from "@/src/auth/useContinueWithPhone";

export function ConfirmNumberCodeService() {
  const { handleConfirmCode } = useContinueWithPhone();

  return {
    handleConfirmCode,
  };
}
