// HOME SCREEN — 8 UI styles ki list. Tap karo to us style ki Todo screen khulti hai.
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DESIGNS } from '../designs';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={DESIGNS}
        keyExtractor={(d) => d.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>UI Styles</Text>
            <Text style={styles.sub}>Aik hi Todo app, 8 alag designs</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          // router.push("/material") -> src/app/[style].js khulegi, style = "material"
          <Pressable
            onPress={() => router.push(`/${item.id}`)}
            style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
          >
            <View style={styles.swatch}>
              <View style={[styles.swatchHalf, { backgroundColor: item.swatch[0] }]} />
              <View style={[styles.swatchHalf, { backgroundColor: item.swatch[1] }]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                <Text style={styles.num}>{String(index + 1).padStart(2, '0')}  </Text>
                {item.name}
              </Text>
              <Text style={styles.tagline}>{item.tagline}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  header: { marginTop: 24, marginBottom: 20 },
  heading: { fontSize: 34, fontWeight: '700', color: '#111' },
  sub: { fontSize: 15, color: '#777', marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E5E5',
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDD',
  },
  swatchHalf: { flex: 1 },
  num: { color: '#AAA', fontWeight: '500' },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  tagline: { fontSize: 13, color: '#888', marginTop: 3 },
  chevron: { fontSize: 24, color: '#C4C4C4' },
});
