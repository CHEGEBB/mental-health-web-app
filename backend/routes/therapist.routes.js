const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapist.controller');

router.get('/', therapistController.getAllTherapists);
router.get('/:id', therapistController.getTherapistById);

module.exports = router;