// NEUMORPHISM: every element shares the background color; shape comes only from shadows.
// Raised = light highlight top-left + dark shadow bottom-right
// Inset  = the same two shadows drawn inside (pressed in)
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Each theme needs a background plus a lighter and a darker shade of it for the two shadows.
export const NEU_THEMES = [
  { id: 'cloud', name: 'Cloud', bg: '#E4E9F0', light: '#FFFFFF', dark: '#A3B1C6', text: '#3B4656', muted: '#8A96A8', accent: '#6C7BF2' },
  { id: 'mint', name: 'Mint', bg: '#DDF0E7', light: '#FFFFFF', dark: '#A3C7B6', text: '#2F4F45', muted: '#7A9C8F', accent: '#22A06B' },
  { id: 'peach', name: 'Peach', bg: '#F6E4D9', light: '#FFFFFF', dark: '#D1B2A0', text: '#5A3E33', muted: '#A3887A', accent: '#F2774B' },
  { id: 'lavender', name: 'Lavender', bg: '#E8E4F3', light: '#FFFFFF', dark: '#B8AFD1', text: '#423A5C', muted: '#8F87A8', accent: '#8B5CF6' },
  { id: 'sky', name: 'Sky', bg: '#DCEAF6', light: '#FFFFFF', dark: '#A5BDD3', text: '#2C4459', muted: '#7C93A8', accent: '#2F8FE5' },
  { id: 'rose', name: 'Rose', bg: '#F5E2E7', light: '#FFFFFF', dark: '#CFAEB8', text: '#5A3442', muted: '#A58592', accent: '#E5487A' },
  { id: 'sand', name: 'Sand', bg: '#EFE9DD', light: '#FFFFFF', dark: '#C8BEA8', text: '#4D4537', muted: '#998F7B', accent: '#C4922A' },
  { id: 'midnight', name: 'Midnight', bg: '#2A2E37', light: '#363B47', dark: '#1B1E24', text: '#E4E7EE', muted: '#8A91A0', accent: '#7C8CFF', isDark: true },
];

const makeShadows = (t) => ({
  raised: (d = 6) => ({ boxShadow: `${-d}px ${-d}px ${d * 2}px ${t.light}, ${d}px ${d}px ${d * 2}px ${t.dark}` }),
  inset: (d = 4) => ({ boxShadow: `inset ${d}px ${d}px ${d * 2}px ${t.dark}, inset ${-d}px ${-d}px ${d * 2}px ${t.light}` }),
});

export default function Neumorphism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  const [themeId, setThemeId] = useState('cloud');
  const t = NEU_THEMES.find((x) => x.id === themeId) ?? NEU_THEMES[0];
  const { raised, inset } = useMemo(() => makeShadows(t), [t]);
  const styles = useMemo(() => makeStyles(t, inset), [t, inset]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={t.isDark ? 'light' : 'dark'} />

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

      {/* Color theme picker: the selected swatch is pressed in */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themesBar} contentContainerStyle={styles.themes}>
        {NEU_THEMES.map((theme) => {
          const selected = theme.id === t.id;
          return (
            <Pressable key={theme.id} onPress={() => setThemeId(theme.id)} style={styles.themeItem}>
              <View style={[styles.swatch, selected ? inset(3) : raised(4)]}>
                <View style={[styles.swatchDot, { backgroundColor: theme.accent }, selected && styles.swatchDotSelected]} />
              </View>
              <Text style={[styles.themeName, selected && { color: t.accent }]}>{theme.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a task"
          placeholderTextColor={t.muted}
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
        <ActivityIndicator color={t.muted} style={{ marginTop: 32 }} />
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

const makeStyles = (t, inset) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: t.bg },
    topRow: { paddingHorizontal: 28, paddingTop: 12 },
    backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
    backText: { fontSize: 26, color: t.text, marginTop: -3 },
    header: { marginTop: 24, marginBottom: 8, paddingHorizontal: 28 },
    heading: { fontSize: 34, fontWeight: '700', color: t.text, letterSpacing: -0.5 },
    count: { fontSize: 13, color: t.muted, marginTop: 4 },
    themesBar: { flexGrow: 0 },
    themes: { paddingHorizontal: 28, paddingVertical: 16, gap: 18 },
    themeItem: { alignItems: 'center', gap: 8 },
    swatch: { width: 40, height: 40, borderRadius: 20, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
    swatchDot: { width: 14, height: 14, borderRadius: 7 },
    swatchDotSelected: { width: 18, height: 18, borderRadius: 9 },
    themeName: { fontSize: 11, fontWeight: '600', color: t.muted },
    inputRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 28, marginTop: 4, marginBottom: 6 },
    input: { flex: 1, fontSize: 16, color: t.text, backgroundColor: t.bg, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 18, ...inset(4) },
    addBtn: { width: 54, height: 54, borderRadius: 18, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
    addText: { fontSize: 28, color: t.accent, fontWeight: '300', marginTop: -2 },
    error: { color: '#D14343', fontSize: 13, marginBottom: 8, paddingHorizontal: 28 },
    list: { paddingHorizontal: 28, paddingTop: 22, paddingBottom: 40, gap: 18 },
    item: { flexDirection: 'row', alignItems: 'center', backgroundColor: t.bg, borderRadius: 18, paddingVertical: 16, paddingHorizontal: 18 },
    itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14 },
    check: { width: 24, height: 24, borderRadius: 12, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
    checkDone: { backgroundColor: t.accent },
    checkMark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
    title: { flex: 1, fontSize: 16, color: t.text },
    titleDone: { color: t.muted, textDecorationLine: 'line-through' },
    deleteBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
    delete: { fontSize: 18, color: t.muted, marginTop: -2 },
    empty: { textAlign: 'center', color: t.muted, marginTop: 48, fontSize: 15 },
  });
