import { auth } from "@/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { useEffect } from "react";


WebBrowser.maybeCompleteAuthSession();

export function useBottomLogInMenuService() {
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "745026637842-4kug0ba85p74saj136eq1d0vfigllprf.apps.googleusercontent.com",
    iosClientId: "745026637842-srtjnigkf7ipbkqj66qcrd7c9pml7gr1.apps.googleusercontent.com",
    androidClientId: "745026637842-4a8cep5v5unkc2l39s2gk17q49n13eas.apps.googleusercontent.com"
  })

  useEffect(() =>{
    if(response?.type === "success"){
      const { authentication } = response
      const token = authentication?.accessToken
      handleContinueWithGoogle(token!)
    }
  },[response])

  const handleContinueWithGoogle = async (token: string) => {
    try {
        const credential = GoogleAuthProvider.credential(null, token);
        
        // 1. ВЫЗОВ, КОТОРЫЙ ВОЗВРАЩАЕТ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
        const userCredential = await signInWithCredential(auth, credential);
        
        // 2. ИЗВЛЕЧЕНИЕ ОБЪЕКТА USER
        const user: User = userCredential.user; 

        return user;
    } catch (error) {
        console.error("Ошибка при входе через Google:", error);
        return null;
    }
  }
  
  return {
    promptAsync,
  };
}
