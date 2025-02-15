const mongoose = require('mongoose');

// Define the Card schema
const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  frontImage: { type: String },
  backImage: { type: String },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create the Card model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
