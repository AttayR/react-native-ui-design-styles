// MATERIAL DESIGN (Material 3): top app bar, outlined text field, cards, FAB, purple "primary" color
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const M = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  surface: '#FEF7FF',
  surfaceContainer: '#F3EDF7',
  onSurface: '#1D1B20',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  error: '#B3261E',
};

// Material "elevation" levels as soft drop shadows
const elevation1 = { boxShadow: '0px 1px 3px rgba(0,0,0,0.15), 0px 1px 2px rgba(0,0,0,0.3)' };
const elevation3 = { boxShadow: '0px 4px 8px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)' };

export default function Material({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View style={styles.appBar}>
        <Pressable onPress={onBack} style={styles.iconBtn} android_ripple={{ color: '#0002', borderless: true }}>
          <Text style={styles.icon}>←</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.sub}>{tagline}</Text>
        </View>
      </View>

      {/* Outlined text field (floating label) */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>New task</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="What needs to be done?"
          placeholderTextColor={M.outline}
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
      </View>

      <View style={styles.chip}>
        <Text style={styles.chipText}>{remaining} remaining</Text>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={M.primary} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
          renderItem={({ item }) => (
            <View style={[styles.card, elevation1]}>
              <Pressable style={styles.cardMain} onPress={() => toggleTodo(item)} android_ripple={{ color: '#6750A422' }}>
                <View style={[styles.checkbox, item.done && styles.checkboxOn]}>
                  {item.done && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => deleteTodo(item.id)} style={styles.iconBtn} android_ripple={{ color: '#0002', borderless: true }}>
                <Text style={styles.deleteIcon}>✕</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      {/* Floating Action Button */}
      <Pressable onPress={addTodo} style={[styles.fab, elevation3]} android_ripple={{ color: '#FFFFFF33' }}>
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Add</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: M.surface },
  appBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12, gap: 4 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22, color: M.onSurface },
  heading: { fontSize: 22, fontWeight: '500', color: M.onSurface },
  sub: { fontSize: 13, color: M.onSurfaceVariant, marginTop: 2 },
  field: { marginHorizontal: 16, marginTop: 12, borderWidth: 2, borderColor: M.primary, borderRadius: 4, paddingHorizontal: 14 },
  fieldLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 4,
    backgroundColor: M.surface,
    fontSize: 12,
    color: M.primary,
  },
  input: { fontSize: 16, color: M.onSurface, paddingVertical: 16 },
  chip: {
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: M.primaryContainer,
  },
  chipText: { fontSize: 13, fontWeight: '500', color: '#21005D' },
  error: { color: M.error, marginHorizontal: 16, marginTop: 8 },
  list: { padding: 16, gap: 10, paddingBottom: 120 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: M.surfaceContainer, borderRadius: 12, overflow: 'hidden', paddingRight: 4 },
  cardMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16, paddingLeft: 16 },
  checkbox: { width: 20, height: 20, borderRadius: 2, borderWidth: 2, borderColor: M.onSurfaceVariant, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: M.primary, borderColor: M.primary },
  checkMark: { color: M.onPrimary, fontSize: 13, fontWeight: '700' },
  title: { flex: 1, fontSize: 16, color: M.onSurface },
  titleDone: { color: M.outline, textDecorationLine: 'line-through' },
  deleteIcon: { fontSize: 16, color: M.onSurfaceVariant },
  empty: { textAlign: 'center', color: M.onSurfaceVariant, marginTop: 40 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: M.primary,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    overflow: 'hidden',
  },
  fabIcon: { color: M.onPrimary, fontSize: 24, marginTop: -2 },
  fabText: { color: M.onPrimary, fontSize: 15, fontWeight: '600' },
});
