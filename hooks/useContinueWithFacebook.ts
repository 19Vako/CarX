import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export function useContinueWithFacebook() {

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID!,
      scopes: ["public_profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({path: "auth", })
    },
    {
      authorizationEndpoint: process.env.EXPO_PUBLIC_FACEBOOK_ENDPOINT,
    },
  );

  const handleContinueWithFacebook = async () => {
    try {
      const result = await promptAsync();

      if (result.type !== "success") {
        console.log("Facebook login failed or was cancelled:", result.type);
        return null;
      }

      const facebookAccessToken = result.params.access_token;

      if (!facebookAccessToken) {
        console.error("Facebook Access Token not found in response.");
        return null;
      }

      const facebookCredential = FacebookAuthProvider.credential(facebookAccessToken);

      const auth = getAuth();

      await signInWithCredential(auth, facebookCredential);

    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    handleContinueWithFacebook,
  };
}
