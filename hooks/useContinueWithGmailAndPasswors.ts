import { auth } from "@/firebaseConfig";
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
      console.log("Пользователь создан:", user.uid);
      return user;
    } catch (error: any) {
      console.error("Ошибка регистрации:", error.message);
      throw error;
    }
  };

  return {
    signIn,
  };
}
