const Appointment = require('../models/appointment.model');
const Therapist = require('../models/therapist.model');

// Get all appointments for a specific user
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated
    const appointments = await Appointment.find({ userId })
      .populate('therapistId', 'name image title')
      .sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

// Get therapist's available slots
exports.getTherapistAvailability = async (req, res) => {
  try {
    const { therapistId, date } = req.params;
    const therapist = await Therapist.findById(therapistId);
    
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    
    // Convert date to day of week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    // Get available slots for that day
    const availableSlots = therapist.availability[dayOfWeek] || [];
    
    // Get booked appointments for that day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const bookedAppointments = await Appointment.find({
      therapistId: therapistId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'cancelled' }
    });
    
    // Filter out booked slots
    const bookedTimes = bookedAppointments.map(app => app.time);
    const availableTimes = availableSlots.filter(slot => !bookedTimes.includes(slot));
    
    res.status(200).json({ availableTimes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch availability', error: error.message });
  }
};

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { therapistId, date, time, appointmentType, notes } = req.body;
    const userId = req.user._id; // Assuming user is authenticated
    
    // Check if therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    
    // Check if slot is available
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
    const availableSlots = therapist.availability[dayOfWeek] || [];
    
    if (!availableSlots.includes(time)) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }
    
    // Check if slot is already booked
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingAppointment = await Appointment.findOne({
      therapistId,
      date: { $gte: startOfDay, $lte: endOfDay },
      time,
      status: { $ne: 'cancelled' }
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }
    
    // Create new appointment
    const newAppointment = new Appointment({
      therapistId,
      userId,
      date: new Date(date),
      time,
      appointmentType,
      notes,
      status: 'pending'
    });
    
    await newAppointment.save();
    
    res.status(201).json({ 
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if user is authorized (either the user who booked or the therapist)
    if (appointment.userId.toString() !== req.user._id.toString() && 
        appointment.therapistId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }
    
    appointment.status = status;
    await appointment.save();
    
    res.status(200).json({
      message: 'Appointment status updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
};