const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Please add a comment'],
    trim: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// When a comment is created, update the thread's lastActivity
CommentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Thread = mongoose.model('Thread');
    await Thread.findByIdAndUpdate(this.thread, { lastActivity: Date.now() });
  }
  next();
});

// Index for faster querying
CommentSchema.index({ thread: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', CommentSchema);