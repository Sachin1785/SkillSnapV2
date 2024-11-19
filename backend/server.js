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

// Get user profile by ID or Clerk ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;  // Either regular ID or clerkId
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read users data:', err);
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    const users = JSON.parse(data);
    // Try to find the user by regular ID first, then by clerkId
    let user = users.find(u => u.id == id || u.clerkId === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Route to get or create a user by ID or Clerk ID
app.post('/api/users', (req, res) => {
  console.log('Received POST request to /api/users');
  console.log('Request body:', req.body);
  const { id, clerkId, name, email } = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read users data:', err);
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    let users = JSON.parse(data);
    let user = users.find(u => u.id == id || u.clerkId === clerkId); // Check both IDs
    if (!user) {
      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        clerkId: clerkId || '', // If clerkId is provided, use it
        name: name || '',
        email: email || '',
        designation: '',
        about: '',
        education: '',
        skills: '',
        projects: '',
        image: 'pfp.png'
        // ...other fields...
      };
      users.push(newUser);
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error('Failed to write users data:', err);
          return res.status(500).json({ error: 'Failed to write users data' });
        }
        res.json(newUser);
      });
    } else {
      res.json(user);
    }
  });
});

// Route to update user profile by ID or Clerk ID
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read users data:', err);
      return res.status(500).json({ error: 'Failed to read users data' });
    }
    let users = JSON.parse(data);
    // Find the user by either id or clerkId
    let userIndex = users.findIndex(u => u.id == id || u.clerkId === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData, image: 'pfp.png' };
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error('Failed to write users data:', err);
          return res.status(500).json({ error: 'Failed to write users data' });
        }
        res.json(users[userIndex]);
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
