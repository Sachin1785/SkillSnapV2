const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  clerkId: {
    type: String,
    sparse: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'pfp.png'
  },
  designation: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  skills: {
    type: String,
    default: ''
  },
  projects: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', userSchema);
