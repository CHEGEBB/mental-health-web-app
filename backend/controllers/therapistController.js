// controllers/therapistController.js
const Therapist = require('../models/Therapist');
const Appointment = require('../models/Appointment');

// @desc    Get all therapists
// @route   GET /api/therapists
// @access  Public
const getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({});
    res.json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get therapist by ID
// @route   GET /api/therapists/:id
// @access  Public
const getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (therapist) {
      res.json(therapist);
    } else {
      res.status(404).json({ message: 'Therapist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('therapist', 'name credentials')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { therapistId, date, time, notes } = req.body;
    
    if (!therapistId || !date || !time) {
      return res.status(400).json({ message: 'Please include therapist, date, and time' });
    }
    
    // Check if therapist exists
    const therapist = await Therapist.findById(therapistId);
    
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    
    // Create appointment
    const appointment = await Appointment.create({
      user: req.user._id,
      therapist: therapistId,
      date: new Date(date),
      time,
      notes: notes || ''
    });
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('therapist', 'name credentials');
    
    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if the appointment belongs to the user
    if (appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTherapists,
  getTherapistById,
  getUserAppointments,
  bookAppointment,
  cancelAppointment
};