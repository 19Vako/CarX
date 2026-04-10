import { auth } from "@/src/configs/firebaseConfig";
import { router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser, logOutUser } from "../store/Slices/user/userSlice";

export function useAuthSession() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        dispatch(
          logInUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
          }),
        );
        setIsAuthenticated(true);
        router.push("/(app)");
      } else {
        dispatch(logOutUser());
        setIsAuthenticated(false);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });

    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    isAuthenticated,
  };
}
