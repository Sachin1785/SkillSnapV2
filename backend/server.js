const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, './users.json');

// Get all users or search users by query
app.get('/api/users', (req, res) => {
  const searchQuery = req.query.search;
  console.log(`Search query received: ${searchQuery}`); // Add logging
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read users data:', err); // Add logging
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    let users = JSON.parse(data);
    if (searchQuery) {
      users = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(`Filtered users: ${JSON.stringify(users)}`); // Add logging
    }
    res.json(users);
  });
});

app.get('/api/users', (req, res) => {
  const searchQuery = req.query.search;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading users file:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      let users = JSON.parse(data);

      if (searchQuery) {
          users = users.filter(user => user.id.toString() === searchQuery.toString());
      }

      res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});