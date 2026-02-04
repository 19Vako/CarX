import { auth } from "@/configs/firebaseConfig";
import { LogService } from "@/utils/LogService";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";

export function useContinueWithGmailAndPasswors() {
  const navigation = useNavigation();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      navigation.navigate("Account" as never);
      console.log("User was created:", user.uid);
      return user;
    } catch (error: any) {
      LogService.error(error, "sign_in_with_email", {
        stage: "signInWithEmailAndPassword",
        err: "sign_in_with_email_error",
      });
      throw error;
    }
  };

  return {
    signIn,
  };
}
