const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  specialty: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  acceptingNewPatients: {
    type: Boolean,
    default: true
  },
  onlineOnly: {
    type: Boolean,
    default: false
  },
  insuranceAccepted: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String
  },
  experience: {
    type: String
  },
  approach: {
    type: String
  },
  availability: {
    type: Object,
    default: {
      monday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      tuesday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      wednesday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      thursday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      friday: ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Therapist', TherapistSchema);