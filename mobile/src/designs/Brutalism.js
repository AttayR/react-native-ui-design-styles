// BRUTALISM: raw look with monospace, huge UPPERCASE type, thick black rules, no rounded corners, no decoration
import { ActivityIndicator, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const MONO = Platform.select({ ios: 'Menlo', default: 'monospace' });
const SERIF = Platform.select({ ios: 'Times New Roman', default: 'serif' });

export default function Brutalism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Pressable onPress={onBack}>
        <Text style={styles.back}>[&lt;- BACK]</Text>
      </Pressable>

      <Text style={styles.heading}>{name.toUpperCase()}</Text>
      <Text style={styles.sub}>/* {tagline} */</Text>

      <View style={styles.rule} />
      <Text style={styles.meta}>
        TOTAL={todos.length}  OPEN={remaining}  DONE={todos.length - remaining}
      </Text>
      <View style={styles.rule} />

      <View style={styles.inputRow}>
        <Text style={styles.prompt}>&gt;</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="TYPE TASK HERE"
          placeholderTextColor="#999"
          autoCapitalize="characters"
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
        <Pressable onPress={addTodo} style={({ pressed }) => [styles.addBtn, pressed && { backgroundColor: '#000' }]}>
          {({ pressed }) => <Text style={[styles.addText, pressed && { color: '#FFF' }]}>SUBMIT</Text>}
        </Pressable>
      </View>

      {error && <Text style={styles.error}>ERROR: {error}</Text>}

      {loading ? (
        <ActivityIndicator color="#000" style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text style={styles.empty}>NULL</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.index}>{String(index + 1).padStart(3, '0')}</Text>
              <Pressable style={{ flex: 1 }} onPress={() => toggleTodo(item)}>
                <Text style={[styles.title, item.done && styles.titleDone]}>
                  {item.done ? '[X] ' : '[ ] '}
                  {item.title}
                </Text>
              </Pressable>
              <Pressable onPress={() => deleteTodo(item.id)}>
                <Text style={styles.delete}>DEL</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 12 },
  back: { fontFamily: MONO, fontSize: 14, color: '#0000EE', textDecorationLine: 'underline', marginTop: 8 },
  heading: { fontFamily: SERIF, fontSize: 64, fontWeight: '900', color: '#000', lineHeight: 60, marginTop: 16, letterSpacing: -3 },
  sub: { fontFamily: MONO, fontSize: 12, color: '#000', marginTop: 8 },
  rule: { height: 4, backgroundColor: '#000', marginVertical: 6 },
  meta: { fontFamily: MONO, fontSize: 12, color: '#000' },
  inputRow: { flexDirection: 'row', alignItems: 'stretch', borderWidth: 3, borderColor: '#000', marginTop: 16, marginBottom: 12 },
  prompt: { fontFamily: MONO, fontSize: 20, fontWeight: '700', paddingHorizontal: 8, alignSelf: 'center' },
  input: { flex: 1, fontFamily: MONO, fontSize: 15, color: '#000', paddingVertical: 12 },
  addBtn: { borderLeftWidth: 3, borderColor: '#000', paddingHorizontal: 12, justifyContent: 'center', backgroundColor: '#FFF' },
  addText: { fontFamily: MONO, fontWeight: '700', fontSize: 13, color: '#000' },
  error: { fontFamily: MONO, color: '#FF0000', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: '#000', paddingVertical: 12, gap: 10 },
  index: { fontFamily: MONO, fontSize: 12, color: '#000', width: 34 },
  title: { fontFamily: MONO, fontSize: 16, color: '#000', textTransform: 'uppercase' },
  titleDone: { textDecorationLine: 'line-through', color: '#777' },
  delete: { fontFamily: MONO, fontSize: 13, color: '#FF0000', fontWeight: '700', textDecorationLine: 'underline' },
  empty: { fontFamily: MONO, fontSize: 40, color: '#000', marginTop: 20 },
});
