const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser } = require('../controllers/userController');
const resume = require('../resume');
const path = require('path');

// Existing routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

// Add PDF export route
router.get('/:id/export-pdf', async (req, res) => {
  try {
    const user = await require('../models/User').findOne({ 
      $or: [
        { clerkId: req.params.id }, 
        { _id: req.params.id }
      ] 
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await resume.generateResumePDF(user);
    const filePath = path.join(__dirname, '../temp-storage', `${user.clerkId}_resume.pdf`);
    res.download(filePath, `${user.name}_Resume.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
