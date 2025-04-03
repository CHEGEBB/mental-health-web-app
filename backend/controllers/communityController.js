// controllers/communityController.js
const ForumThread = require('../models/Forum');

// @desc    Get all forum threads
// @route   GET /api/community/forums
// @access  Public
const getForums = async (req, res) => {
  try {
    const categories = ['General', 'Depression', 'Anxiety', 'Stress', 'Relationships', 'Self-care', 'Other'];
    
    const categoryThreadCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await ForumThread.countDocuments({ category });
        return { category, count };
      })
    );
    
    res.json(categoryThreadCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get threads for a specific forum category
// @route   GET /api/community/forums/:category
// @access  Public
const getForumThreads = async (req, res) => {
  try {
    const { category } = req.params;
    const threads = await ForumThread.find({ category })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific thread with comments
// @route   GET /api/community/thread/:id
// @access  Public
const getThread = async (req, res) => {
  try {
    const thread = await ForumThread.findById(req.params.id)
      .populate('user', 'name')
      .populate('comments.user', 'name');
    
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    // Increment view count
    thread.views += 1;
    await thread.save();
    
    res.json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new thread
// @route   POST /api/community/thread
// @access  Private
const createThread = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Please include title, content, and category' });
    }
    
    const thread = await ForumThread.create({
      title,
      content,
      category,
      user: req.user._id
    });
    
    const populatedThread = await ForumThread.findById(thread._id).populate('user', 'name');
    
    res.status(201).json(populatedThread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a comment to a thread
// @route   POST /api/community/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { threadId, content } = req.body;
    
    if (!threadId || !content) {
      return res.status(400).json({ message: 'Please include threadId and content' });
    }
    
    const thread = await ForumThread.findById(threadId);
    
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    
    thread.comments.push({
      user: req.user._id,
      content
    });
    
    await thread.save();
    
    const updatedThread = await ForumThread.findById(threadId)
      .populate('user', 'name')
      .populate('comments.user', 'name');
    
    res.json(updatedThread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getForums,
  getForumThreads,
  getThread,
  createThread,
  addComment
};