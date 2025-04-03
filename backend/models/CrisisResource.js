// models/CrisisResource.js
const mongoose = require('mongoose');

const crisisResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  type: {
    type: String,
    enum: ['Hotline', 'TextLine', 'EmergencyService', 'SupportGroup'],
    required: true
  },
  available24x7: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('CrisisResource', crisisResourceSchema);