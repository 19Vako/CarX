import { auth } from "@/src/configs/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export function ProfileLogOutButtonViewModel() {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    logOut,
  };
}
