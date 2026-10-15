// SHARED LOGIC: every design screen uses this hook.
// The designs differ, but they all talk to the backend the same way.
import { useEffect, useState } from 'react';

// IMPORTANT: on a device, "localhost" means the device itself, not your computer.
// - iOS Simulator:     http://localhost:4000
// - Android Emulator:  http://10.0.2.2:4000
// - Real phone (Expo Go, same WiFi): http://<your-computer-IP>:4000
//   On macOS, find your IP with `ipconfig getifaddr en0`
const API_URL = 'http://localhost:4000';

// All network calls live here so screens don't need to know how fetching works
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

  // Load todos from the server when the screen mounts
  useEffect(() => {
    api.list()
      .then(setTodos)
      .catch(() => setError('Could not connect to the server'))
      .finally(() => setLoading(false));
  }, []);

  async function addTodo() {
    if (!text.trim()) return;
    try {
      const created = await api.create(text);
      setTodos((prev) => [created, ...prev]); // use the server's response (with its id)
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
