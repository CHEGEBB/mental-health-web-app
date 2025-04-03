// controllers/resourceController.js
const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific resource
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get resources by type
// @route   GET /api/resources/:type
// @access  Public
const getResourcesByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['Article', 'Video', 'Exercise', 'Meditation'].includes(type)) {
      return res.status(400).json({ message: 'Invalid resource type' });
    }
    
    const resources = await Resource.find({ type }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getResources,
  getResourceById,
  getResourcesByType
};