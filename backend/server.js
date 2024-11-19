const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, './users.json');

// Get all users
app.get('/api/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.id === userId || user.id === parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
