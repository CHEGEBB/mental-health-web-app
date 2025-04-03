const axios = require('axios');
const { logger } = require('../middlewares/loggerMiddleware');

// Analyze sentiment from text
exports.analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a mental health analyst that evaluates sentiment and emotional states from text entries. Provide a JSON response with sentiment analysis.'
          },
          {
            role: 'user',
            content: `Analyze the emotional content and sentiment of this journal entry. Provide scores for different emotions and an overall sentiment rating: "${text}"`
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    logger.error('AI sentiment analysis error:', error);
    return {
      error: true,
      message: 'Failed to analyze sentiment'
    };
  }
};

// Generate mental health insights
exports.generateInsights = async (journalEntries, moodData) => {
  try {
    // Construct a condensed dataset for the AI
    const condensedEntries = journalEntries.map(entry => ({
      date: entry.createdAt,
      content: entry.content.substring(0, 300), // Limit length
      mood: entry.mood
    })).slice(-20); // Last 20 entries
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a mental health insights generator that provides helpful, compassionate analysis of mood and journal patterns. Respond with JSON containing insights, patterns, and suggestions.'
          },
          {
            role: 'user',
            content: `Generate insights based on these journal entries and mood data: ${JSON.stringify({
              entries: condensedEntries,
              moods: moodData
            })}`
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    logger.error('AI insights generation error:', error);
    return {
      error: true,
      message: 'Failed to generate insights'
    };
  }
};

// Generate coping strategies based on mood and triggers
exports.generateCopingStrategies = async (mood, triggers) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a mental health support assistant that provides evidence-based coping strategies. Provide JSON with specific, actionable coping techniques.'
          },
          {
            role: 'user',
            content: `Suggest 3-5 effective coping strategies for someone experiencing ${mood} mood with the following triggers: ${triggers.join(', ')}`
          }
        ],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    logger.error('AI coping strategies generation error:', error);
    return {
      error: true,
      message: 'Failed to generate coping strategies'
    };
  }
};