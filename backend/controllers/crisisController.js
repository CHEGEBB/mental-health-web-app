// controllers/crisisController.js
const CrisisResource = require('../models/CrisisResource');

// @desc    Get crisis hotlines
// @route   GET /api/crisis/hotlines
// @access  Public
const getCrisisHotlines = async (req, res) => {
  try {
    const hotlines = await CrisisResource.find({ type: { $in: ['Hotline', 'TextLine'] } });
    res.json(hotlines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get emergency resources
// @route   GET /api/crisis/resources
// @access  Public
const getEmergencyResources = async (req, res) => {
  try {
    const resources = await CrisisResource.find({});
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCrisisHotlines,
  getEmergencyResources
};