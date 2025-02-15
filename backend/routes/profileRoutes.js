const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/middleware'); // Import the authentication middleware

// Example: Get user profile
router.get('/profile', authenticate, (req, res) => {
  // Respond with the authenticated user's profile
  res.json({
    message: `Welcome, ${req.user.username}`,
    user: req.user,
  });
});

module.exports = router;
