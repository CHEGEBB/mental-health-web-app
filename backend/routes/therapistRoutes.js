// routes/therapistRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getTherapists,
  getTherapistById,
} = require('../controllers/therapistController');

router.get('/', getTherapists);
router.get('/:id', getTherapistById);

module.exports = router;