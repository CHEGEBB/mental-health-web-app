const mongoose = require('mongoose');

const SupportGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    enum: ['anxiety', 'depression', 'trauma', 'addiction', 'grief', 'stress', 'relationships', 'self-care'],
    required: [true, 'Please specify a category']
  },
  facilitators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  maxMembers: {
    type: Number,
    default: 20
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  meetingSchedule: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'biweekly', 'monthly']
    },
    dayOfWeek: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    time: String
  },
  rules: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for member count
SupportGroupSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

module.exports = mongoose.model('SupportGroup', SupportGroupSchema);