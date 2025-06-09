const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
const resume = require('./resume');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://skill-snap-v2.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.trim())) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));


app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Get all users or search users by query
app.get('/api/users', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let query = {};
    
    if (searchQuery) {
      query.name = new RegExp(searchQuery, 'i');
    }
    
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user profile by ID or Clerk ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let user = null;

    // Try to find by different ID types
    user = await User.findOne({
      $or: [
        { clerkId: id },
        { id: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
      ]
    });
    
    if (user) {
      res.json(user);
    } else {
      const defaultUser = {
        id: id,
        name: "Default User",
        image: "pfp.png",
        designation: "",
        email: "",
        about: "",
        education: "",
        skills: "",
        projects: ""
      };
      res.json(defaultUser);
    }
  } catch (err) {
    console.error('Failed to fetch user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update PDF export route to use UUID
app.get('/api/users/:id/export-pdf', async (req, res) => {
  try {
    const { id } = req.params;
    // Try all possible ID types
    const user = await User.findOne({
      $or: [
        { id: id },
        { clerkId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await resume.generateResumePDF(user);
    const filePath = path.join(__dirname, 'temp-storage', `${user.id}_resume.pdf`);
    
    // Set headers to prompt download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${user.name}_Resume.pdf"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('end', () => {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        } else {
          console.log('Temp file deleted:', filePath);
        }
      });
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Route to get or create a user by ID or Clerk ID
app.post('/api/users', async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;
    
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      user = await User.create({
        clerkId,
        name,
        email,
        image: 'pfp.png'
      });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Failed to create/fetch user:', err);
    res.status(500).json({ error: 'Failed to create/fetch user' });
  }
});

// Route to update user profile by ID or Clerk ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, image: 'pfp.png' };
    
    const user = await User.findOneAndUpdate(
      {
        $or: [
          { clerkId: id },
          { id: id },
          { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
        ]
      },
      updatedData,
      { new: true }
    );
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Failed to update user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});