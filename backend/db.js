// DATABASE LAYER
// Data yahan store hota hai: project ke "database/todos.db" file mein (SQLite database).
// SQLite = poori database aik file mein. Koi alag server install nahi karna parta.
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

// Path is file ke hisaab se — server kisi bhi folder se chalao, database wahi rahegi
const db = new DatabaseSync(fileURLToPath(new URL('../database/todos.db', import.meta.url)));

// Table banao (agar pehle se nahi bani). Table = Excel sheet jaisi: columns + rows.
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    done       INTEGER NOT NULL DEFAULT 0,          -- SQLite mein boolean nahi, 0/1 use karte hain
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

// Database se row aati hai { done: 0 } — frontend ko { done: false } chahiye
const toTodo = (row) => row && { ...row, done: Boolean(row.done) };

export function getAllTodos() {
  return db.prepare('SELECT * FROM todos ORDER BY id DESC').all().map(toTodo);
}

export function getTodo(id) {
  return toTodo(db.prepare('SELECT * FROM todos WHERE id = ?').get(id));
}

export function createTodo(title) {
  // "?" placeholder — kabhi bhi user ka text seedha SQL string mein mat jorna (SQL injection)
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run(title);
  return getTodo(result.lastInsertRowid);
}

export function updateTodo(id, { title, done }) {
  const existing = getTodo(id);
  if (!existing) return null;
  db.prepare('UPDATE todos SET title = ?, done = ? WHERE id = ?').run(
    title ?? existing.title,
    (done ?? existing.done) ? 1 : 0,
    id
  );
  return getTodo(id);
}

export function deleteTodo(id) {
  return db.prepare('DELETE FROM todos WHERE id = ?').run(id).changes > 0;
}
