// NEOBRUTALISM — mote kaale border, chamkeele rang, aur "hard" shadow (blur nahi, seedha offset).
// Button dabao to shadow gayab aur button us jagah khisak jata hai — playful feel.
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const N = { bg: '#FDE047', pink: '#FF6B9D', mint: '#7CF5C4', blue: '#7DD3FC', card: '#FFFFFF', ink: '#000000' };

// Hard shadow: offset hai, blur 0
const hard = (d = 5) => ({ boxShadow: `${d}px ${d}px 0px ${N.ink}` });
const pressedShift = (d = 5) => ({ transform: [{ translateX: d }, { translateY: d }], boxShadow: 'none' });

// Har todo ko alag rang — playful
const CARD_COLORS = ['#FFFFFF', '#C4B5FD', '#7DD3FC', '#FDBA74'];

export default function Neobrutalism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.topRow}>
        <Pressable onPress={onBack}>
          {({ pressed }) => (
            <View style={[styles.backBtn, pressed ? pressedShift(3) : hard(3)]}>
              <Text style={styles.backText}>← BACK</Text>
            </View>
          )}
        </Pressable>
        <View style={[styles.badge, hard(3)]}>
          <Text style={styles.badgeText}>{remaining} LEFT</Text>
        </View>
      </View>

      <View style={[styles.titleCard, hard(6)]}>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.sub}>{tagline} ✦</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, hard(4)]}
          value={text}
          onChangeText={setText}
          placeholder="New task..."
          placeholderTextColor="#555"
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />
        <Pressable onPress={addTodo}>
          {({ pressed }) => (
            <View style={[styles.addBtn, pressed ? pressedShift(4) : hard(4)]}>
              <Text style={styles.addText}>ADD</Text>
            </View>
          )}
        </Pressable>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator color={N.ink} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nothing yet! 🎉</Text>}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.item,
                { backgroundColor: item.done ? N.mint : CARD_COLORS[index % CARD_COLORS.length] },
                item.done ? pressedShift(5) : hard(5),
              ]}
            >
              <Pressable style={styles.itemMain} onPress={() => toggleTodo(item)}>
                <View style={[styles.check, item.done && { backgroundColor: N.ink }]}>
                  {item.done && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => deleteTodo(item.id)}>
                {({ pressed }) => (
                  <View style={[styles.deleteBtn, pressed ? pressedShift(2) : hard(2)]}>
                    <Text style={styles.delete}>✕</Text>
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

const border = { borderWidth: 3, borderColor: N.ink };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: N.bg },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  backBtn: { ...border, backgroundColor: N.card, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  backText: { fontWeight: '900', fontSize: 13, color: N.ink },
  badge: { ...border, backgroundColor: N.mint, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { fontWeight: '900', fontSize: 12, color: N.ink },
  titleCard: { ...border, backgroundColor: N.pink, borderRadius: 16, marginHorizontal: 20, marginTop: 20, padding: 18, transform: [{ rotate: '-1.5deg' }] },
  heading: { fontSize: 34, fontWeight: '900', color: N.ink, letterSpacing: -1 },
  sub: { fontSize: 14, fontWeight: '700', color: N.ink, marginTop: 4 },
  inputRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 28, marginBottom: 8 },
  input: { ...border, flex: 1, backgroundColor: N.card, borderRadius: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '600', color: N.ink, height: 54 },
  addBtn: { ...border, backgroundColor: N.blue, borderRadius: 12, height: 54, paddingHorizontal: 18, justifyContent: 'center' },
  addText: { fontWeight: '900', fontSize: 16, color: N.ink },
  error: { color: '#B91C1C', fontWeight: '800', marginHorizontal: 20, marginTop: 6 },
  list: { padding: 20, paddingTop: 16, gap: 16, paddingBottom: 40 },
  item: { ...border, flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 14 },
  itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: { ...border, width: 26, height: 26, borderRadius: 6, backgroundColor: N.card, alignItems: 'center', justifyContent: 'center' },
  checkMark: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  title: { flex: 1, fontSize: 17, fontWeight: '800', color: N.ink },
  titleDone: { textDecorationLine: 'line-through' },
  deleteBtn: { ...border, width: 34, height: 34, borderRadius: 8, backgroundColor: N.pink, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  delete: { fontWeight: '900', fontSize: 14, color: N.ink },
  empty: { textAlign: 'center', fontSize: 20, fontWeight: '900', marginTop: 40, color: N.ink },
});
