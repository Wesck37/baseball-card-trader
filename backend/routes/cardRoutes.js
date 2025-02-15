const express = require('express');
const authenticate = require('../middleware/middleware'); // Ensure middleware exists
const Card = require('../models/Card'); // Backend Card model

const router = express.Router();

// Route to fetch all cards for a user
router.get('/cards', authenticate, async (req, res) => {
  try {
    const userCards = await Card.find({ userId: req.user.id }); // Fetch cards for the logged-in user
    res.json(userCards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cards', error });
  }
});

// Route to add a new card
router.post('/cards', authenticate, async (req, res) => {
  try {
    const { title, frontImage, backImage, link } = req.body;

    const newCard = new Card({
      userId: req.user.id,
      title,
      frontImage,
      backImage,
      link,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add card', error });
  }
});

module.exports = router;
