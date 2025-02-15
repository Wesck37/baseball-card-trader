const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const router = express.Router();

const SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY; // Use an environment variable for the secret key

// Verify that SECRET_KEY is loaded
if (!SECRET_KEY) {
  console.error('JWT_SECRET_KEY is not set in environment variables.');
  process.exit(1); // Exit the server
}

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Log the incoming request body
  console.log('Request received:', req.body);

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username); // Log when user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for user:', username); // Log when password is invalid
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Error during login:', error); // Log unexpected errors
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
