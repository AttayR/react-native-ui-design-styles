// GLASSMORPHISM: frosted, translucent glass panels with thin white borders over a colorful background
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';

// Glass needs something colorful behind it, hence these blobs
function Background() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[styles.blob, { backgroundColor: '#8B5CF6', top: -60, left: -80, width: 300, height: 300 }]} />
      <View style={[styles.blob, { backgroundColor: '#F472B6', top: 260, right: -100, width: 320, height: 320 }]} />
      <View style={[styles.blob, { backgroundColor: '#22D3EE', bottom: -80, left: -40, width: 280, height: 280 }]} />
      {/* Blur the whole background to soften the blob edges */}
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
    </View>
  );
}

function Glass({ style, children, intensity = 40 }) {
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.glass, style]}>
      {children}
    </BlurView>
  );
}

export default function Glassmorphism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Background />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Pressable onPress={onBack}>
            <Glass style={styles.backBtn} intensity={30}>
              <Text style={styles.backText}>‹</Text>
            </Glass>
          </Pressable>
        </View>

        <View style={styles.header}>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.sub}>{tagline}</Text>
          <Text style={styles.count}>{remaining} remaining</Text>
        </View>

        <Glass style={styles.inputGlass}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Add a task..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="done"
            onSubmitEditing={addTodo}
          />
          <Pressable onPress={addTodo} style={styles.addBtn}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </Glass>

        {error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator color="#FFF" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => String(item.id)}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.empty}>Nothing here yet</Text>}
            renderItem={({ item }) => (
              <Glass style={styles.item} intensity={item.done ? 15 : 45}>
                <Pressable style={styles.itemMain} onPress={() => toggleTodo(item)}>
                  <View style={[styles.check, item.done && styles.checkDone]}>
                    {item.done && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
                </Pressable>
                <Pressable onPress={() => deleteTodo(item.id)} hitSlop={10}>
                  <Text style={styles.delete}>×</Text>
                </Pressable>
              </Glass>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1E1B4B' },
  blob: { position: 'absolute', borderRadius: 999, opacity: 0.85 },
  glass: {
    overflow: 'hidden', // required for rounded corners on BlurView
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  topRow: { paddingHorizontal: 20, paddingTop: 8 },
  backBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#FFF', fontSize: 28, marginTop: -3 },
  header: { paddingHorizontal: 24, marginTop: 20, marginBottom: 24 },
  heading: { fontSize: 36, fontWeight: '700', color: '#FFF', textShadowColor: 'rgba(0,0,0,0.15)', textShadowRadius: 8 },
  sub: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  count: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 10 },
  inputGlass: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, paddingLeft: 18, paddingRight: 6, height: 58 },
  input: { flex: 1, fontSize: 16, color: '#FFF' },
  addBtn: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 16, paddingHorizontal: 18, height: 46, justifyContent: 'center' },
  addText: { color: '#6D28D9', fontWeight: '700', fontSize: 15 },
  error: { color: '#FFE4E6', marginHorizontal: 24, marginTop: 10 },
  list: { padding: 20, gap: 12, paddingBottom: 40 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 18 },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  check: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.8)', alignItems: 'center', justifyContent: 'center' },
  checkDone: { backgroundColor: 'rgba(255,255,255,0.9)' },
  checkMark: { color: '#7C3AED', fontWeight: '800', fontSize: 14 },
  title: { flex: 1, fontSize: 16, color: '#FFF', fontWeight: '500' },
  titleDone: { color: 'rgba(255,255,255,0.55)', textDecorationLine: 'line-through' },
  delete: { color: 'rgba(255,255,255,0.8)', fontSize: 24, paddingLeft: 12 },
  empty: { textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: 40 },
});
