const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
});

// Routes
app.get('/todos', (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API');
});


app.post('/todos', (req, res) => {
  const { task } = req.body;
  db.run("INSERT INTO todos (task) VALUES (?)", [task], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, task });
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
