import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function BottomLogInMenuService() {
  

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "792891989585-m0u67b2adp537k35i8hrtkkbcqud5bvl.apps.googleusercontent.com",
    iosClientId: "792891989585-4ctetr4bq29skcl08fo814thvkd34vu5.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication)
    }
  }, [response]);


  return{
    promptAsync
  }
}
