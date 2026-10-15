// API SERVER (Express)
// Flow: the client sends an HTTP request -> a route matches it -> db.js reads/writes data -> JSON response.
import express from 'express';
import cors from 'cors';
import * as db from './db.js';

const app = express();
app.use(cors());          // allow web clients on other origins to call the API
app.use(express.json());  // parse JSON request bodies into req.body

// Log every request (handy while developing)
app.use((req, _res, next) => {
  console.log(req.method, req.url, req.body ?? '');
  next();
});

// REST API: one resource (todos) + HTTP methods = CRUD
// GET    /todos      -> Read all
// POST   /todos      -> Create
// PATCH  /todos/:id  -> Update
// DELETE /todos/:id  -> Delete

app.get('/todos', (_req, res) => {
  res.json(db.getAllTodos());
});

app.post('/todos', (req, res) => {
  const title = req.body?.title?.trim();
  if (!title) return res.status(400).json({ error: 'title is required' });
  res.status(201).json(db.createTodo(title));
});

app.patch('/todos/:id', (req, res) => {
  const todo = db.updateTodo(Number(req.params.id), req.body ?? {});
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const ok = db.deleteTodo(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'todo not found' });
  res.status(204).end();
});

const PORT = process.env.PORT || 4000;
// Bind to 0.0.0.0 so a phone on the same Wi-Fi (Expo Go) can connect
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running at http://localhost:${PORT}`);
});
