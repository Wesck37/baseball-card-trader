// src/api/ebayApi.js
// import { Buffer } from 'buffer';
// const axios = require('axios');

// const EBAY_API_URL = process.env.EBAY_ENV === 'sandbox'
//   ? 'https://api.sandbox.ebay.com'
//   : 'https://api.ebay.com';

// const getAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       `${EBAY_API_URL}/identity/v1/oauth2/token`,
//       'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: `Basic ${Buffer.from(`${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`).toString('base64')}`,
//         },
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//     throw error;
//   }
// };

// const searchBaseballCards = async (query) => {
//   try {
//     const token = await getAccessToken();

//     const response = await axios.get(
//       `${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data.itemSummaries; // Return only the relevant items
//   } catch (error) {
//     console.error('Error searching baseball cards:', error);
//     throw error;
//   }
// };

// module.exports = {
//   searchBaseballCards,
// };




// import { Buffer } from 'buffer'; 
// import axios from 'axios'; // Change require to import for ES6 consistency

// const EBAY_API_URL = process.env.EBAY_ENV === 'sandbox'
//   ? 'https://api.sandbox.ebay.com'
//   : 'https://api.ebay.com';

// const getAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       `${EBAY_API_URL}/identity/v1/oauth2/token`,
//       'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: `Basic ${Buffer.from(`${process.env.EBAY_APP_ID}:${process.env.EBAY_CERT_ID}`).toString('base64')}`,
//         },
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//     throw error;
//   }
// };

// export const searchBaseballCards = async (query) => {
//   try {
//     const token = await getAccessToken();

//     const response = await axios.get(
//       `${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data.itemSummaries; // Return only the relevant items
//   } catch (error) {
//     console.error('Error searching baseball cards:', error);
//     throw error;
//   }
// };


import axios from 'axios';

const BACKEND_API_URL = 'http://localhost:5000/api'; // Your backend API URL

// Fetch the eBay access token through the backend
const getAccessToken = async () => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/ebay/token`);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token from backend:', error.response?.data || error.message);
    throw error;
  }
};

// Search for baseball cards using the eBay API
export const searchBaseballCards = async (query) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.itemSummaries; // Return only the relevant items
  } catch (error) {
    console.error('Error searching baseball cards:', error.response?.data || error.message);
    throw error;
  }
};
