import { useContinueWithGmailAndPasswors } from "@/src/auth/useContinueWithGmailAndPasswors";

export function ContinueWithGmailAndPassworsService() {
  const { signIn } = useContinueWithGmailAndPasswors();

  return {
    signIn,
  };
}
