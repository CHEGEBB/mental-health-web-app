const Therapist = require('../models/therapist.model');

// Get all therapists
exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch therapists', error: error.message });
  }
};

// Get therapist by ID
exports.getTherapistById = async (req, res) => {
  try {
    const { id } = req.params;
    const therapist = await Therapist.findById(id);
    
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    
    res.status(200).json(therapist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch therapist', error: error.message });
  }
};