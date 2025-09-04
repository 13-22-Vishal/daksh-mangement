// Vishal Manager Dashboard Backend
// Node.js + Express + better-sqlite3
const express = require('express');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const app = express();
const PORT = process.env.PORT || 3000;

// DB setup
const DB_PATH = path.join(__dirname, 'vishal_manager.db');
let dbExists = fs.existsSync(DB_PATH);
const db = new Database(DB_PATH);

// Seed DB if new
if (!dbExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8');
  db.exec(schema);
}

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// --- Departments CRUD ---
app.get('/api/departments', (req, res) => {
  const rows = db.prepare('SELECT * FROM departments').all();
  res.json(rows);
});
app.post('/api/departments', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const stmt = db.prepare('INSERT INTO departments (name, description, created_at) VALUES (?, ?, datetime("now"))');
  const info = stmt.run(name, description || '');
  res.json({ id: info.lastInsertRowid, name, description });
});
app.put('/api/departments/:id', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare('UPDATE departments SET name=?, description=? WHERE id=?');
  stmt.run(name, description, req.params.id);
  res.json({ success: true });
});
app.delete('/api/departments/:id', (req, res) => {
  db.prepare('DELETE FROM departments WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// --- Members CRUD ---
app.get('/api/members', (req, res) => {
  const rows = db.prepare(`
    SELECT m.*, d.name as department
    FROM members m LEFT JOIN departments d ON m.department_id = d.id
    ORDER BY m.id
  `).all();
  res.json(rows);
});
app.post('/api/members', (req, res) => {
  const { name, specialization, department_id, email } = req.body;
  if (!name || !specialization || !department_id) return res.status(400).json({ error: 'Missing fields' });
  const stmt = db.prepare('INSERT INTO members (name, specialization, department_id, email, created_at) VALUES (?, ?, ?, ?, datetime("now"))');
  const info = stmt.run(name, specialization, department_id, email || '');
  res.json({ id: info.lastInsertRowid, name, specialization, department_id, email });
});
app.put('/api/members/:id', (req, res) => {
  const { name, specialization, department_id, email } = req.body;
  db.prepare('UPDATE members SET name=?, specialization=?, department_id=?, email=? WHERE id=?')
    .run(name, specialization, department_id, email, req.params.id);
  res.json({ success: true });
});
app.delete('/api/members/:id', (req, res) => {
  db.prepare('DELETE FROM members WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// --- Tasks CRUD ---
app.get('/api/tasks', (req, res) => {
  const rows = db.prepare(`
    SELECT t.*, m.name as assigned_to_name, d.name as department
    FROM tasks t
    LEFT JOIN members m ON t.assigned_to = m.id
    LEFT JOIN departments d ON t.department_id = d.id
    ORDER BY t.id
  `).all();
  res.json(rows);
});
app.post('/api/tasks', (req, res) => {
  const { title, description, status, assigned_to, department_id, due_date } = req.body;
  if (!title || !status || !department_id) return res.status(400).json({ error: 'Missing fields' });
  const stmt = db.prepare('INSERT INTO tasks (title, description, status, assigned_to, department_id, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime("now"))');
  const info = stmt.run(title, description || '', status, assigned_to || null, department_id, due_date || null);
  res.json({ id: info.lastInsertRowid, title, status, department_id });
});
app.put('/api/tasks/:id', (req, res) => {
  const { title, description, status, assigned_to, department_id, due_date } = req.body;
  db.prepare('UPDATE tasks SET title=?, description=?, status=?, assigned_to=?, department_id=?, due_date=? WHERE id=?')
    .run(title, description, status, assigned_to, department_id, due_date, req.params.id);
  res.json({ success: true });
});
app.delete('/api/tasks/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// --- Print Log ---
app.get('/api/printlog', (req, res) => {
  // Filters: department_id, date_from, date_to
  let sql = `
    SELECT p.*, m.name as printed_by_name, d.name as department
    FROM print_log p
    LEFT JOIN members m ON p.printed_by = m.id
    LEFT JOIN departments d ON p.department_id = d.id
    WHERE 1=1
  `;
  const params = [];
  if (req.query.department_id) {
    sql += ' AND p.department_id = ?';
    params.push(req.query.department_id);
  }
  if (req.query.date_from) {
    sql += ' AND p.printed_at >= ?';
    params.push(req.query.date_from);
  }
  if (req.query.date_to) {
    sql += ' AND p.printed_at <= ?';
    params.push(req.query.date_to);
  }
  sql += ' ORDER BY p.printed_at DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});
app.post('/api/printlog', (req, res) => {
  const { item_name, printed_by, department_id, notes } = req.body;
  if (!item_name || !printed_by || !department_id) return res.status(400).json({ error: 'Missing fields' });
  const stmt = db.prepare('INSERT INTO print_log (item_name, printed_by, department_id, printed_at, notes) VALUES (?, ?, ?, datetime("now"), ?)');
  const info = stmt.run(item_name, printed_by, department_id, notes || '');
  res.json({ id: info.lastInsertRowid, item_name });
});

// --- Analytics ---
app.get('/api/analytics/tasks-per-dept', (req, res) => {
  // Pie chart: % completed per department
  const rows = db.prepare(`
    SELECT d.name as department,
      SUM(CASE WHEN t.status='Completed' THEN 1 ELSE 0 END) as completed,
      COUNT(t.id) as total
    FROM departments d
    LEFT JOIN tasks t ON t.department_id = d.id
    GROUP BY d.id
  `).all();
  const labels = rows.map(r => r.department);
  const data = rows.map(r => r.total ? Math.round((r.completed / r.total) * 100) : 0);
  res.json({ labels, data });
});
app.get('/api/analytics/prints-over-time', (req, res) => {
  // Line chart: prints per day for last 14 days
  const days = 14;
  const rows = db.prepare(`
    SELECT strftime('%Y-%m-%d', printed_at) as date, COUNT(*) as count
    FROM print_log
    WHERE printed_at >= date('now', ?)
    GROUP BY date
    ORDER BY date
  `).all(`-${days} days`);
  const labels = rows.map(r => r.date);
  const data = rows.map(r => r.count);
  res.json({ labels, data });
});

// --- Serve index.html for SPA routes ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Vishal Manager running at http://localhost:${PORT}`);
});