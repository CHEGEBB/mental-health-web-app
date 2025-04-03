// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const { 
  logMood,
  getMoodHistory,
  getMoodTrends,
  getMoodInsights
} = require('../controllers/moodController');
const { protect } = require('../middlewares/auth');

router.post('/log', protect, logMood);
router.get('/history', protect, getMoodHistory);
router.get('/trends', protect, getMoodTrends);
router.get('/insights', protect, getMoodInsights);

module.exports = router;