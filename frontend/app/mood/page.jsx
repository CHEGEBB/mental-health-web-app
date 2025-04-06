"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Smile, Frown, Meh, BarChart2, Calendar, AlertCircle, 
  ChevronDown, ChevronUp, Sparkles, Save, X, Check, 
  Coffee, Brain, Sun, Moon, Cloud, Heart, Activity,
  MessageCircle, Clock, HelpCircle, ArrowRight, Menu, 
  Music, BookOpen, Umbrella, ShoppingBag, Film, Users,
  Home, Trophy, Gift, Star, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { format, subDays, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const MoodTracker = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("mood");
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [moodNotes, setMoodNotes] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [showFactors, setShowFactors] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  
  // State for UI controls
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  
  // State for data
  const [moodHistory, setMoodHistory] = useState([]);
  const [moodInsights, setMoodInsights] = useState(null);
  const [error, setError] = useState(null);

  // Mood definitions with icons and colors
  const moods = [
    { 
      id: 'joyful', 
      emoji: '😄', 
      label: 'Joyful', 
      icon: <Smile className="w-8 h-8" />, 
      color: 'bg-yellow-400',
      textColor: 'text-yellow-900',
      hoverColor: 'hover:bg-yellow-300',
      description: 'Feeling happy, excited and full of positive energy'
    },
    { 
      id: 'grateful', 
      emoji: '🙏', 
      label: 'Grateful', 
      icon: <Heart className="w-8 h-8" />, 
      color: 'bg-pink-400',
      textColor: 'text-pink-900',
      hoverColor: 'hover:bg-pink-300',
      description: 'Feeling thankful and appreciative'
    },
    { 
      id: 'relaxed', 
      emoji: '😌', 
      label: 'Relaxed', 
      icon: <Sun className="w-8 h-8" />, 
      color: 'bg-emerald-400',
      textColor: 'text-emerald-900',
      hoverColor: 'hover:bg-emerald-300',
      description: 'Feeling calm, at peace and worry-free'
    },
    { 
      id: 'content', 
      emoji: '🙂', 
      label: 'Content', 
      icon: <ThumbsUp className="w-8 h-8" />, 
      color: 'bg-teal-400',
      textColor: 'text-teal-900',
      hoverColor: 'hover:bg-teal-300',
      description: 'Feeling satisfied and at ease'
    },
    { 
      id: 'neutral', 
      emoji: '😐', 
      label: 'Neutral', 
      icon: <Meh className="w-8 h-8" />, 
      color: 'bg-slate-400',
      textColor: 'text-slate-900',
      hoverColor: 'hover:bg-slate-300',
      description: 'Not feeling particularly positive or negative'
    },
    { 
      id: 'tired', 
      emoji: '😴', 
      label: 'Tired', 
      icon: <Coffee className="w-8 h-8" />, 
      color: 'bg-indigo-400',
      textColor: 'text-indigo-900',
      hoverColor: 'hover:bg-indigo-300',
      description: 'Feeling physically or mentally exhausted'
    },
    { 
      id: 'sad', 
      emoji: '😢', 
      label: 'Sad', 
      icon: <Frown className="w-8 h-8" />, 
      color: 'bg-blue-400',
      textColor: 'text-blue-900',
      hoverColor: 'hover:bg-blue-300',
      description: 'Feeling down, blue or unhappy'
    },
    { 
      id: 'anxious', 
      emoji: '😰', 
      label: 'Anxious', 
      icon: <AlertCircle className="w-8 h-8" />, 
      color: 'bg-amber-400',
      textColor: 'text-amber-900',
      hoverColor: 'hover:bg-amber-300',
      description: 'Feeling worried, nervous or uneasy'
    },
    { 
      id: 'stressed', 
      emoji: '😫', 
      label: 'Stressed', 
      icon: <Brain className="w-8 h-8" />, 
      color: 'bg-orange-400',
      textColor: 'text-orange-900',
      hoverColor: 'hover:bg-orange-300',
      description: 'Feeling overwhelmed or under pressure'
    },
    { 
      id: 'angry', 
      emoji: '😠', 
      label: 'Angry', 
      icon: <ThumbsDown className="w-8 h-8" />, 
      color: 'bg-red-400',
      textColor: 'text-red-900',
      hoverColor: 'hover:bg-red-300',
      description: 'Feeling mad, frustrated or irritated'
    },
    { 
      id: 'bored', 
      emoji: '🥱', 
      label: 'Bored', 
      icon: <Clock className="w-8 h-8" />, 
      color: 'bg-gray-400',
      textColor: 'text-gray-900',
      hoverColor: 'hover:bg-gray-300',
      description: 'Feeling uninterested or lacking enthusiasm'
    },
    { 
      id: 'excited', 
      emoji: '🤩', 
      label: 'Excited', 
      icon: <Star className="w-8 h-8" />, 
      color: 'bg-purple-400',
      textColor: 'text-purple-900',
      hoverColor: 'hover:bg-purple-300',
      description: 'Feeling enthusiastic and eager'
    }
  ];

  // Factors that might affect mood
  const factors = [
    { id: 'sleep', label: 'Sleep', icon: <Moon className="w-5 h-5" /> },
    { id: 'exercise', label: 'Exercise', icon: <Activity className="w-5 h-5" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Coffee className="w-5 h-5" /> },
    { id: 'social', label: 'Social Activity', icon: <Users className="w-5 h-5" /> },
    { id: 'work', label: 'Work/School', icon: <Brain className="w-5 h-5" /> },
    { id: 'health', label: 'Health', icon: <Heart className="w-5 h-5" /> },
    { id: 'weather', label: 'Weather', icon: <Cloud className="w-5 h-5" /> },
    { id: 'leisure', label: 'Leisure', icon: <Music className="w-5 h-5" /> },
    { id: 'learning', label: 'Learning', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'entertainment', label: 'Entertainment', icon: <Film className="w-5 h-5" /> },
    { id: 'home', label: 'Home Environment', icon: <Home className="w-5 h-5" /> },
    { id: 'achievement', label: 'Achievement', icon: <Trophy className="w-5 h-5" /> },
    { id: 'gifts', label: 'Gifts/Surprises', icon: <Gift className="w-5 h-5" /> },
    { id: 'weather', label: 'Bad Weather', icon: <Umbrella className="w-5 h-5" /> }
  ];

  // Activity suggestions
  const activityPresets = [
    'Got 8+ hours of sleep',
    'Exercised today',
    'Ate healthy meals',
    'Spent time with friends',
    'Meditated',
    'Worked on a hobby',
    'Had a productive workday',
    'Learned something new',
    'Helped someone',
    'Listened to music',
    'Watched a movie/show',
    'Read a book',
    'Went for a walk',
    'Cooked a meal',
    'Called family'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const slideVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  // Fetch mood history on component mount
  useEffect(() => {
    fetchMoodHistory();
  }, []);

  // Get mood data from backend
  const fetchMoodHistory = async () => {
    setLoading(true);
    try {
      // Mock data for now, in real app would use axios to fetch from backend
      // const response = await axios.get('http://localhost:5000/api/moods/history', {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
      // setMoodHistory(response.data);

      // For demo purposes, generate some mock data
      setTimeout(() => {
        const mockData = generateMockMoodData();
        setMoodHistory(mockData);
        generateMoodInsights(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching mood history:', error);
      setError('Failed to load your mood history. Please try again.');
      setLoading(false);
    }
  };

  // Generate mock mood data for demonstration
  const generateMockMoodData = () => {
    const mockData = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = subDays(today, i);
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const randomIntensity = Math.floor(Math.random() * 8) + 2;
      const randomFactors = factors
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map(f => f.id);
      
      mockData.push({
        id: date.getTime().toString(),
        date: date.toISOString(),
        mood: randomMood.id,
        intensity: randomIntensity,
        factors: randomFactors,
        notes: i % 3 === 0 ? 'Sample mood note entry for this day.' : ''
      });
    }
    
    return mockData;
  };

  // Generate insights based on mood history
  const generateMoodInsights = (moodData) => {
    // Count occurrences of each mood
    const moodCounts = {};
    moods.forEach(mood => {
      moodCounts[mood.id] = 0;
    });
    
    moodData.forEach(entry => {
      if (moodCounts[entry.mood] !== undefined) {
        moodCounts[entry.mood]++;
      }
    });
    
    // Find most common mood
    let mostCommonMood = null;
    let maxCount = 0;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        mostCommonMood = mood;
        maxCount = count;
      }
    });
    
    // Calculate average mood intensity
    const totalIntensity = moodData.reduce((sum, entry) => sum + entry.intensity, 0);
    const averageIntensity = (totalIntensity / moodData.length).toFixed(1);
    
    // Find correlations between factors and moods
    const factorMoodCorrelations = {};
    
    factors.forEach(factor => {
      const entriesWithFactor = moodData.filter(entry => 
        entry.factors && entry.factors.includes(factor.id)
      );
      
      if (entriesWithFactor.length > 1) {
        // Calculate what mood is most common when this factor is present
        const moodCountsWithFactor = {};
        
        entriesWithFactor.forEach(entry => {
          moodCountsWithFactor[entry.mood] = (moodCountsWithFactor[entry.mood] || 0) + 1;
        });
        
        let topMood = null;
        let topCount = 0;
        
        Object.entries(moodCountsWithFactor).forEach(([mood, count]) => {
          if (count > topCount) {
            topMood = mood;
            topCount = count;
          }
        });
        
        if (topMood && topCount > 1) {
          factorMoodCorrelations[factor.id] = {
            mood: topMood,
            count: topCount,
            percentage: Math.round((topCount / entriesWithFactor.length) * 100)
          };
        }
      }
    });
    
    // Generate insights
    const positiveFactors = Object.entries(factorMoodCorrelations)
      .filter(([_, data]) => {
        const mood = moods.find(m => m.id === data.mood);
        return ['joyful', 'grateful', 'relaxed', 'content', 'excited'].includes(data.mood);
      })
      .map(([factorId]) => factorId);
    
    const negativeFactors = Object.entries(factorMoodCorrelations)
      .filter(([_, data]) => {
        return ['sad', 'anxious', 'stressed', 'angry', 'tired'].includes(data.mood);
      })
      .map(([factorId]) => factorId);
    
    // Create recommendations based on patterns
    const recommendations = [];
    
    if (positiveFactors.includes('exercise')) {
      recommendations.push({
        title: 'Keep exercising',
        description: 'Physical activity seems to correlate with your positive moods.'
      });
    }
    
    if (negativeFactors.includes('sleep')) {
      recommendations.push({
        title: 'Focus on sleep quality',
        description: 'Your mood data suggests that sleep quality might be affecting your emotional state.'
      });
    }
    
    if (positiveFactors.includes('social')) {
      recommendations.push({
        title: 'Prioritize social connections',
        description: 'Spending time with others appears to boost your mood.'
      });
    }
    
    if (moodCounts['stressed'] > 3 || moodCounts['anxious'] > 3) {
      recommendations.push({
        title: 'Practice stress reduction',
        description: 'Consider incorporating mindfulness, meditation, or breathing exercises into your routine.'
      });
    }
    
    setMoodInsights({
      mostCommonMood,
      averageIntensity,
      factorCorrelations: factorMoodCorrelations,
      positiveFactors,
      negativeFactors,
      recommendations
    });
  };

  // Toggle factor selection
  const toggleFactor = (factorId) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter(id => id !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  // Add activity to list
  const addActivity = (activity) => {
    if (!activities.includes(activity) && activity.trim() !== '') {
      setActivities([...activities, activity.trim()]);
    }
  };

  // Remove activity from list
  const removeActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  // Get mood object by ID
  const getMoodById = (moodId) => {
    return moods.find(m => m.id === moodId) || null;
  };

  // Get factor object by ID
  const getFactorById = (factorId) => {
    return factors.find(f => f.id === factorId) || null;
  };

  // Handle mood selection
  const handleMoodSelection = (moodId) => {
    setSelectedMood(moodId);
  };

  // Generate AI suggestions based on selected mood
  const generateAiSuggestions = () => {
    if (!selectedMood) return;
    
    setAiAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const mood = getMoodById(selectedMood);
      let suggestions = [];
      
      // Tailored suggestions based on mood
      if (['sad', 'anxious', 'stressed', 'angry'].includes(selectedMood)) {
        suggestions = [
          {
            title: 'Take a deep breath',
            description: 'Practice deep breathing for 2 minutes. Inhale for 4 counts, hold for 4, exhale for 6.',
            icon: <Activity className="w-5 h-5 text-blue-500" />
          },
          {
            title: 'Change your environment',
            description: 'Go for a brief walk outside or move to a different room.',
            icon: <Sun className="w-5 h-5 text-yellow-500" />
          },
          {
            title: 'Practice gratitude',
            description: 'Write down three things you are grateful for right now.',
            icon: <Heart className="w-5 h-5 text-pink-500" />
          },
          {
            title: 'Connect with someone',
            description: 'Reach out to a friend or family member for support.',
            icon: <MessageCircle className="w-5 h-5 text-green-500" />
          }
        ];
      } else if (['tired', 'bored'].includes(selectedMood)) {
        suggestions = [
          {
            title: 'Take a power nap',
            description: '20 minutes of rest can help restore energy levels.',
            icon: <Moon className="w-5 h-5 text-indigo-500" />
          },
          {
            title: 'Light exercise',
            description: 'A short walk or quick stretching session can boost energy.',
            icon: <Activity className="w-5 h-5 text-green-500" />
          },
          {
            title: 'Hydrate',
            description: 'Drink a full glass of water - dehydration can cause fatigue.',
            icon: <Coffee className="w-5 h-5 text-blue-500" />
          },
          {
            title: 'Try something new',
            description: 'Break your routine with a new activity to stimulate your mind.',
            icon: <Star className="w-5 h-5 text-yellow-500" />
          }
        ];
      } else if (['joyful', 'grateful', 'relaxed', 'content', 'excited'].includes(selectedMood)) {
        suggestions = [
          {
            title: 'Savor this feeling',
            description: 'Take a moment to fully appreciate and be present in this positive state.',
            icon: <Sun className="w-5 h-5 text-yellow-500" />
          },
          {
            title: 'Share your positivity',
            description: 'Spread joy by connecting with someone or performing a kind act.',
            icon: <Heart className="w-5 h-5 text-pink-500" />
          },
          {
            title: 'Journal this moment',
            description: 'Write about how you feel to revisit when you need a boost later.',
            icon: <BookOpen className="w-5 h-5 text-purple-500" />
          },
          {
            title: 'Channel your energy',
            description: 'Use this positive state to work on something meaningful to you.',
            icon: <Trophy className="w-5 h-5 text-amber-500" />
          }
        ];
      } else {
        suggestions = [
          {
            title: 'Mindful moment',
            description: 'Take 5 minutes to practice mindfulness or meditation.',
            icon: <Brain className="w-5 h-5 text-purple-500" />
          },
          {
            title: 'Move your body',
            description: 'Even a short burst of physical activity can shift your mood.',
            icon: <Activity className="w-5 h-5 text-green-500" />
          },
          {
            title: 'Engage your senses',
            description: 'Listen to music, enjoy a favorite snack, or experience pleasing scents.',
            icon: <Music className="w-5 h-5 text-blue-500" />
          },
          {
            title: 'Set a small goal',
            description: 'Accomplish something small to build positive momentum.',
            icon: <Trophy className="w-5 h-5 text-amber-500" />
          }
        ];
      }
      
      setAiSuggestions({
        mood: selectedMood,
        moodLabel: mood?.label || 'Unknown',
        suggestions: suggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
      });
      
      setAiAnalyzing(false);
    }, 1500);
  };

  // Save mood to backend
  const handleSaveMood = async () => {
    if (!selectedMood) {
      setError('Please select a mood before saving');
      return;
    }
    
    setSaveStatus('saving');
    
    try {
      const moodData = {
        mood: selectedMood,
        intensity: moodIntensity,
        factors: selectedFactors,
        activities: activities,
        notes: moodNotes,
        timestamp: new Date().toISOString()
      };
      
      // In a real app, would send to backend
      // await axios.post('http://localhost:5000/api/moods/log', moodData, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });

      // Simulate API call
      setTimeout(() => {
        // Add to local state for immediate UI update
        const newEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...moodData
        };
        
        setMoodHistory([newEntry, ...moodHistory]);
        
        // Reset form
        setSaveStatus('saved');
        
        // Show success for 2 seconds
        setTimeout(() => {
          setSaveStatus(null);
          setSelectedMood(null);
          setMoodIntensity(5);
          setSelectedFactors([]);
          setActivities([]);
          setMoodNotes('');
          setAiSuggestions(null);
        }, 2000);
        
        // Update insights with new data
        generateMoodInsights([newEntry, ...moodHistory]);
      }, 1000);
    } catch (error) {
      console.error('Error saving mood:', error);
      setError('Failed to save your mood. Please try again.');
      setSaveStatus(null);
    }
  };

  return (
    <div className="flex font-sans text-white bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
      />
    

      {/* Main Content */}
      <main className="relative flex-1 overflow-auto bg-slate-800">
        {/* Header */}
<header className="flex items-center justify-between px-4 py-3 shadow-sm bg-slate-800 sm:px-6 lg:px-8">
<h1 className="text-xl font-semibold text-slate-400">Mood Tracker</h1>
<div className="flex items-center space-x-3">
<button
className="p-1 mr-3 rounded-md text-slate-600 hover:bg-slate-300 lg:hidden"
onClick={() => setSidebarOpen(true)}
>
<Menu className="w-6 h-6" />
</button>
{saveStatus === 'saving' && (
<span className="text-sm text-slate-600">Saving...</span>
)}
{saveStatus === 'saved' && (
<span className="flex items-center text-sm text-emerald-500">
<Check className="w-4 h-4 mr-1" /> Saved
</span>
)}
<button
className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
onClick={() => setShowHistory(!showHistory)}
>
<Calendar className="w-4 h-4 mr-1" />
{showHistory ? 'Hide History' : 'History'}
</button>
<button
className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
onClick={() => setShowInsights(!showInsights)}
>
<BarChart2 className="w-4 h-4 mr-1" />
{showInsights ? 'Hide Insights' : 'Insights'}
</button>
</div>
</header>
        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="p-4 mb-6 rounded-lg bg-red-500/80 backdrop-blur"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p>{error}</p>
                <button 
                  className="ml-auto"
                  onClick={() => setError(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Prompt */}
            <motion.div
              className="mb-6 text-center"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold sm:text-3xl">How are you feeling today?</h2>
              <p className="mt-1 text-slate-400">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </motion.div>

            {/* Mood Selection Cards */}
            <motion.div 
              className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              variants={itemVariants}
            >
              {moods.map(mood => (
                <motion.button
                  key={mood.id}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all ${mood.hoverColor} ${
                    selectedMood === mood.id 
                      ? `${mood.color} ${mood.textColor} ring-2 ring-white/50` 
                      : 'bg-slate-800/80 hover:bg-slate-700'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleMoodSelection(mood.id)}
                >
                  <span className="mb-2 text-2xl">{mood.emoji}</span>
                  <span className="mb-1 text-sm font-medium">{mood.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* AI Suggestions based on mood selection */}
            <AnimatePresence>
              {selectedMood && !aiSuggestions && !aiAnalyzing && (
                <motion.div 
                  className="px-4 py-3 mb-6 text-center rounded-lg bg-slate-700"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <button
                    className="flex items-center justify-center w-full px-4 py-2 mx-auto font-medium transition-colors rounded-lg sm:w-auto bg-blue-600/80 hover:bg-blue-500"
                    onClick={generateAiSuggestions}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get AI suggestions for this mood
                  </button>
                </motion.div>
              )}
              
              {aiAnalyzing && (
                <motion.div 
                  className="p-4 mb-6 text-center rounded-lg bg-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 mb-2 border-t-2 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                    <p className="text-slate-300">Analyzing your mood patterns...</p>
                  </div>
                </motion.div>
              )}
              
              {aiSuggestions && (
                <motion.div 
                  className="mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/60 to-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="px-4 py-3 border-b border-blue-800/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                        <h3 className="text-lg font-medium">AI Suggestions</h3>
                      </div>
                      <button 
                        className="p-1 rounded-full hover:bg-slate-700/50"
                        onClick={() => setAiSuggestions(null)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="mb-4 text-slate-300">
                      Based on your selection of <span className="font-medium text-white">{aiSuggestions.moodLabel}</span>, 
                      here are some suggestions that might help:
                    </p>
                    
                    <div className="grid gap-3 sm:grid-cols-3">
                      {aiSuggestions.suggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          className="p-3 transition-colors rounded-lg bg-slate-800/60 hover:bg-slate-700/60"
                        >
                          <div className="flex items-center mb-2">
                            {suggestion.icon}
                            <h4 className="ml-2 font-medium">{suggestion.title}</h4>
                          </div>
                          <p className="text-sm text-slate-300">{suggestion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mood Details Section (shown after mood selection) */}
            <AnimatePresence>
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Intensity Slider */}
                  <motion.div 
                    className="p-4 mb-6 rounded-lg bg-slate-800"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">How intense is this feeling?</h3>
                      <span className="text-lg font-bold">{moodIntensity}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={moodIntensity}
                      onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700"
                    />
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Intense</span>
                    </div>
                  </motion.div>

                  {/* Factors Section */}
                  <motion.div
                    className="p-4 mb-6 rounded-lg bg-slate-800"
                    variants={itemVariants}
                  >
                    <button
                      className="flex items-center justify-between w-full mb-3 text-left"
                      onClick={() => setShowFactors(!showFactors)}
                    >
                      <h3 className="text-sm font-medium">What factors might be affecting your mood?</h3>
                      {showFactors ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {showFactors && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                            {factors.map(factor => (
                              <button
                                key={factor.id}
                                className={`flex items-center p-2 text-sm rounded-md ${
                                  selectedFactors.includes(factor.id)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                                onClick={() => toggleFactor(factor.id)}
                              >
                                <div className="mr-2">
                                  {React.cloneElement(factor.icon, { 
                                    className: "w-4 h-4" 
                                  })}
                                </div>
                                <span>{factor.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {selectedFactors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedFactors.map(factorId => {
                          const factor = getFactorById(factorId);
                          return (
                            <span
                              key={factorId}
                              className="flex items-center px-2 py-1 text-xs text-blue-100 rounded-full bg-blue-600/30"
                            >
                              {factor?.icon && React.cloneElement(factor.icon, { className: "w-3 h-3 mr-1" })}
                              <span>{factor?.label || factorId}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* Activities Section */}
                  <motion.div
                    className="p-4 mb-6 rounded-lg bg-slate-800"
                    variants={itemVariants}
                  >
                    <button
                      className="flex items-center justify-between w-full mb-3 text-left"
                      onClick={() => setShowActivities(!showActivities)}
                    >
                      <h3 className="text-sm font-medium">Log activities or events from today</h3>
                      {showActivities ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {showActivities && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mb-3">
                            {activityPresets.map((activity, index) => (
                              <button
                                key={index}
                                className="px-3 py-1 text-xs rounded-full bg-slate-700 hover:bg-slate-600"
                                onClick={() => addActivity(activity)}
                              >
                                + {activity}
                              </button>
                            ))}
                          </div>
                          
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="Add your own activity..."
                              className="flex-1 px-3 py-2 text-white rounded-l-md bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                  addActivity(e.target.value.trim());
                                  e.target.value = '';
                                }
                              }}
                            />
                            <button
                              className="px-3 py-2 font-medium bg-blue-600 rounded-r-md hover:bg-blue-500"
                              onClick={() => {
                                const input = document.querySelector('input[placeholder="Add your own activity..."]');
                                if (input && input.value.trim()) {
                                  addActivity(input.value.trim());
                                  input.value = '';
                                }
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {activities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {activities.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center px-2 py-1 text-xs rounded-full bg-slate-700"
                          >
                            <span>{activity}</span>
                            <button
                              className="ml-1 text-slate-400 hover:text-white"
                              onClick={() => removeActivity(index)}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Notes Section */}
                  <motion.div
                    className="p-4 mb-6 rounded-lg bg-slate-800"
                    variants={itemVariants}
                  >
                    <h3 className="mb-2 text-sm font-medium">Additional notes (optional)</h3>
                    <textarea
                      value={moodNotes}
                      onChange={(e) => setMoodNotes(e.target.value)}
                      placeholder="How are you feeling? What's on your mind?"
                      className="w-full h-24 p-3 text-white rounded-md bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </motion.div>

                  {/* Save Button */}
                  <motion.div
                    className="mb-8 text-center"
                    variants={itemVariants}
                  >
                    <button
                      className="flex items-center justify-center px-6 py-3 mx-auto text-lg font-medium transition-all rounded-md bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSaveMood}
                      disabled={saveStatus === 'saving'}
                    >
                      {saveStatus === 'saving' ? (
                        <span>Saving...</span>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Mood Entry
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="fixed top-0 bottom-0 right-0 z-40 w-full overflow-y-auto shadow-xl md:max-w-md bg-slate-900"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-slate-900 border-slate-700">
              <h2 className="text-xl font-semibold">Mood History</h2>
              <button 
                className="p-1.5 rounded-full hover:bg-slate-700"
                onClick={() => setShowHistory(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-32 space-y-3">
                  <div className="w-8 h-8 border-t-2 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                  <span className="text-slate-400">Loading your mood history...</span>
                </div>
              ) : moodHistory.length === 0 ? (
                <div className="p-6 text-center rounded-lg bg-slate-800">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                  <h3 className="text-lg font-medium">No mood entries yet</h3>
                  <p className="mt-2 text-sm text-slate-400">Start tracking your mood to see your history here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {moodHistory.map((entry) => {
                    const mood = getMoodById(entry.mood);
                    return (
                      <div 
                        key={entry.id}
                        className="p-4 transition-colors rounded-lg bg-slate-800 hover:bg-slate-800/70"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-300">
                            {format(parseISO(entry.date), 'EEEE, MMMM d')}
                          </span>
                          <span className="flex items-center text-xs text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {format(parseISO(entry.date), 'h:mm a')}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 mr-3 rounded-full ${mood?.color || 'bg-slate-700'}`}>
                            <span className="text-xl">{mood?.emoji || '😐'}</span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium">{mood?.label || 'Unknown'}</h3>
                              <span className="ml-2 text-sm text-slate-400">{entry.intensity}/10</span>
                            </div>
                            
                            {entry.factors && entry.factors.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.factors.map(factorId => {
                                  const factor = getFactorById(factorId);
                                  return (
                                    <span 
                                      key={factorId}
                                      className="flex items-center px-2 py-0.5 text-xs rounded-full bg-slate-700"
                                    >
                                      {factor?.icon && React.cloneElement(factor.icon, { className: "w-3 h-3 mr-1" })}
                                      <span>{factor?.label || factorId}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {entry.notes && (
                          <div className="p-3 mt-3 text-sm rounded bg-slate-700/50 text-slate-300">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights Sidebar */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            className="fixed top-0 bottom-0 right-0 z-40 w-full overflow-y-auto shadow-xl md:max-w-md bg-slate-900"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-slate-900 border-slate-700">
              <h2 className="text-xl font-semibold">Mood Insights</h2>
              <button 
                className="p-1.5 rounded-full hover:bg-slate-700"
                onClick={() => setShowInsights(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-32 space-y-3">
                  <div className="w-8 h-8 border-t-2 border-b-2 border-blue-400 rounded-full animate-spin"></div>
                  <span className="text-slate-400">Analyzing your mood patterns...</span>
                </div>
              ) : !moodInsights || moodHistory.length < 3 ? (
                <div className="p-6 text-center rounded-lg bg-slate-800">
                  <BarChart2 className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                  <h3 className="text-lg font-medium">Not enough data for insights</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Track your mood for at least a few days to see patterns and personalized insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="p-4 rounded-lg bg-slate-800">
                    <h3 className="mb-3 text-lg font-medium">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-slate-700/70">
                        <span className="text-xs text-slate-400">Most common mood</span>
                        <div className="flex items-center mt-1">
                          {moodInsights.mostCommonMood && (
                            <>
                              <span className="mr-2 text-xl">
                                {getMoodById(moodInsights.mostCommonMood)?.emoji || '😐'}
                              </span>
                              <span className="font-medium">
                                {getMoodById(moodInsights.mostCommonMood)?.label || 'Unknown'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-700/70">
                        <span className="text-xs text-slate-400">Average intensity</span>
                        <div className="flex items-center mt-1">
                          <Activity className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="font-medium">{moodInsights.averageIntensity}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Correlations */}
                  {Object.keys(moodInsights.factorCorrelations).length > 0 && (
                    <div className="p-4 rounded-lg bg-slate-800">
                      <h3 className="mb-3 text-lg font-medium">Patterns & Correlations</h3>
                      <div className="space-y-3">
                        {Object.entries(moodInsights.factorCorrelations).map(([factorId, data]) => {
                          const factor = getFactorById(factorId);
                          const mood = getMoodById(data.mood);
                          return (
                            <div key={factorId} className="p-3 rounded-lg bg-slate-700/70">
                              <div className="flex items-center mb-1">
                                {factor?.icon && React.cloneElement(factor.icon, { className: "w-4 h-4 mr-2" })}
                                <span className="font-medium">{factor?.label || factorId}</span>
                              </div>
                              <p className="text-sm text-slate-300">
                                When this factor is present, you often feel{' '}
                                <span className="font-medium">{mood?.label || 'unknown'}</span>
                                {data.percentage ? ` (${data.percentage}% of the time)` : ''}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  {moodInsights.recommendations.length > 0 && (
                    <div className="p-4 rounded-lg bg-slate-800">
                      <h3 className="mb-3 text-lg font-medium">Recommendations</h3>
                      <div className="space-y-3">
                        {moodInsights.recommendations.map((rec, index) => (
                          <div key={index} className="p-3 rounded-lg bg-slate-700/70">
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="mt-1 text-sm text-slate-300">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* AI Analysis banner */}
                  <div className="p-4 text-center rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-blue-400" />
                    <h3 className="mb-1 text-lg font-medium">AI-Powered Analysis</h3>
                    <p className="mb-3 text-sm text-slate-300">
                      Unlock deeper insights about your mood patterns with our AI analysis tool.
                    </p>
                    <p className="text-xs text-blue-300">
                      Continue tracking your moods to receive personalized recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodTracker;