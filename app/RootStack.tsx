import { Stack } from "expo-router";
import SplashScreen from "./(app)/SplashScreen";
import { useAuthSession } from "./hooks/useAuthSession";

export default function RootStack() {
  const { isLoading, isAuthenticated } = useAuthSession();

   if(isLoading) {
      return <SplashScreen/>
   }
  
   return (
      <Stack screenOptions={{headerShown:false}}>
         
         <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(app)/index" />
         </Stack.Protected>

         <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(auth)/index" />
         </Stack.Protected> 

      </Stack>
   )
  
}