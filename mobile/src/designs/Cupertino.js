// iOS / CUPERTINO: large title, "‹ Back" nav button, grouped inset list, system blue, search-style field
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const I = {
  bg: '#F2F2F7', // systemGroupedBackground
  cell: '#FFFFFF',
  label: '#000000',
  secondary: '#8E8E93',
  separator: '#C6C6C8',
  fill: '#E3E3E8',
  blue: '#007AFF',
  red: '#FF3B30',
};

export default function Cupertino({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Navigation bar */}
      <View style={styles.navBar}>
        <Pressable onPress={onBack} hitSlop={10}>
          {({ pressed }) => <Text style={[styles.navBtn, pressed && { opacity: 0.3 }]}>‹ Styles</Text>}
        </Pressable>
        <Pressable onPress={addTodo} hitSlop={10}>
          {({ pressed }) => <Text style={[styles.navBtn, styles.navBold, pressed && { opacity: 0.3 }]}>Add</Text>}
        </Pressable>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.largeTitle}>{name}</Text>

        {/* Search-bar style text field */}
        <View style={styles.search}>
          <Text style={styles.searchIcon}>＋</Text>
          <TextInput
            style={styles.searchInput}
            value={text}
            onChangeText={setText}
            placeholder="New Reminder"
            placeholderTextColor={I.secondary}
            returnKeyType="done"
            onSubmitEditing={addTodo}
          />
        </View>

        <Text style={styles.sectionHeader}>{tagline.toUpperCase()}</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} />
        ) : (
          <View style={styles.group}>
            {todos.length === 0 && <Text style={styles.emptyCell}>No Reminders</Text>}
            {todos.map((item, i) => (
              <View key={item.id}>
                <Pressable onPress={() => toggleTodo(item)} style={({ pressed }) => [styles.cell, pressed && { backgroundColor: '#D1D1D6' }]}>
                  <View style={[styles.radio, item.done && styles.radioOn]}>
                    {item.done && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[styles.cellText, item.done && styles.cellTextDone]}>{item.title}</Text>
                  <Pressable onPress={() => deleteTodo(item.id)} hitSlop={10}>
                    <Text style={styles.delete}>Delete</Text>
                  </Pressable>
                </Pressable>
                {/* iOS separators are inset to align with the text, not the cell edge */}
                {i < todos.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionFooter}>{remaining} remaining</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: I.bg },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 44 },
  navBtn: { fontSize: 17, color: I.blue },
  navBold: { fontWeight: '600' },
  largeTitle: { fontSize: 34, fontWeight: '700', color: I.label, letterSpacing: 0.4, paddingHorizontal: 16, marginTop: 4, marginBottom: 10 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: I.fill, borderRadius: 10, marginHorizontal: 16, paddingHorizontal: 8, height: 36 },
  searchIcon: { color: I.secondary, fontSize: 15, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 17, color: I.label },
  sectionHeader: { fontSize: 13, color: I.secondary, paddingHorizontal: 32, marginTop: 28, marginBottom: 7 },
  sectionFooter: { fontSize: 13, color: I.secondary, paddingHorizontal: 32, marginTop: 7 },
  error: { color: I.red, paddingHorizontal: 32, marginBottom: 8 },
  group: { backgroundColor: I.cell, borderRadius: 10, marginHorizontal: 16, overflow: 'hidden' },
  cell: { flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingHorizontal: 16, paddingVertical: 11, gap: 12, backgroundColor: I.cell },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: I.separator, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: I.blue },
  radioDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: I.blue },
  cellText: { flex: 1, fontSize: 17, color: I.label },
  cellTextDone: { color: I.secondary },
  delete: { fontSize: 15, color: I.red },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: I.separator, marginLeft: 50 },
  emptyCell: { fontSize: 17, color: I.secondary, padding: 16, textAlign: 'center' },
});
