// ROOT LAYOUT — Expo Router: src/app/ ki har file aik screen hai.
// Stack = screens aik ke upar aik khulti hain (back karne par wapis).
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Header hum khud har design mein banate hain, is liye native header band */}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
