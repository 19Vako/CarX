import { auth } from "@/firebaseConfig";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, signInWithCredential } from "firebase/auth";


export async function useContinueWithApple () {
   try {
    const { identityToken } = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ]
   })

    if (!identityToken) {
      console.log('Пользователь отменил или не завершил вход через Apple.');
      return;
    }

    const appleCredential = OAuthProvider.credentialFromJSON({idToken:identityToken, rawNonce:null})
    await signInWithCredential(auth, appleCredential)

   }
   catch (err) {
    console.log(err)
   }
}