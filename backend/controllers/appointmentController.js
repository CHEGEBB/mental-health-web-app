const Appointment = require('../models/Appointment');
const Therapist = require('../models/Therapist');
const { sendEmail } = require('../services/emailService');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
exports.bookAppointment = async (req, res) => {
  try {
    const { therapistId, date, startTime, endTime, type, notes } = req.body;

    // Verify therapist exists and is accepting new clients
    const therapist = await Therapist.findById(therapistId)
      .populate('user', 'name email');

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }

    if (!therapist.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'This therapist has not been verified yet'
      });
    }

    if (!therapist.practiceDetails.acceptingNewClients) {
      return res.status(400).json({
        success: false,
        message: 'This therapist is not accepting new clients at this time'
      });
    }

    // Check for scheduling conflicts
    const appointmentDate = new Date(date);
    const conflictingAppointment = await Appointment.findOne({
      therapist: therapistId,
      date: appointmentDate,
      $or: [
        {
          // New appointment starts during existing appointment
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gt: startTime } }
          ]
        },
        {
          // New appointment ends during existing appointment
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gte: endTime } }
          ]
        },
        {
          // New appointment encompasses existing appointment
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } }
          ]
        }
      ],
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      user: req.user.id,
      therapist: therapistId,
      date: appointmentDate,
      startTime,
      endTime,
      type,
      notes
    });

    // Send confirmation email to user
    const user = await User.findById(req.user.id);
    await sendEmail({
      to: user.email,
      subject: 'Appointment Confirmation',
      text: `Your appointment with ${therapist.user.name} has been scheduled for ${date} at ${startTime}.
             Please note that this appointment is pending confirmation from the therapist.`
    });

    // Notify therapist
    await sendEmail({
      to: therapist.contactInfo.email || therapist.user.email,
      subject: 'New Appointment Request',
      text: `A new appointment has been requested by ${user.name} for ${date} at ${startTime}.
             Please log in to confirm or reschedule this appointment.`
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
exports.getUserAppointments = async (req, res) => {
  try {
    const { status, upcoming = 'true', page = 1, limit = 10 } = req.query;

    // Build query
    const query = { user: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    // Execute query with pagination
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { date: 1, startTime: 1 }
    };

    const appointments = await Appointment.find(query)
      .populate({
        path: 'therapist',
        select: 'user professionalTitle profilePicture',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort);

    // Get total count
    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      pagination: {
        page: options.page,
        limit: options.limit,
        pages: Math.ceil(total / options.limit)
      },
      data: appointments
    });
  } catch (error) {
    console.error('Error getting user appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get therapist's appointments
// @route   GET /api/appointments/therapist
// @access  Private (Therapist only)
exports.getTherapistAppointments = async (req, res) => {
  try {
    const { status, upcoming = 'true', page = 1, limit = 10 } = req.query;

    // Find therapist ID for the current user
    const therapist = await Therapist.findOne({ user: req.user.id });
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist profile not found'
      });
    }

    // Build query
    const query = { therapist: therapist._id };
    
    if (status) {
      query.status = status;
    }
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    // Execute query with pagination
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { date: 1, startTime: 1 }
    };

    const appointments = await Appointment.find(query)
      .populate({
        path: 'user',
        select: 'name email profilePicture'
      })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort);

    // Get total count
    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      pagination: {
        page: options.page,
        limit: options.limit,
        pages: Math.ceil(total / options.limit)
      },
      data: appointments
    });
  } catch (error) {
    console.error('Error getting therapist appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (User or Therapist)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, cancellationReason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization - either the user who booked or the therapist
    const isUser = appointment.user.toString() === req.user.id;
    
    const therapist = await Therapist.findOne({ user: req.user.id });
    const isTherapist = therapist && appointment.therapist.toString() === therapist._id.toString();
    
    if (!isUser && !isTherapist) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Users can only cancel appointments, therapists can confirm, reschedule, or cancel
    if (isUser && status !== 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Users can only cancel appointments'
      });
    }

    // Update status
    appointment.status = status;
    
    // Add cancellation reason if provided
    if (status === 'cancelled' && cancellationReason) {
      appointment.cancellationReason = cancellationReason;
    }
    
    await appointment.save();

    // Send notification emails
    if (status === 'confirmed') {
      const user = await User.findById(appointment.user);
      await sendEmail({
        to: user.email,
        subject: 'Appointment Confirmed',
        text: `Your appointment on ${appointment.date.toDateString()} at ${appointment.startTime} has been confirmed.`
      });
    } else if (status === 'cancelled') {
      // Notify the other party
      if (isUser) {
        const therapistDoc = await Therapist.findById(appointment.therapist)
          .populate('user', 'email');
        
        await sendEmail({
          to: therapistDoc.contactInfo.email || therapistDoc.user.email,
          subject: 'Appointment Cancelled',
          text: `An appointment on ${appointment.date.toDateString()} at ${appointment.startTime} has been cancelled by the client.
                 Reason: ${cancellationReason || 'No reason provided'}`
        });
      } else {
        const user = await User.findById(appointment.user);
        
        await sendEmail({
          to: user.email,
          subject: 'Appointment Cancelled',
          text: `Your appointment on ${appointment.date.toDateString()} at ${appointment.startTime} has been cancelled by the therapist.
                 Reason: ${cancellationReason || 'No reason provided'}`
        });
      }
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get a single appointment
// @route   GET /api/appointments/:id
// @access  Private (User or Therapist)
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email profilePicture'
      })
      .populate({
        path: 'therapist',
        select: 'user professionalTitle profilePicture contactInfo',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization - either the user who booked or the therapist
    const isUser = appointment.user._id.toString() === req.user.id;
    
    const therapist = await Therapist.findOne({ user: req.user.id });
    const isTherapist = therapist && appointment.therapist._id.toString() === therapist._id.toString();
    
    if (!isUser && !isTherapist) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error getting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};