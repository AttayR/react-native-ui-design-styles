// DATABASE LAYER
// Data is stored in the project's "database/todos.db" file (SQLite).
// SQLite keeps the whole database in a single file, so no separate DB server is needed.
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

// Resolve the path relative to this file so it works no matter where the server is started
const db = new DatabaseSync(fileURLToPath(new URL('../database/todos.db', import.meta.url)));

// Create the table on first run.
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    done       INTEGER NOT NULL DEFAULT 0,          -- SQLite has no boolean type, so 0/1 is used
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

// Rows come back as { done: 0 }; the client expects { done: false }
const toTodo = (row) => row && { ...row, done: Boolean(row.done) };

export function getAllTodos() {
  return db.prepare('SELECT * FROM todos ORDER BY id DESC').all().map(toTodo);
}

export function getTodo(id) {
  return toTodo(db.prepare('SELECT * FROM todos WHERE id = ?').get(id));
}

export function createTodo(title) {
  // Use "?" placeholders; never concatenate user input into SQL (prevents SQL injection)
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
