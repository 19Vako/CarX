import { auth } from "@/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export function useContinueWithGoogle() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  const handleContinueWithGoogle = async () => {
    try {
      const response = await promptAsync();

      if (response?.type !== "success") {
        console.log("Google login failed or was cancelled:", response.type);
        return null;
      }

      const token = response.authentication?.accessToken;

      const credential = GoogleAuthProvider.credential(null, token);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    handleContinueWithGoogle,
  };
}
