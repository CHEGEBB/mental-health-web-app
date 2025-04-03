// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getUserAppointments,
  bookAppointment,
  cancelAppointment
} = require('../controllers/therapistController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getUserAppointments);
router.post('/', protect, bookAppointment);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;