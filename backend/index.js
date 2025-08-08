const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'fundraising.db');

const db = new sqlite3.Database(DB_PATH);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create tables if not exist
const initDB = () => {
    db.run(`CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    amount REAL,
    tier TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    location TEXT,
    goal REAL
  )`);
};
initDB();


let session = null;

const ADMIN_USER = {
    username: 'admin',
    password: 'password'
};


// Routes
app.get('/', (req, res) =>
{
    res.send('Morgantown Boosters API is running');
});

app.get('/donations', (req, res) =>
{
    db.all("SELECT * FROM donations ORDER BY timestamp DESC", [], (err, rows) =>
    {
        if (err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.post('/donate', (req, res) =>
{
    const {name, amount, tier} = req.body;
    if (!name || !amount || !tier) return res.status(400).json({error: 'Missing fields'});

    db.run("INSERT INTO donations (name, amount, tier) VALUES (?, ?, ?)", [name, amount, tier], function (err)
    {
        if (err) return res.status(500).json({error: err.message});
        res.json({success: true, id: this.lastID});
    });
});

app.get('/events', (req, res) =>
{
    db.all("SELECT * FROM events", [], (err, rows) =>
    {
        if (err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.post('/events', (req, res) =>
{
    const {title, description, date, location, goal} = req.body;
    if (!title || !date || !location) return res.status(400).json({error: 'Missing fields'});

    db.run(
        `INSERT INTO events (title, description, date, location, goal)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, date, location, goal],
        function (err)
        {
            if (err) return res.status(500).json({error: err.message});
            res.json({success: true, id: this.lastID});
        }
    );
});

app.put('/events/:id', (req, res) =>
{
    const {title, description, date, location, goal} = req.body;
    db.run(
        `UPDATE events
         SET title = ?,
             description = ?,
             date = ?,
             location = ?,
             goal = ?
         WHERE id = ?`,
        [title, description, date, location, goal, req.params.id],
        function (err)
        {
            if (err) return res.status(500).json({error: err.message});
            res.json({success: true});
        }
    );
});

app.delete('/events/:id', (req, res) =>
{
    db.run(`DELETE
            FROM events
            WHERE id = ?`, req.params.id, function (err)
    {
        if (err) return res.status(500).json({error: err.message});
        res.json({success: true});
    });
});


// Login
app.post('/api/login', (req, res) =>
{
    const { username, password } = req.body;
    if (username === ADMIN_USER.username && password === ADMIN_USER.password)
    {
        session = { username };
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// auth
app.get('/api/auth', (req, res) =>
{
    if (session && session.username)
    {
        return res.json({ authenticated: true, username: session.username });
    }
    return res.json({ authenticated: false });
});

// Logout
app.post('/api/logout', (req, res) =>
{
    session = null;
    res.json({ success: true });
});


// Start server
app.listen(PORT, () =>
{
    console.log(`Server running at http://localhost:${PORT}`);
});