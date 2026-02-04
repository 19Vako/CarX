import { auth } from "@/configs/firebaseConfig";
import { LogService } from "@/utils/LogService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  offlineAccess: true,
});

export function useContinueWithGoogle() {
  const handleContinueWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        LogService.error(
          "No ID token returned from Google Sign-In",
          "Google_Auth",
          {
            stage: "handleContinueWithGoogle",
          },
        );
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } catch (err) {
      LogService.error(err, "Google_Auth", {
        stage: "handleContinueWithGoogle",
        err: `${err}`,
      });
    }
  };

  return {
    handleContinueWithGoogle,
  };
}
