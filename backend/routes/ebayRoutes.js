const express = require('express');
const axios = require('axios');
const router = express.Router();

const EBAY_API_URL = 'https://api.ebay.com';
const CLIENT_ID = process.env.EBAY_APP_ID;
const CLIENT_SECRET = process.env.EBAY_CERT_ID;

router.post('/ebay/token', async (req, res) => {
  try {
    const response = await axios.post(
      `${EBAY_API_URL}/identity/v1/oauth2/token`,
      'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );
    res.json(response.data); // Forward the token data to the frontend
  } catch (error) {
    console.error('Error fetching eBay token:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ message: 'Failed to fetch eBay token' });
  }
});

module.exports = router;
