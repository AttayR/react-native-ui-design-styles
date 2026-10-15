// DYNAMIC ROUTE: /minimalist, /material, /neumorphism ... are all handled by this file.
// The [style] URL segment comes from useLocalSearchParams.
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { DESIGNS } from '../designs';
import { useTodos } from '../hooks/useTodos';

export default function StyleScreen() {
  const { style } = useLocalSearchParams();
  const todo = useTodos();
  const design = DESIGNS.find((d) => d.id === style);

  if (!design) return <Text style={{ marginTop: 100, textAlign: 'center' }}>Design not found</Text>;

  const Screen = design.Component;
  return <Screen {...todo} name={design.name} tagline={design.tagline} onBack={() => router.back()} />;
}
