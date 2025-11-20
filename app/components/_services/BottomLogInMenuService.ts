import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function BottomLogInMenuService() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "561248963797-ng585ieq3ael47icplmhdll0gbnl52p1.apps.googleusercontent.com",
    androidClientId:
      "561248963797-pcdcc4oskmk8i6ca0176v2heceliv55p.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google token:", authentication?.accessToken);
    }
  }, [response]);

  return {
    promptAsync,
  };
}
