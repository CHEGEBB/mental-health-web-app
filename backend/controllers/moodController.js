// controllers/moodController.js
const Mood = require('../models/Mood');
const axios = require('axios');

// @desc    Log a new mood entry
// @route   POST /api/moods/log
// @access  Private
const logMood = async (req, res) => {
  try {
    const { rating, emotion, note, factors } = req.body;

    const mood = await Mood.create({
      user: req.user._id,
      rating,
      emotion,
      note,
      factors
    });

    res.status(201).json(mood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get mood history for a user
// @route   GET /api/moods/history
// @access  Private
const getMoodHistory = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .sort({ date: -1 });
    
    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get mood trends analysis
// @route   GET /api/moods/trends
// @access  Private
const getMoodTrends = async (req, res) => {
  try {
    // Get last 30 days of moods
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const moods = await Mood.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: 1 });

    // Simple analysis - average mood rating
    let totalRating = 0;
    const emotionCount = {};
    const factorCount = {};
    
    moods.forEach(mood => {
      totalRating += mood.rating;
      
      // Count emotions
      emotionCount[mood.emotion] = (emotionCount[mood.emotion] || 0) + 1;
      
      // Count factors
      if (mood.factors && mood.factors.length > 0) {
        mood.factors.forEach(factor => {
          factorCount[factor] = (factorCount[factor] || 0) + 1;
        });
      }
    });

    const averageRating = moods.length > 0 ? totalRating / moods.length : 0;
    
    // Find most common emotion
    let mostCommonEmotion = null;
    let highestCount = 0;
    
    for (const emotion in emotionCount) {
      if (emotionCount[emotion] > highestCount) {
        mostCommonEmotion = emotion;
        highestCount = emotionCount[emotion];
      }
    }
    
    // Find top factors
    const topFactors = Object.entries(factorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([factor]) => factor);

    res.json({
      totalEntries: moods.length,
      averageRating,
      mostCommonEmotion,
      emotionBreakdown: emotionCount,
      topFactors,
      moods: moods.map(mood => ({
        date: mood.date,
        rating: mood.rating,
        emotion: mood.emotion
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get AI-generated insights based on mood data
// @route   GET /api/moods/insights
// @access  Private
const getMoodInsights = async (req, res) => {
  try {
    // Get last 30 days of moods
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const moods = await Mood.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: 1 });

    if (moods.length === 0) {
      return res.json({
        insights: "You haven't logged enough mood entries yet. Start tracking your moods to receive personalized insights."
      });
    }

    // Prepare data for AI analysis
    const moodData = moods.map(mood => ({
      date: mood.date.toISOString().split('T')[0],
      rating: mood.rating,
      emotion: mood.emotion,
      factors: mood.factors || [],
      note: mood.note || ""
    }));

    // If DeepSeek API key is available, use it for AI insights
    if (process.env.DEEPSEEK_API_KEY) {
      try {
        const response = await axios.post(
          'https://api.deepseek.com/v1/chat/completions',
          {
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: "You are a mental health assistant. Analyze the mood data provided and give helpful insights."
              },
              {
                role: "user",
                content: `Analyze this mood data and provide 3-4 helpful insights and suggestions: ${JSON.stringify(moodData)}`
              }
            ],
            max_tokens: 500
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            }
          }
        );

        return res.json({
          insights: response.data.choices[0].message.content,
          aiGenerated: true
        });
      } catch (aiError) {
        console.error('AI API error:', aiError);
        // Fall back to basic insights if AI fails
      }
    }

    // Basic insights (fallback if AI is unavailable)
    let basicInsight = '';
    
    // Calculate average mood
    const avgRating = moodData.reduce((sum, entry) => sum + entry.rating, 0) / moodData.length;
    
    if (avgRating < 4) {
      basicInsight = "Your mood has been generally low lately. Consider reaching out to a professional or trusted friend for support. Small self-care activities can also help improve your wellbeing.";
    } else if (avgRating < 7) {
      basicInsight = "Your mood has been moderate recently. Pay attention to factors that seem to improve your mood and try to incorporate more of those into your routine.";
    } else {
      basicInsight = "Your mood has been generally positive! Continue with the activities and habits that support your wellbeing.";
    }

    res.json({
      insights: basicInsight,
      aiGenerated: false,
      averageMood: avgRating.toFixed(1)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  logMood,
  getMoodHistory,
  getMoodTrends,
  getMoodInsights
};