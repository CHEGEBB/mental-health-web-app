// models/Therapist.js
const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  credentials: {
    type: String,
    required: true
  },
  specializations: [String],
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  contactInfo: {
    email: String,
    phone: String
  },
  availability: [
    {
      day: String,
      slots: [String]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Therapist', therapistSchema);