// routes/crisisRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getCrisisHotlines,
  getEmergencyResources
} = require('../controllers/crisisController');

router.get('/hotlines', getCrisisHotlines);
router.get('/resources', getEmergencyResources);

module.exports = router;