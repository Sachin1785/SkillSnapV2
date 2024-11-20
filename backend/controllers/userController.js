const User = require('../models/User');

// Get all users or search users by query
const getUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const users = searchQuery
      ? await User.find({ name: { $regex: searchQuery, $options: 'i' } })
      : await User.find();
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by ID or Clerk ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await User.findOne({ $or: [{ _id: id }, { clerkId: id }] });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Create or Get User
const createUser = async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;
    let user = await User.findOne({ $or: [{ clerkId }, { email }] });

    if (!user) {
      user = new User({ clerkId, name, email });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await User.findOneAndUpdate(
      { $or: [{ _id: id }, { clerkId: id }] },
      { ...updatedData, image: 'pfp.png' },
      { new: true } // Return updated document
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser };
