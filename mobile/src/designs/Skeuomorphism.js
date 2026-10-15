// SKEUOMORPHISM — asli cheez jaisa: chamray (leather) ka cover, silai (stitching), peela lined notepad,
// laal margin line, haath ki likhai jaisa font, aur chamakdaar ubhra hua button.
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const HAND = Platform.select({ ios: 'Noteworthy', default: 'casual' });
const SERIF = Platform.select({ ios: 'Georgia', default: 'serif' });

const S = {
  leather: '#6B3F22',
  leatherDark: '#3E2412',
  stitch: '#E8C99A',
  paper: '#FFF6C9',
  rule: '#A9C6E8',
  margin: '#E57373',
  ink: '#1F3A93',
  pencil: '#555555',
};

export default function Skeuomorphism({ todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining, name, tagline, onBack }) {
  return (
    <View style={styles.desk}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Leather cover — dashed border = silai */}
        <View style={styles.cover}>
          <View style={styles.stitching}>
            <Pressable onPress={onBack} style={{ alignSelf: 'flex-start' }}>
              {({ pressed }) => (
                <View style={[styles.brassBtn, pressed && styles.brassPressed]}>
                  <Text style={styles.brassText}>◂ Back</Text>
                </View>
              )}
            </Pressable>
            <Text style={styles.embossed}>{name}</Text>
            <Text style={styles.embossedSub}>{tagline}</Text>
          </View>
        </View>

        {/* Spiral binding rings */}
        <View style={styles.rings}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={styles.ring} />
          ))}
        </View>

        {/* Notepad paper */}
        <View style={styles.paper}>
          <View style={styles.marginLine} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.date}>{remaining} things left to do</Text>

            <View style={styles.line}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="write a new task..."
                placeholderTextColor="#9AA5C0"
                returnKeyType="done"
                onSubmitEditing={addTodo}
              />
              <Pressable onPress={addTodo}>
                {({ pressed }) => (
                  <View style={[styles.glossyBtn, pressed && styles.glossyPressed]}>
                    <View style={styles.gloss} />
                    <Text style={styles.glossyText}>Add</Text>
                  </View>
                )}
              </Pressable>
            </View>

            {error && <Text style={[styles.title, { color: S.margin }]}>{error}</Text>}

            {loading ? (
              <ActivityIndicator color={S.ink} style={{ marginTop: 20 }} />
            ) : (
              todos.map((item) => (
                <View key={item.id} style={styles.line}>
                  <Pressable style={styles.lineMain} onPress={() => toggleTodo(item)}>
                    <View style={styles.box}>{item.done && <Text style={styles.tick}>✔</Text>}</View>
                    <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
                  </Pressable>
                  <Pressable onPress={() => deleteTodo(item.id)} hitSlop={10}>
                    <Text style={styles.eraser}>✗</Text>
                  </Pressable>
                </View>
              ))
            )}
            {/* Khaali lines — asli notepad ki tarah */}
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`blank-${i}`} style={styles.line} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  desk: { flex: 1, backgroundColor: '#4A2E1A' },
  cover: {
    marginHorizontal: 14,
    marginTop: 8,
    backgroundColor: S.leather,
    borderRadius: 14,
    padding: 6,
    borderWidth: 1,
    borderColor: S.leatherDark,
    boxShadow: 'inset 0px 2px 3px rgba(255,255,255,0.18), inset 0px -3px 6px rgba(0,0,0,0.45), 0px 6px 12px rgba(0,0,0,0.5)',
  },
  stitching: { borderWidth: 2, borderStyle: 'dashed', borderColor: S.stitch, borderRadius: 10, padding: 14, alignItems: 'center' },
  brassBtn: {
    backgroundColor: '#C9A44C',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#8A6D25',
    boxShadow: 'inset 0px 1px 1px rgba(255,255,255,0.7), 0px 2px 2px rgba(0,0,0,0.5)',
  },
  brassPressed: { boxShadow: 'inset 0px 2px 3px rgba(0,0,0,0.5)', transform: [{ translateY: 1 }] },
  brassText: { fontFamily: SERIF, fontSize: 12, fontWeight: '700', color: '#3B2A07' },
  embossed: {
    fontFamily: SERIF,
    fontSize: 28,
    fontWeight: '700',
    color: '#E9D3B0',
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: -1 },
    textShadowRadius: 0,
  },
  embossedSub: { fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: '#D6B98E', marginTop: 4 },
  rings: { flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 30, marginTop: -6, marginBottom: -10, zIndex: 2 },
  ring: {
    width: 10,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#8C8C8C',
    boxShadow: 'inset -2px 0px 2px rgba(0,0,0,0.35), 1px 2px 2px rgba(0,0,0,0.4)',
  },
  paper: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: S.paper,
    borderRadius: 4,
    paddingTop: 22,
    overflow: 'hidden',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.55), inset 0px 0px 30px rgba(180,140,40,0.18)',
  },
  marginLine: { position: 'absolute', left: 44, top: 0, bottom: 0, width: 2, backgroundColor: S.margin, opacity: 0.7 },
  date: { fontFamily: HAND, fontSize: 14, color: S.pencil, marginLeft: 56, marginBottom: 6 },
  line: { flexDirection: 'row', alignItems: 'center', minHeight: 44, borderBottomWidth: 1, borderBottomColor: S.rule, paddingLeft: 12, paddingRight: 12 },
  lineMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: S.ink,
    borderRadius: 3,
    marginRight: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: { color: S.ink, fontSize: 18, marginTop: -6, marginLeft: 4 },
  input: { flex: 1, fontFamily: HAND, fontSize: 18, color: S.ink, marginLeft: 42 },
  title: { flex: 1, fontFamily: HAND, fontSize: 19, color: S.ink },
  titleDone: { textDecorationLine: 'line-through', color: '#7C8DB5' },
  eraser: { fontFamily: HAND, fontSize: 20, color: S.margin },
  glossyBtn: {
    overflow: 'hidden',
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#1B5E20',
    boxShadow: 'inset 0px -3px 4px rgba(0,0,0,0.3), 0px 2px 3px rgba(0,0,0,0.45)',
  },
  glossyPressed: { backgroundColor: '#256628', boxShadow: 'inset 0px 3px 5px rgba(0,0,0,0.5)' },
  gloss: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'rgba(255,255,255,0.28)' },
  glossyText: { color: '#FFF', fontWeight: '700', fontSize: 14, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: -1 }, textShadowRadius: 0 },
});
