const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const router = express.Router();

// Use environment variables for sensitive data
const CLIENT_ID = process.env.EBAY_CLIENT_ID; 
const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET; 
const REDIRECT_URI = process.env.REDIRECT_URI; // Ensure this is set in your .env file

// Base URL for eBay
const EBAY_API_URL = process.env.EBAY_ENV === 'Sandbox' ? 'https://api.sandbox.ebay.com' : 'https://api.ebay.com';

// Route to fetch eBay access token
router.post('/ebay/token', async (req, res) => {
  try {
    // Get the authorization code from the query string
    const { code } = req.query; // The code from the redirect

    // Ensure the code is present
    if (!code) {
      return res.status(400).json({ message: 'Authorization code is missing.' });
    }

    // Base64 encode the client credentials
    const encodedCredentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // Check if the credentials are loaded correctly
    console.log('Encoded Credentials:', encodedCredentials);
    console.log('Using eBay Environment:', EBAY_API_URL);

    // Make the POST request to fetch the token
    const response = await axios.post(
      `https://api.ebay.com/identity/v1/oauth2/token`,  // Correct endpoint for token exchange
      `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,  // Include the code and redirect_uri
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,  // Ensure this is correct
        },
      }
    );

    console.log('Response:', response.data);  // Check the response for debugging

    // Send the token data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching eBay token:', error.response?.data || error.message);

    // Return detailed error information to the client
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch eBay token',
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
