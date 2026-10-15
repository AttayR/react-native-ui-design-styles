// SHARED LOGIC — har design screen yahi hook use karti hai.
// Design alag alag hain, lekin backend se baat karne ka tareeqa aik hi hai.
import { useEffect, useState } from 'react';

// ⚠️ IMPORTANT: Phone par "localhost" = phone khud, aapka Mac nahi!
// - iOS Simulator:     http://localhost:4000
// - Android Emulator:  http://10.0.2.2:4000
// - Real phone (Expo Go, same WiFi): http://<Mac ka IP>:4000
//   Mac ka IP: terminal mein `ipconfig getifaddr en0`
const API_URL = 'http://localhost:4000';

// Saari network calls aik jagah — screen ko pata nahi hona chahiye ke fetch kaise hota hai
const api = {
  async list() {
    const res = await fetch(`${API_URL}/todos`);
    return res.json();
  },
  async create(title) {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },
  async toggle(todo) {
    const res = await fetch(`${API_URL}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !todo.done }),
    });
    return res.json();
  },
  async remove(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  },
};

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Screen khulte hi server se todos lao
  useEffect(() => {
    api.list()
      .then(setTodos)
      .catch(() => setError('Server se connect nahi ho saka'))
      .finally(() => setLoading(false));
  }, []);

  async function addTodo() {
    if (!text.trim()) return;
    try {
      const created = await api.create(text);
      setTodos((prev) => [created, ...prev]); // server ne jo wapis bheja (id ke sath) wohi list mein daalo
      setText('');
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function toggleTodo(todo) {
    const updated = await api.toggle(todo);
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTodo(id) {
    await api.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return { todos, text, setText, loading, error, addTodo, toggleTodo, deleteTodo, remaining };
}
