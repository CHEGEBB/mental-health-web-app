// controllers/journalController.js
const JournalEntry = require('../models/Journal');

// @desc    Create a new journal entry
// @route   POST /api/journal/entry
// @access  Private
const createEntry = async (req, res) => {
  try {
    const { title, content, tags, isPrivate } = req.body;

    const entry = await JournalEntry.create({
      user: req.user._id,
      title,
      content,
      tags,
      isPrivate: isPrivate || true
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all journal entries for a user
// @route   GET /api/journal/entries
// @access  Private
const getEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single journal entry
// @route   GET /api/journal/entry/:id
// @access  Private
const getEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check if the entry belongs to the user
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a journal entry
// @route   PUT /api/journal/entry/:id
// @access  Private
const updateEntry = async (req, res) => {
  try {
    const { title, content, tags, isPrivate } = req.body;

    let entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check if the entry belongs to the user
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    entry.title = title || entry.title;
    entry.content = content || entry.content;
    entry.tags = tags || entry.tags;
    entry.isPrivate = isPrivate !== undefined ? isPrivate : entry.isPrivate;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journal/entry/:id
// @access  Private
const deleteEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check if the entry belongs to the user
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await entry.deleteOne();
    res.json({ message: 'Entry removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry
};