const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  
  clerkId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, default: '' },
  about: { type: String, default: '' },
  education: { type: String, default: '' },
  skills: { type: String, default: '' },
  projects: { type: String, default: '' },
  image: { type: String, default: 'pfp.png' },
});

module.exports = mongoose.model('User', userSchema);
