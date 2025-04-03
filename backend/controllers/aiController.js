const Journal = require('../models/Journal');
const Mood = require('../models/Mood');
const { analyzeSentiment, generateInsights } = require('../utils/sentimentAnalysis');
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Get AI insights based on mood and journal data
// @route   GET /api/ai/insights
// @access  Private
exports.getAiInsights = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    let startDate;
    const now = new Date();

    // Calculate start date based on requested period
    switch (period) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    // Get recent journal entries
    const journals = await Journal.find({
      user: req.user.id,
      createdAt: { $gte: startDate }
    }).sort({ createdAt: -1 });

    // Get recent mood logs
    const moods = await Mood.find({
      user: req.user.id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    // If there's not enough data, return a message
    if (journals.length === 0 && moods.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          message: 'Not enough data to generate insights. Please log more moods and journal entries.',
          insights: [],
          recommendations: []
        }
      });
    }

    // Prepare data for AI analysis
    const journalTexts = journals.map(j => j.content).join('\n\n');
    const moodData = moods.map(m => ({
      mood: m.primaryMood,
      intensity: m.intensity,
      date: m.date,
      factors: m.factors
    }));

    // Generate insights using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a mental health analysis assistant that provides helpful, empathetic insights based on mood and journal data. 
                   Focus on patterns, trends, and potential action items that could help the user. 
                   Be constructive, supportive, and non-judgmental. Do not diagnose medical conditions.`
        },
        {
          role: 'user',
          content: `Please analyze the following mood and journal data and provide 3-5 key insights and 2-3 personalized recommendations. 
                    Format your response as JSON with "insights" (array) and "recommendations" (array) keys.
                    
                    Journal entries: ${journalTexts.substring(0, 4000)}
                    
                    Mood data: ${JSON.stringify(moodData)}`
        }
      ],
      temperature: 0.5,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    // Parse the AI response
    const aiResponse = JSON.parse(response.choices[0].message.content);

    res.status(200).json({
      success: true,
      data: {
        insights: aiResponse.insights || [],
        recommendations: aiResponse.recommendations || []
      }
    });
  } catch (error) {
    console.error('Error generating AI insights:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating insights'
    });
  }
};

// @desc    Get sentiment analysis for text
// @route   POST /api/ai/analyze-sentiment
// @access  Private
exports.analyzeSentimentRoute = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to analyze'
      });
    }

    const analysis = await analyzeSentiment(text);

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing sentiment'
    });
  }
};

// @desc    Get custom mental health tips
// @route   GET /api/ai/tips
// @access  Private
exports.getMentalHealthTips = async (req, res) => {
  try {
    const { concern, mood } = req.query;

    // Build prompt based on parameters
    let prompt = 'Provide 3 helpful mental health tips';
    
    if (concern) {
      prompt += ` for dealing with ${concern}`;
    }
    
    if (mood) {
      prompt += ` when feeling ${mood}`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a supportive mental health assistant that provides practical, evidence-based tips. 
                   Keep your tips concise, actionable, and empathetic. Do not diagnose medical conditions.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    // Process the response
    const tipsText = response.choices[0].message.content;
    
    // Extract tips into an array
    const tipsArray = tipsText
      .split(/\d+\./)
      .filter(tip => tip.trim().length > 0)
      .map(tip => tip.trim());

    res.status(200).json({
      success: true,
      data: {
        tips: tipsArray
      }
    });
  } catch (error) {
    console.error('Error generating mental health tips:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating tips'
    });
  }
};

// @desc    Get emergency coping strategies
// @route   GET /api/ai/coping-strategies
// @access  Public
exports.getCopingStrategies = async (req, res) => {
  try {
    const { emotion, intensity } = req.query;

    // Define the emotion to address
    const targetEmotion = emotion || 'distress';
    const emotionIntensity = intensity || 'high';

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a compassionate mental health emergency responder. 
                   Provide immediate, practical coping strategies that can help someone 
                   experiencing intense emotions. Focus on grounding techniques, 
                   breathing exercises, and distress tolerance skills.`
        },
        {
          role: 'user',
          content: `I'm experiencing ${emotionIntensity} levels of ${targetEmotion}. 
                   What are 3-5 specific coping strategies I can use right now?`
        }
      ],
      temperature: 0.5,
      max_tokens: 400
    });

    // Process the response
    const strategiesText = response.choices[0].message.content;
    
    // Extract strategies into an array
    const strategiesArray = strategiesText
      .split(/\d+\.|\n\n/)
      .filter(strategy => strategy.trim().length > 0)
      .map(strategy => strategy.trim());

    res.status(200).json({
      success: true,
      data: {
        emotion: targetEmotion,
        intensity: emotionIntensity,
        strategies: strategiesArray
      }
    });
  } catch (error) {
    console.error('Error generating coping strategies:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating coping strategies'
    });
  }
};