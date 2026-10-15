// API SERVER (Express)
// Kaam: frontend se HTTP request aati hai -> yahan route match hota hai -> db.js se data -> JSON wapis.
import express from 'express';
import cors from 'cors';
import * as db from './db.js';

const app = express();
app.use(cors());          // web frontend ko doosre port se call karne ki ijazat
app.use(express.json());  // request body ka JSON parse karke req.body mein daal deta hai

// Har request ko terminal mein print karo — seekhte waqt bohat help karta hai
app.use((req, _res, next) => {
  console.log(req.method, req.url, req.body ?? '');
  next();
});

// REST API: aik "resource" (todos) + HTTP methods = CRUD
// GET    /todos      -> Read all
// POST   /todos      -> Create
// PATCH  /todos/:id  -> Update
// DELETE /todos/:id  -> Delete

app.get('/todos', (_req, res) => {
  res.json(db.getAllTodos());
});

app.post('/todos', (req, res) => {
  const title = req.body?.title?.trim();
  if (!title) return res.status(400).json({ error: 'title zaroori hai' });
  res.status(201).json(db.createTodo(title));
});

app.patch('/todos/:id', (req, res) => {
  const todo = db.updateTodo(Number(req.params.id), req.body ?? {});
  if (!todo) return res.status(404).json({ error: 'todo nahi mila' });
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const ok = db.deleteTodo(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'todo nahi mila' });
  res.status(204).end();
});

const PORT = process.env.PORT || 4000;
// '0.0.0.0' taa ke same WiFi par phone (Expo Go) bhi connect kar sake
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API chal rahi hai: http://localhost:${PORT}`);
});
