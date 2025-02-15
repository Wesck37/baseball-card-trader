require('dotenv').config(); // Load env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cardRoutes = require('./routes/cardRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Import the profile routes
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const ebayRoutes = require('./routes/ebayRoutes');

const app = express();
const PORT = 5000; // 

// Log the SECRET_KEY to verify it's loaded correctly
console.log('REACT_APP_JWT_SECRET_KEY:', process.env.REACT_APP_JWT_SECRET_KEY);

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(express.json()); // Required for parsing JSON bodies


// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/baseballCardsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
// app.use('/api', require('./routes/userRoutes')); 
app.use('/api', profileRoutes);
app.use('/api', cardRoutes);
app.use('/api', userRoutes);
app.use('/api', ebayRoutes);


// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.post('/api/data', (req, res) => {
  const data = req.body; // Access the request body
  res.json({ message: 'Data received', data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
