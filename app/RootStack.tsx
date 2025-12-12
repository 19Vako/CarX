import { Stack } from "expo-router";
import { useAuthSession } from "../hooks/useAuthSession";
import SplashScreen from "./(app)/SplashScreen";

export default function RootStack() {
  const { isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(app)/index" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(auth)/index" />
      </Stack.Protected>
    </Stack>
  );
}
