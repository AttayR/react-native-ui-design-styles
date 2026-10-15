// ROOT LAYOUT: with Expo Router, every file in src/app/ is a screen.
// Stack navigation: screens push on top of each other and pop on back.
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Each design draws its own header, so the native header is hidden */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
