"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, Frown, Meh, BarChart2, Calendar, AlertCircle, 
  ChevronDown, ChevronUp, Sparkles, Save, X, Check, 
  Coffee, Brain, Sun, Moon, Cloud, Heart, Activity,
  MessageCircle, Clock, HelpCircle, ArrowRight,
  Menu
} from 'lucide-react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';

const MoodTracker = () => {
  // State for mood tracking
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [moodNotes, setMoodNotes] = useState('');
  const [showFactors, setShowFactors] = useState(false);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for history and insights
  const [showHistory, setShowHistory] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState(null);
  const [usingAI, setUsingAI] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  // State for mood assessment quiz
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  
  // References
  const moodHistoryRef = useRef(null);

  // Available moods with their attributes
  const moods = [
    { id: 'joyful', label: 'Joyful', icon: <Smile className="w-8 h-8" />, color: 'bg-yellow-400 text-yellow-900', hoverColor: 'hover:bg-yellow-300' },
    { id: 'happy', label: 'Happy', icon: <Smile className="w-8 h-8" />, color: 'bg-emerald-400 text-emerald-900', hoverColor: 'hover:bg-emerald-300' },
    { id: 'neutral', label: 'Neutral', icon: <Meh className="w-8 h-8" />, color: 'bg-blue-300 text-blue-900', hoverColor: 'hover:bg-blue-200' },
    { id: 'tired', label: 'Tired', icon: <Coffee className="w-8 h-8" />, color: 'bg-purple-300 text-purple-900', hoverColor: 'hover:bg-purple-200' },
    { id: 'sad', label: 'Sad', icon: <Frown className="w-8 h-8" />, color: 'bg-blue-400 text-blue-900', hoverColor: 'hover:bg-blue-300' },
    { id: 'anxious', label: 'Anxious', icon: <AlertCircle className="w-8 h-8" />, color: 'bg-amber-300 text-amber-900', hoverColor: 'hover:bg-amber-200' },
    { id: 'stressed', label: 'Stressed', icon: <Brain className="w-8 h-8" />, color: 'bg-orange-400 text-orange-900', hoverColor: 'hover:bg-orange-300' },
    { id: 'angry', label: 'Angry', icon: <Frown className="w-8 h-8" />, color: 'bg-red-400 text-red-900', hoverColor: 'hover:bg-red-300' }
  ];

  // Available factors that might affect mood
  const factors = [
    { id: 'sleep', label: 'Sleep', icon: <Moon className="w-4 h-4" /> },
    { id: 'exercise', label: 'Exercise', icon: <Activity className="w-4 h-4" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Coffee className="w-4 h-4" /> },
    { id: 'social', label: 'Social Activity', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'work', label: 'Work/School', icon: <Brain className="w-4 h-4" /> },
    { id: 'health', label: 'Health', icon: <Heart className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <Sun className="w-4 h-4" /> },
    { id: 'stress', label: 'Stress', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  // Activity presets
  const activityPresets = [
    'Exercised today', 'Got 8+ hours of sleep', 'Ate healthy meals', 
    'Spent time with friends', 'Worked overtime', 'Meditated', 
    'Had an important meeting', 'Conflict with someone',
    'Accomplished a goal', 'Learned something new'
  ];

  // Assessment questions
  const quizQuestions = [
    {
      id: 'energy',
      question: 'How would you rate your energy level today?',
      options: [
        { value: 1, label: 'Very low' },
        { value: 2, label: 'Low' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'High' },
        { value: 5, label: 'Very high' }
      ]
    },
    {
      id: 'sleep',
      question: 'How well did you sleep last night?',
      options: [
        { value: 1, label: 'Very poorly' },
        { value: 2, label: 'Poorly' },
        { value: 3, label: 'Adequately' },
        { value: 4, label: 'Well' },
        { value: 5, label: 'Very well' }
      ]
    },
    {
      id: 'stress',
      question: 'How stressed do you feel today?',
      options: [
        { value: 1, label: 'Extremely stressed' },
        { value: 2, label: 'Very stressed' },
        { value: 3, label: 'Moderately stressed' },
        { value: 4, label: 'Slightly stressed' },
        { value: 5, label: 'Not at all stressed' }
      ]
    },
    {
      id: 'focus',
      question: 'How is your ability to focus and concentrate?',
      options: [
        { value: 1, label: 'Very difficult to focus' },
        { value: 2, label: 'Somewhat difficult' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Good focus' },
        { value: 5, label: 'Excellent focus' }
      ]
    },
    {
      id: 'social',
      question: 'How connected do you feel to others today?',
      options: [
        { value: 1, label: 'Very disconnected' },
        { value: 2, label: 'Somewhat disconnected' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Connected' },
        { value: 5, label: 'Very connected' }
      ]
    }
  ];

  // Load mood history when component mounts
  useEffect(() => {
    fetchMoodHistory();
  }, []);

  // Simulate fetching mood history from API
  const fetchMoodHistory = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Generate some mock data for demonstration
        const today = new Date();
        const last30Days = eachDayOfInterval({
          start: subDays(today, 29),
          end: today
        });
        
        const mockMoodData = last30Days.map(date => {
          // Create some varied mock data
          const randomMood = moods[Math.floor(Math.random() * moods.length)];
          const randomIntensity = Math.floor(Math.random() * 10) + 1;
          
          return {
            id: date.getTime().toString(),
            date: date,
            mood: randomMood.id,
            intensity: randomIntensity,
            factors: Math.random() > 0.5 ? 
              factors.slice(0, Math.floor(Math.random() * 3) + 1).map(f => f.id) : 
              [],
            notes: Math.random() > 0.7 ? 'Sample mood note for this day.' : ''
          };
        });
        
        setMoodHistory(mockMoodData);
        setIsLoading(false);
        
        // Generate insights based on mock data
        generateInsights(mockMoodData);
      }, 1000);
    } catch (error) {
      console.error('Error fetching mood history:', error);
      setError('Failed to load mood history. Please try again later.');
      setIsLoading(false);
      toast.error('Failed to load mood history');
    }
  };

  // Generate insights based on mood history
  const generateInsights = (moodData) => {
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
      
      if (entriesWithFactor.length > 0) {
        // Simple calculation - what mood is most common when this factor is present
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
            count: topCount
          };
        }
      }
    });
    
    // Generate overall insights
    const insightsData = {
      mostCommonMood,
      averageIntensity,
      factorCorrelations: factorMoodCorrelations,
      recommendations: []
    };
    
    // Generate recommendations based on data
    if (moodCounts['stressed'] > 5 || moodCounts['anxious'] > 5) {
      insightsData.recommendations.push({
        title: 'Consider stress reduction techniques',
        description: 'You\'ve logged feeling stressed or anxious multiple times. Mindfulness meditation or breathing exercises might help.'
      });
    }
    
    if (factorMoodCorrelations['exercise'] && 
        ['happy', 'joyful'].includes(factorMoodCorrelations['exercise'].mood)) {
      insightsData.recommendations.push({
        title: 'Exercise seems to boost your mood',
        description: 'When you log exercise as a factor, you tend to report more positive moods.'
      });
    }
    
    if (factorMoodCorrelations['sleep'] && 
        ['tired', 'sad', 'stressed'].includes(factorMoodCorrelations['sleep'].mood)) {
      insightsData.recommendations.push({
        title: 'Sleep quality may be affecting your mood',
        description: 'Consider focusing on sleep hygiene as it appears to correlate with your mood states.'
      });
    }
    
    setInsights(insightsData);
  };

  // Toggle factor selection
  const toggleFactor = (factorId) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter(id => id !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  // Add activity to the list
  const addActivity = (activity) => {
    if (!activities.includes(activity) && activity.trim() !== '') {
      setActivities([...activities, activity]);
    }
  };

  // Remove activity from the list
  const removeActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  // Handle mood selection
  const handleMoodSelection = (moodId) => {
    setSelectedMood(moodId);
  };

  // Get mood color based on mood ID
  const getMoodColor = (moodId) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.color : 'bg-slate-400 text-slate-900';
  };

  // Get mood icon based on mood ID
  const getMoodIcon = (moodId) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.icon : <Meh className="w-6 h-6" />;
  };

  // Get mood label based on mood ID
  const getMoodLabel = (moodId) => {
    const mood = moods.find(m => m.id === moodId);
    return mood ? mood.label : 'Unknown';
  };

  // Get factor label based on factor ID
  const getFactorLabel = (factorId) => {
    const factor = factors.find(f => f.id === factorId);
    return factor ? factor.label : factorId;
  };

  // Get factor icon based on factor ID
  const getFactorIcon = (factorId) => {
    const factor = factors.find(f => f.id === factorId);
    return factor ? factor.icon : <HelpCircle className="w-4 h-4" />;
  };

  // Handle saving mood entry
  const handleSaveMood = async () => {
    if (!selectedMood) {
      toast.error('Please select a mood before saving');
      return;
    }
    
    try {
      setSaveStatus('saving');
      
      const moodEntry = {
        id: Date.now().toString(),
        date: new Date(),
        mood: selectedMood,
        intensity: moodIntensity,
        factors: selectedFactors,
        activities: activities,
        notes: moodNotes
      };
      
      // Simulate API call to save mood
      setTimeout(() => {
        // Add to history (in real app, this would be updated from API)
        setMoodHistory([moodEntry, ...moodHistory]);
        
        // Clear form
        setSelectedMood(null);
        setMoodIntensity(5);
        setSelectedFactors([]);
        setActivities([]);
        setMoodNotes('');
        
        // Show success feedback
        setSaveStatus('saved');
        toast.success('Mood tracked successfully!');
        
        // Reset save status after delay
        setTimeout(() => {
          setSaveStatus(null);
        }, 2000);
        
        // Update insights
        generateInsights([moodEntry, ...moodHistory]);
      }, 1000);
    } catch (error) {
      console.error('Error saving mood:', error);
      setSaveStatus(null);
      toast.error('Failed to save your mood. Please try again.');
    }
  };

  // Handle AI analysis request
  const handleAIAnalysis = () => {
    if (moodHistory.length < 3) {
      toast.error('Please log more moods for an AI analysis');
      return;
    }
    
    setAiLoading(true);
    setUsingAI(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const aiInsights = {
        ...insights,
        aiGenerated: true,
        detailedAnalysis: "Based on your mood data, I've observed several patterns. Your mood tends to improve on days when you've logged physical activity, particularly in the morning. There's also a correlation between your reported stress levels and sleep quality - when you sleep less than 7 hours, you're 60% more likely to report feeling stressed the next day. Consider establishing a more consistent sleep schedule to help stabilize your mood.",
        recommendations: [
          {
            title: 'Try morning exercise',
            description: 'Your data shows a 40% improvement in mood on days when you exercise in the morning versus days without exercise.'
          },
          {
            title: 'Consistent sleep schedule',
            description: 'Aim for 7-8 hours of sleep at consistent times. Your mood data shows significant improvements with regular sleep patterns.'
          },
          {
            title: 'Mindfulness practice',
            description: 'Consider adding a 5-minute mindfulness practice when you notice anxiety patterns appearing.'
          }
        ]
      };
      
      setInsights(aiInsights);
      setAiLoading(false);
    }, 3000);
  };

  // Handle quiz answers
  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  // Calculate quiz results
  const finishQuiz = () => {
    // Calculate average score
    const totalScore = Object.values(quizAnswers).reduce((sum, val) => sum + val, 0);
    const averageScore = totalScore / Object.values(quizAnswers).length;
    
    // Determine result based on score
    let resultMood, resultSuggestion;
    
    if (averageScore >= 4) {
      resultMood = 'happy';
      resultSuggestion = 'You seem to be doing well today! This is a great time to engage in creative activities or tackle challenging tasks.';
    } else if (averageScore >= 3) {
      resultMood = 'neutral';
      resultSuggestion = 'You appear to be in a balanced state today. Consider engaging in moderate self-care activities to maintain this balance.';
    } else if (averageScore >= 2) {
      resultMood = 'tired';
      resultSuggestion = 'You might be experiencing some strain today. Consider taking short breaks and practicing self-compassion.';
    } else {
      resultMood = 'sad';
      resultSuggestion = 'You seem to be having a challenging day. Consider reaching out for support and prioritizing rest and self-care.';
    }
    
    setQuizResult({
      mood: resultMood,
      suggestion: resultSuggestion,
      score: averageScore.toFixed(1)
    });
    
    // Automatically select the mood based on quiz result
    setSelectedMood(resultMood);
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
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

  return (
    <div className="flex h-screen bg-slate-600 font-['Poppins']">
  {/* Sidebar */}
  <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    activeRoute={activeRoute}
  />
  
  {/* Content area with flex column layout */}
  <div className="flex flex-col flex-1 overflow-hidden">
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

    {/* Main Content */}
    <main className="relative flex-1 overflow-auto bg-slate-800">
      {/* Error Alert */}
      {error && (
        <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-red-500">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-white" />
            <p className="text-white">{error}</p>
            <button 
              className="ml-auto text-white"
              onClick={() => setError(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

        <div className="flex flex-col w-full h-full overflow-auto">
          {/* Mood Tracker Entry Section */}
          <motion.div 
            className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Quiz Results */}
            <AnimatePresence>
              {quizResult && (
                <motion.div
                  className="p-4 mb-6 rounded-lg bg-slate-700"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">Your Assessment Result</h3>
                    <button 
                      className="p-1 text-slate-400 hover:text-white"
                      onClick={() => setQuizResult(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className={`p-2 mr-3 rounded-full ${getMoodColor(quizResult?.mood)}`}>
                      {getMoodIcon(quizResult?.mood)}
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        You're feeling <span className="font-semibold">{getMoodLabel(quizResult?.mood)}</span> today.
                      </p>
                      <p className="text-sm text-slate-300">Score: {quizResult?.score}/5.0</p>
                    </div>
                  </div>
                  <p className="p-3 text-sm rounded-lg bg-slate-600">{quizResult?.suggestion}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Prompt */}
            <motion.div
              className="mb-6 text-center"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-white">How are you feeling today?</h2>
              <p className="mt-1 text-slate-400">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
              {!showQuiz && !selectedMood && (
                <button
                  className="inline-flex items-center px-4 py-2 mt-3 text-sm font-medium text-white rounded-md bg-slate-600 hover:bg-slate-500"
                  onClick={() => setShowQuiz(true)}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Not sure? Take a quick assessment
                </button>
              )}
            </motion.div>

            {/* Quiz Questions */}
            <AnimatePresence>
              {showQuiz && !quizResult && (
                <motion.div 
                  className="w-full max-w-lg p-6 mx-auto mb-6 rounded-lg bg-slate-700"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Quick Mood Assessment</h3>
                    <span className="text-sm text-slate-400">Question {currentQuestion + 1}/{quizQuestions.length}</span>
                  </div>
                  
                  <p className="mb-4 text-lg text-white">{quizQuestions[currentQuestion].question}</p>
                  
                  <div className="space-y-2">
                    {quizQuestions[currentQuestion].options.map(option => (
                      <button
                        key={option.value}
                        className="flex items-center justify-between w-full p-3 text-left transition-colors rounded-md bg-slate-600 hover:bg-slate-500"
                        onClick={() => handleQuizAnswer(quizQuestions[currentQuestion].id, option.value)}
                      >
                        <span>{option.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      className="px-3 py-1 text-sm text-slate-300 hover:text-white"
                      onClick={() => {
                        if (currentQuestion > 0) {
                          setCurrentQuestion(currentQuestion - 1);
                        } else {
                          setShowQuiz(false);
                        }
                      }}
                    >
                      Back
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-slate-300 hover:text-white"
                      onClick={() => setShowQuiz(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mood Selection */}
            <motion.div 
              className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4 md:grid-cols-8"
              variants={itemVariants}
            >
              {moods.map(mood => (
                <motion.button
                  key={mood.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${mood.hoverColor} ${
                    selectedMood === mood.id 
                      ? `${mood.color} ring-2 ring-white` 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelection(mood.id)}
                >
                  <div className="mb-2">
                    {React.cloneElement(mood.icon, { 
                      className: `w-8 h-8 ${selectedMood === mood.id ? '' : 'text-slate-400'}` 
                    })}
                  </div>
                  <span className="text-sm font-medium">{mood.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Intensity Slider (shown only when mood is selected) */}
            {selectedMood && (
              <motion.div 
                className="p-4 mb-6 rounded-lg bg-slate-700"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">How intense is this feeling?</h3>
                  <span className="text-lg font-bold text-white">{moodIntensity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-600"
                />
                <div className="flex justify-between mt-1 text-xs text-slate-400">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
              </motion.div>
            )}

            {/* Factors Section */}
            {selectedMood && (
              <motion.div
                className="p-4 mb-6 rounded-lg bg-slate-700"
                variants={itemVariants}
              >
                <button
                  className="flex items-center justify-between w-full mb-3 text-left"
                  onClick={() => setShowFactors(!showFactors)}
                >
                  <h3 className="text-sm font-medium text-white">What factors might be affecting your mood?</h3>
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
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {factors.map(factor => (
                          <button
                            key={factor.id}
                            className={`flex items-center p-2 text-sm rounded-md ${
                              selectedFactors.includes(factor.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
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
                    {selectedFactors.map(factorId => (
                      <span
                        key={factorId}
                        className="flex items-center px-2 py-1 text-xs text-blue-100 rounded-full bg-blue-600/30"
                      >
                        {getFactorIcon(factorId)}
                        <span className="ml-1">{getFactorLabel(factorId)}</span>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Activities Section */}
            {selectedMood && (
              <motion.div
                className="p-4 mb-6 rounded-lg bg-slate-700"
                variants={itemVariants}
              >
                <button
                  className="flex items-center justify-between w-full mb-3 text-left"
                  onClick={() => setShowActivities(!showActivities)}
                >
                  <h3 className="text-sm font-medium text-white">Log activities or events from today</h3>
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
                            className="px-3 py-1 text-xs rounded-full bg-slate-600 text-slate-300 hover:bg-slate-500"
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
                          className="flex-1 px-3 py-2 rounded-l-md bg-slate-800 text-slate-200"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              addActivity(e.target.value.trim());
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          className="px-3 py-2 font-medium bg-blue-600 rounded-r-md text-blue-50 hover:bg-blue-500"
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
                        className="flex items-center px-2 py-1 text-xs rounded-full bg-slate-600 text-slate-300"
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
            )}

            {/* Notes Section */}
            {selectedMood && (
              <motion.div
                className="p-4 mb-6 rounded-lg bg-slate-700"
                variants={itemVariants}
              >
                <h3 className="mb-2 text-sm font-medium text-white">Additional notes (optional)</h3>
                <textarea
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="w-full h-24 p-3 rounded-md bg-slate-800 text-slate-200"
                />
              </motion.div>
            )}

            {/* Save Button */}
            {selectedMood && (
              <motion.div
                className="mb-8 text-center"
                variants={itemVariants}
              >
                <button
                  className="flex items-center justify-center px-6 py-2 mx-auto font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}
          </motion.div>
        </div>

        {/* History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              ref={moodHistoryRef}
              className="absolute top-0 bottom-0 right-0 w-full overflow-y-auto sm:max-w-sm lg:max-w-md bg-slate-900"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="sticky top-0 z-10 p-4 border-b bg-slate-900 border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Mood History</h2>
                  <button 
                    className="p-1 rounded-full hover:bg-slate-700"
                    onClick={() => setShowHistory(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <span className="text-slate-400">Loading history...</span>
                  </div>
                ) : moodHistory.length === 0 ? (
                  <div className="p-4 text-center rounded-lg bg-slate-800">
                    <p className="text-slate-400">No mood entries yet.</p>
                    <p className="mt-2 text-sm text-slate-500">Start tracking your mood to see your history.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {moodHistory.map((entry) => (
                      <div 
                        key={entry.id}
                        className="p-3 rounded-lg bg-slate-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-400">
                            {format(
                              typeof entry.date === 'string' 
                                ? new Date(entry.date) 
                                : entry.date, 
                              'MMM d, yyyy'
                            )}
                          </span>
                          <span className="flex items-center text-sm text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {format(
                              typeof entry.date === 'string' 
                                ? new Date(entry.date) 
                                : entry.date, 
                              'h:mm a'
                            )}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 mr-3 rounded-full ${getMoodColor(entry.mood)}`}>
                            {getMoodIcon(entry.mood)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-white">{getMoodLabel(entry.mood)}</h3>
                              <span className="ml-2 text-sm font-medium text-slate-400">{entry.intensity}/10</span>
                            </div>
                            
                            {entry.factors && entry.factors.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.factors.map(factor => (
                                  <span 
                                    key={factor}
                                    className="flex items-center px-2 py-0.5 text-xs rounded-full bg-slate-700 text-slate-300"
                                  >
                                    {getFactorIcon(factor)}
                                    <span className="ml-1">{getFactorLabel(factor)}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {entry.notes && (
                          <div className="p-2 mt-3 rounded bg-slate-700/50">
                            <p className="text-sm text-slate-300">{entry.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
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
              className="absolute top-0 bottom-0 right-0 w-full overflow-y-auto sm:max-w-sm lg:max-w-md bg-slate-900"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="sticky top-0 z-10 p-4 border-b bg-slate-900 border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Mood Insights</h2>
                  <button 
                    className="p-1 rounded-full hover:bg-slate-700"
                    onClick={() => setShowInsights(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <span className="text-slate-400">Loading insights...</span>
                  </div>
                ) : !insights ? (
                  <div className="p-4 text-center rounded-lg bg-slate-800">
                    <p className="text-slate-400">No insights available yet.</p>
                    <p className="mt-2 text-sm text-slate-500">Track your mood for at least a week to see patterns and insights.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="p-4 rounded-lg bg-slate-800">
                      <h3 className="mb-3 text-lg font-medium text-white">Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-slate-700">
                          <span className="text-xs text-slate-400">Most common mood</span>
                          <div className="flex items-center mt-1">
                            <div className={`p-1 mr-2 rounded-full ${getMoodColor(insights.mostCommonMood)}`}>
                              {React.cloneElement(getMoodIcon(insights.mostCommonMood), { className: "w-4 h-4" })}
                            </div>
                            <span className="font-medium text-white">{getMoodLabel(insights.mostCommonMood)}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-700">
                          <span className="text-xs text-slate-400">Average intensity</span>
                          <div className="flex items-center mt-1">
                            <Activity className="w-4 h-4 mr-2 text-blue-400" />
                            <span className="font-medium text-white">{insights.averageIntensity}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Correlations */}
                    {Object.keys(insights.factorCorrelations).length > 0 && (
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h3 className="mb-3 text-lg font-medium text-white">Patterns & Correlations</h3>
                        <div className="space-y-3">
                          {Object.entries(insights.factorCorrelations).map(([factorId, data]) => (
                            <div key={factorId} className="p-3 rounded-lg bg-slate-700">
                              <div className="flex items-center mb-1">
                                {getFactorIcon(factorId)}
                                <span className="ml-2 font-medium text-white">{getFactorLabel(factorId)}</span>
                              </div>
                              <p className="text-sm text-slate-300">
                                When this factor is present, you often feel{' '}
                                <span className="font-medium text-white">{getMoodLabel(data.mood)}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Recommendations */}
                    {insights.recommendations.length > 0 && (
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h3 className="mb-3 text-lg font-medium text-white">Recommendations</h3>
                        <div className="space-y-3">
                          {insights.recommendations.map((rec, index) => (
                            <div key={index} className="p-3 rounded-lg bg-slate-700">
                              <h4 className="font-medium text-white">{rec.title}</h4>
                              <p className="mt-1 text-sm text-slate-300">{rec.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* AI Analysis */}
                    {!usingAI && (
                      <div className="p-4 text-center">
                        <button
                          className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
                          onClick={handleAIAnalysis}
                          disabled={aiLoading}
                        >
                          {aiLoading ? (
                            <span>Analyzing...</span>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 mr-2" />
                              Get AI-Powered Analysis
                            </>
                          )}
                        </button>
                        <p className="mt-2 text-xs text-slate-400">
                          Our AI can analyze your mood patterns and provide personalized recommendations.
                        </p>
                      </div>
                    )}
                    
                    {/* Detailed AI Analysis when available */}
                    {insights.aiGenerated && (
                      <div className="p-4 rounded-lg bg-blue-900/30">
                        <div className="flex items-center mb-3">
                          <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                          <h3 className="text-lg font-medium text-white">AI Analysis</h3>
                        </div>
                        <p className="p-3 mb-3 text-sm rounded-lg bg-slate-800/50 text-slate-300">
                          {insights.detailedAnalysis}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
    </div>
  );
};

export default MoodTracker;