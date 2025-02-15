const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate usernames
    trim: true,   // Removes leading/trailing spaces
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
