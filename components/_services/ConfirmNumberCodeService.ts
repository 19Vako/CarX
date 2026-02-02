import { useContinueWithPhone } from "@/hooks/useContinueWithPhone";

export function ConfirmNumberCodeService() {
  const { handleConfirmCode } = useContinueWithPhone();

  return {
    handleConfirmCode,
  };
}
