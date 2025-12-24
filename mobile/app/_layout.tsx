import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Root Layout - Expo Router
 * Wraps all screens with SafeAreaProvider and navigation
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upgrade"
          options={{
            presentation: "modal",
            title: "Upgrade Plan",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
