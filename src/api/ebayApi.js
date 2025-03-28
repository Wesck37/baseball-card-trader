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
