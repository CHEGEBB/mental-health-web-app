const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
router.get('/availability/:therapistId/:date', appointmentController.getTherapistAvailability);
router.post('/', appointmentController.createAppointment);
router.patch('/:appointmentId', appointmentController.updateAppointmentStatus);

module.exports = router;