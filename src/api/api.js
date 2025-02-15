import axios from 'axios';

// Function to send data to the backend
export const sendDataToBackend = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending data to the backend:', error);
    throw error;
  }
};
