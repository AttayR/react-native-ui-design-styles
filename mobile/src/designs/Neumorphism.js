// NEUMORPHISM: every element shares the background color; shape comes only from shadows.
// Raised = light highlight top-left + dark shadow bottom-right
// Inset  = the same two shadows drawn inside (pressed in)
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const C = {
  bg: '#E4E9F0',
  light: '#FFFFFF',
  dark: '#A3B1C6',
  text: '#3B4656',
  muted: '#8A96A8',
  accent: '#6C7BF2',
  error: '#D14343',
};

const raised = (d = 6) => ({
  boxShadow: `${-d}px ${-d}px ${d * 2}px ${C.light}, ${d}px ${d}px ${d * 2}px ${C.dark}`,
});
const inset = (d = 4) => ({
  boxShadow: `inset ${d}px ${d}px ${d * 2}px ${C.dark}, inset ${-d}px ${-d}px ${d * 2}px ${C.light}`,
});

export default function Neumorphism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.topRow}>
        <Pressable onPress={onBack}>
          {({ pressed }) => (
            <View style={[styles.backBtn, pressed ? inset(3) : raised(4)]}>
              <Text style={styles.backText}>‹</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.count}>{tagline} · {remaining} remaining</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a task"
          placeholderTextColor={C.muted}
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
        <Pressable onPress={addTodo}>
          {({ pressed }) => (
            <View style={[styles.addBtn, pressed ? inset(3) : raised(5)]}>
              <Text style={styles.addText}>+</Text>
            </View>
          )}
        </Pressable>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={C.muted} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          // Shadows extend outside each card; padding keeps them from being clipped
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nothing to do</Text>}
          renderItem={({ item }) => (
            <View style={[styles.item, item.done ? inset(4) : raised(6)]}>
              <Pressable style={styles.itemMain} onPress={() => toggleTodo(item)} hitSlop={8}>
                <View style={[styles.check, item.done ? styles.checkDone : inset(2)]}>
                  {item.done && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => deleteTodo(item.id)} hitSlop={8}>
                {({ pressed }) => (
                  <View style={[styles.deleteBtn, pressed ? inset(2) : raised(3)]}>
                    <Text style={styles.delete}>×</Text>
                  </View>
                )}
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  topRow: { paddingHorizontal: 28, paddingTop: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 26, color: C.text, marginTop: -3 },
  header: { marginTop: 24, marginBottom: 28, paddingHorizontal: 28 },
  heading: { fontSize: 34, fontWeight: '700', color: C.text, letterSpacing: -0.5 },
  count: { fontSize: 13, color: C.muted, marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 28, marginBottom: 6 },
  input: { flex: 1, fontSize: 16, color: C.text, backgroundColor: C.bg, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 18, ...inset(4) },
  addBtn: { width: 54, height: 54, borderRadius: 18, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
  addText: { fontSize: 28, color: C.accent, fontWeight: '300', marginTop: -2 },
  error: { color: C.error, fontSize: 13, marginBottom: 8, paddingHorizontal: 28 },
  list: { paddingHorizontal: 28, paddingTop: 22, paddingBottom: 40, gap: 18 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg, borderRadius: 18, paddingVertical: 16, paddingHorizontal: 18 },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  check: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
  checkDone: { backgroundColor: C.accent },
  checkMark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  title: { flex: 1, fontSize: 16, color: C.text },
  titleDone: { color: C.muted, textDecorationLine: 'line-through' },
  deleteBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  delete: { fontSize: 18, color: C.muted, marginTop: -2 },
  empty: { textAlign: 'center', color: C.muted, marginTop: 48, fontSize: 15 },
});
