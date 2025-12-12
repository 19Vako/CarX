import { useContinueWithGmailAndPasswors } from "@/hooks/useContinueWithGmailAndPasswors";

export function ContinueWithGmailAndPassworsService() {
  const { signIn } = useContinueWithGmailAndPasswors()

  return {
    signIn,
  };
}
