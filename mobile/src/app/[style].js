// DYNAMIC ROUTE — /minimalist, /material, /neumorphism ... sab yahi file handle karti hai.
// URL ka hissa ([style]) useLocalSearchParams se milta hai.
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { DESIGNS } from '../designs';
import { useTodos } from '../hooks/useTodos';

export default function StyleScreen() {
  const { style } = useLocalSearchParams();
  const todo = useTodos();
  const design = DESIGNS.find((d) => d.id === style);

  if (!design) return <Text style={{ marginTop: 100, textAlign: 'center' }}>Design nahi mila</Text>;

  const Screen = design.Component;
  return <Screen {...todo} name={design.name} tagline={design.tagline} onBack={() => router.back()} />;
}
