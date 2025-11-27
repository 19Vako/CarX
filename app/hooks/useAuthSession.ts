import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logInUser, logOutUser } from "../store/Slices/user/userSlice";

export function useAuthSession() {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                dispatch(logInUser({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL,
                }))
                setIsAuthenticated(true);
            } else {
                dispatch(logOutUser())
                setIsAuthenticated(false);
            }
        });
        
        return () => unsubscribe();
    }, [])

    return {
        isAuthenticated
    }
}