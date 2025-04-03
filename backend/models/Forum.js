const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    enum: ['anxiety', 'depression', 'stress', 'trauma', 'relationships', 'general', 'self-care', 'recovery'],
    required: [true, 'Please specify a category']
  },
  icon: {
    type: String
  },
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  rules: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for thread count
ForumSchema.virtual('threadCount', {
  ref: 'Thread',
  localField: '_id',
  foreignField: 'forum',
  count: true
});

module.exports = mongoose.model('Forum', ForumSchema);