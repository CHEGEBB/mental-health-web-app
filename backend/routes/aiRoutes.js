const express = require('express');
const router = express.Router();
const { 
  getAiInsights, 
  analyzeSentimentRoute, 
  getMentalHealthTips,
  getCopingStrategies
} = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/coping-strategies', getCopingStrategies);

// Protected routes
router.get('/insights', protect, getAiInsights);
router.post('/analyze-sentiment', protect, analyzeSentimentRoute);
router.get('/tips', protect, getMentalHealthTips);

module.exports = router;