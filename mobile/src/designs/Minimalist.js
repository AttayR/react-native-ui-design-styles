// MINIMALIST: white space, thin lines, only the essentials
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const C = { bg: '#FFFFFF', text: '#111111', muted: '#9A9A9A', line: '#EEEEEE', error: '#D14343' };

export default function Minimalist({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Pressable onPress={onBack} hitSlop={12}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.count}>{tagline} · {remaining} remaining</Text>
      </View>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a task"
        placeholderTextColor={C.muted}
        returnKeyType="done"
        onSubmitEditing={addTodo}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={C.muted} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={styles.empty}>Nothing to do</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Pressable style={styles.itemMain} onPress={() => toggleTodo(item)} hitSlop={8}>
                <View style={[styles.check, item.done && styles.checkDone]} />
                <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => deleteTodo(item.id)} hitSlop={12}>
                <Text style={styles.delete}>×</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingHorizontal: 28 },
  back: { fontSize: 14, color: C.muted, marginTop: 12 },
  header: { marginTop: 28, marginBottom: 28 },
  heading: { fontSize: 34, fontWeight: '300', color: C.text, letterSpacing: -0.5 },
  count: { fontSize: 13, color: C.muted, marginTop: 6 },
  input: { fontSize: 17, color: C.text, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.text, marginBottom: 12 },
  error: { color: C.error, fontSize: 13, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.line },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
  check: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: C.text },
  checkDone: { backgroundColor: C.text },
  title: { flex: 1, fontSize: 17, color: C.text },
  titleDone: { color: C.muted, textDecorationLine: 'line-through' },
  delete: { fontSize: 22, color: C.muted, paddingLeft: 16 },
  empty: { textAlign: 'center', color: C.muted, marginTop: 48, fontSize: 15 },
});
