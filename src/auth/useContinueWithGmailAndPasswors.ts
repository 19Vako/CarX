import { auth } from "@/src/configs/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function useContinueWithGmailAndPasswors() {
  const navigation = useNavigation();

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      return userCredential.user;
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        console.log("Аккаунт не найден или требует пароля, пробуем создать...");
        try {
          const newWorker = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password,
          );
          return newWorker.user;
        } catch (signUpError: any) {
          throw signUpError;
        }
      }
      throw error;
    }
  };

  return {
    signIn,
  };
}
