import { Stack } from "expo-router";
import { useAuthSession } from "../src/auth/useAuthSession";
import SplashScreen from "./(app)/SplashScreen";

function RootStack() {
  const { isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/index" />
      </Stack.Protected>
    </Stack>
  );
}

export default RootStack;
