"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Smile, Frown, Meh, BookOpen, Tag, Clock, Calendar, 
  BarChart2, ChevronDown, ChevronUp, Sparkles, Save, 
  MessageCircle, ThumbsUp, ThumbsDown, Image, Send, 
  X, Check, HelpCircle, Heart, Edit3, Sun, Moon, Coffee, 
  Cloud, Droplet, Wind, Umbrella,
  Menu, Trash2, AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Lottie from 'react-lottie';
import writingAnimation from '../lottie/writing.json';
import { format } from 'date-fns';
import journalService from '../services/journalService';
import toast from 'react-hot-toast';

const JournalPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('journal');
  const [isRecording, setIsRecording] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [mood, setMood] = useState(null);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [journalHistory, setJournalHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [entryDate, setEntryDate] = useState(new Date());
  const [saveStatus, setSaveStatus] = useState(null);
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const journalInputRef = useRef(null);
  const voiceRecognition = useRef(null);

  // Load journal entries from backend
  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      setIsLoading(true);
      const entries = await journalService.getEntries();
      setJournalHistory(entries);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      setError(error.message || 'Failed to load journal entries');
      setIsLoading(false);
      toast.error('Failed to load journal entries');
    }
  };

  // Simulating voice recording functionality
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Mock implementation - in real app would use Web Speech API
    console.log("Started recording...");
    // Add text as if transcribing after 2 seconds
    setTimeout(() => {
      setJournalContent(prev => prev + " I'm feeling a bit mixed today. Some good things happened at work, but I'm also feeling some anxiety about upcoming deadlines.");
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("Stopped recording");
  };

  // List of available tags
  const availableTags = [
    { id: 'anxiety', label: 'Anxiety', color: 'bg-red-100 text-red-800' },
    { id: 'depression', label: 'Depression', color: 'bg-blue-100 text-blue-800' },
    { id: 'happy', label: 'Happy Moment', color: 'bg-green-100 text-green-800' },
    { id: 'stress', label: 'Stress', color: 'bg-orange-100 text-orange-800' },
    { id: 'sleep', label: 'Sleep Issue', color: 'bg-purple-100 text-purple-800' },
    { id: 'gratitude', label: 'Gratitude', color: 'bg-teal-100 text-teal-800' },
    { id: 'work', label: 'Work', color: 'bg-gray-100 text-gray-800' },
    { id: 'relationships', label: 'Relationships', color: 'bg-pink-100 text-pink-800' },
    { id: 'exercise', label: 'Exercise', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'nutrition', label: 'Nutrition', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const getTagColor = (tagId) => {
    const tag = availableTags.find(tag => tag.id === tagId);
    return tag ? tag.color : 'bg-gray-100 text-gray-800';
  };

  const getTagLabel = (tagId) => {
    const tag = availableTags.find(tag => tag.id === tagId);
    return tag ? tag.label : tagId;
  };

  const handleSaveJournal = async () => {
    if (!journalContent.trim()) {
      toast.error('Journal content cannot be empty');
      return;
    }
    
    try {
      setSaveStatus('saving');
      
      const entryData = {
        title: journalTitle || `Journal Entry - ${format(entryDate, 'MMM dd, yyyy')}`,
        content: journalContent,
        mood: mood || 'neutral',
        tags: selectedTags,
        isPrivate: true
      };
      
      let updatedEntry;
      
      if (currentEntryId) {
        // Update existing entry
        updatedEntry = await journalService.updateEntry(currentEntryId, entryData);
        toast.success('Journal entry updated successfully');
      } else {
        // Create new entry
        updatedEntry = await journalService.createEntry(entryData);
        toast.success('Journal entry saved successfully');
      }
      
      // Refresh journal history
      await fetchJournalEntries();
      
      // Update current entry ID
      setCurrentEntryId(updatedEntry._id);
      
      setSaveStatus('saved');
      
      // Reset after a few seconds
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setSaveStatus(null);
      toast.error(error.message || 'Failed to save journal entry');
    }
  };

  const loadJournalEntry = async (entryId) => {
    try {
      setIsLoading(true);
      const entry = await journalService.getEntry(entryId);
      
      setJournalTitle(entry.title);
      setJournalContent(entry.content);
      setMood(entry.mood);
      setSelectedTags(entry.tags);
      setEntryDate(new Date(entry.createdAt));
      setCurrentEntryId(entry._id);
      setShowHistory(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading journal entry:', error);
      setIsLoading(false);
      toast.error('Failed to load journal entry');
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      if (window.confirm('Are you sure you want to delete this journal entry?')) {
        await journalService.deleteEntry(entryId);
        
        // If the deleted entry is the current one, reset the form
        if (entryId === currentEntryId) {
          handleNewEntry();
        }
        
        // Refresh journal history
        await fetchJournalEntries();
        toast.success('Journal entry deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast.error('Failed to delete journal entry');
    }
  };

  const handleNewEntry = () => {
    setJournalTitle('');
    setJournalContent('');
    setMood(null);
    setSelectedTags([]);
    setEntryDate(new Date());
    setCurrentEntryId(null);
    setShowHistory(false);
  };

  // AI assistance feature
  const handleAIHelp = async () => {
    if (!aiPrompt.trim()) return;
    
    setAiLoading(true);
    
    try {
      // This would be a real API call to your AI service
      // For now, we'll simulate it
      setTimeout(() => {
        let response = '';
        
        if (aiPrompt.toLowerCase().includes('anxious') || aiPrompt.toLowerCase().includes('anxiety')) {
          response = "I notice you're feeling anxious. Consider trying the 5-4-3-2-1 grounding technique: acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.";
        } else if (aiPrompt.toLowerCase().includes('sad') || aiPrompt.toLowerCase().includes('depressed')) {
          response = "I'm sorry you're feeling down. Remember that emotions are temporary and will pass. Consider reaching out to someone you trust, or try doing a small activity that normally brings you joy, even if you don't feel like it right now.";
        } else if (aiPrompt.toLowerCase().includes('stress') || aiPrompt.toLowerCase().includes('overwhelmed')) {
          response = "When you're feeling overwhelmed, try breaking down your concerns into smaller, manageable pieces. Focus on what you can control, and consider using a 'brain dump' to get all your thoughts on paper to create mental space.";
        } else {
          response = "Thank you for sharing your thoughts. Journaling regularly like this is a powerful way to process emotions and gain insight into patterns in your life. Would you like some prompts to explore this topic further?";
        }
        
        setAiResponse(response);
        setAiLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiLoading(false);
      toast.error('Failed to get AI assistance');
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: writingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const getWeatherIcon = () => {
    switch(weather) {
      case 'sunny': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-slate-400" />;
      case 'rainy': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'windy': return <Wind className="w-5 h-5 text-slate-400" />;
      case 'stormy': return <Umbrella className="w-5 h-5 text-purple-400" />;
      default: return <Sun className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-600 font-['Poppins']">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 shadow-sm bg-slate-800 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              className="p-1 mr-3 rounded-md text-slate-300 hover:bg-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-100">Mental Health Journal</h1>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus === 'saving' && (
              <span className="text-sm text-slate-300">Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center text-sm text-emerald-400">
                <Check className="w-4 h-4 mr-1" /> Saved
              </span>
            )}
            <button 
              className="flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setShowHistory(!showHistory)}
            >
              <BookOpen className="w-4 h-4 mr-1" /> 
              {showHistory ? 'Hide History' : 'Journal History'}
            </button>
            <button 
              className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setWeather(weather === 'sunny' ? 'cloudy' : 'sunny')}
            >
              {getWeatherIcon()}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="relative flex flex-1 overflow-hidden bg-slate-800">
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

          <AnimatePresence>
            {showHistory && (
              <motion.div 
                className="absolute top-0 right-0 z-10 w-full h-full overflow-y-auto shadow-xl bg-slate-700 md:w-96"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Journal History</h2>
                    <button 
                      className="text-slate-300 hover:text-slate-100"
                      onClick={() => setShowHistory(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button 
                    className="flex items-center justify-center w-full px-4 py-2 mb-4 font-medium text-white transition-colors rounded-md bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleNewEntry}
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> New Entry
                  </button>

                  {isLoading ? (
                    <div className="flex justify-center p-8">
                      <div className="w-8 h-8 border-4 rounded-full border-t-emerald-500 border-r-transparent border-b-emerald-500 border-l-transparent animate-spin"></div>
                    </div>
                  ) : journalHistory.length === 0 ? (
                    <div className="p-6 text-center text-slate-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No journal entries yet.</p>
                      <p className="mt-2 text-sm">Start writing to see your entries here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {journalHistory.map(entry => (
                        <motion.div 
                          key={entry._id}
                          className="p-3 transition-colors rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-600"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h3 
                              className="font-medium text-white cursor-pointer"
                              onClick={() => loadJournalEntry(entry._id)}
                            >{entry.title}</h3>
                            <div className="flex items-center space-x-2">
                              {entry.mood === 'happy' && <Smile className="w-4 h-4 text-emerald-400" />}
                              {entry.mood === 'sad' && <Frown className="w-4 h-4 text-blue-400" />}
                              {entry.mood === 'anxious' && <Meh className="w-4 h-4 rotate-180 text-amber-400" />}
                              {entry.mood === 'neutral' && <Meh className="w-4 h-4 text-slate-400" />}
                              {entry.mood === 'angry' && <Frown className="w-4 h-4 text-red-400" />}
                              <button 
                                className="p-1 text-slate-400 hover:text-red-400"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEntry(entry._id);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div 
                            className="flex items-center mb-2 text-xs text-slate-400"
                            onClick={() => loadJournalEntry(entry._id)}
                          >
                            <Calendar className="w-3 h-3 mr-1" /> 
                            {format(new Date(entry.createdAt), 'yyyy-MM-dd')}
                          </div>
                          <p 
                            className="text-sm text-slate-300 line-clamp-2"
                            onClick={() => loadJournalEntry(entry._id)}
                          >
                            {entry.content}
                          </p>
                          {entry.tags && entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.tags.slice(0, 3).map(tag => (
                                <span 
                                  key={tag} 
                                  className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                                >
                                  {getTagLabel(tag)}
                                </span>
                              ))}
                              {entry.tags.length > 3 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-600 text-slate-300">
                                  +{entry.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col w-full h-full overflow-auto">
            {/* Journal Content */}
            <motion.div 
              className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <motion.div
                    className="10 absolut"
                    variants={itemVariants}
                  >
                    <Lottie options={defaultOptions} height={100} width={100} />
                  </motion.div>
                  <motion.div 
                    variants={itemVariants} 
                    className="ml-2"
                  >
                    <h2 className="text-xl font-semibold text-white">How are you feeling today?</h2>
                    <p className="text-sm text-slate-400">{format(entryDate, 'EEEE, MMMM d, yyyy')}</p>
                  </motion.div>
                </div>
                
                <div className="items-center hidden sm:flex">
                  <button 
                    className="flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                    onClick={() => setShowAIHelp(!showAIHelp)}
                  >
                    <Sparkles className="w-4 h-4 mr-1" /> 
                    AI Help
                  </button>
                  <button 
                    className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleSaveJournal}
                  >
                    <Save className="w-4 h-4 mr-1" /> 
                    {currentEntryId ? 'Update Entry' : 'Save Entry'}
                  </button>
                </div>
              </div>
              
              {/* Mood Selection */}
              <motion.div 
                className="flex items-center justify-center p-4 mb-6 rounded-lg bg-slate-700"
                variants={itemVariants}
              >
                <button 
                  className={`flex flex-col items-center p-2 mx-2 rounded-lg hover:bg-slate-600 ${mood === 'happy' ? 'bg-slate-600 ring-2 ring-emerald-400' : ''}`}
                  onClick={() => setMood('happy')}
                >
                  <Smile className={`w-8 h-8 ${mood === 'happy' ? 'text-emerald-400' : 'text-slate-300'}`} />
                  <span className={`mt-1 text-sm ${mood === 'happy' ? 'text-emerald-400' : 'text-slate-300'}`}>Happy</span>
                </button>
                <button 
                  className={`flex flex-col items-center p-2 mx-2 rounded-lg hover:bg-slate-600 ${mood === 'neutral' ? 'bg-slate-600 ring-2 ring-slate-400' : ''}`}
                  onClick={() => setMood('neutral')}
                >
                  <Meh className={`w-8 h-8 ${mood === 'neutral' ? 'text-slate-400' : 'text-slate-300'}`} />
                  <span className={`mt-1 text-sm ${mood === 'neutral' ? 'text-slate-400' : 'text-slate-300'}`}>Neutral</span>
                </button>
                <button 
                  className={`flex flex-col items-center p-2 mx-2 rounded-lg hover:bg-slate-600 ${mood === 'sad' ? 'bg-slate-600 ring-2 ring-blue-400' : ''}`}
                  onClick={() => setMood('sad')}
                >
                  <Frown className={`w-8 h-8 ${mood === 'sad' ? 'text-blue-400' : 'text-slate-300'}`} />
                  <span className={`mt-1 text-sm ${mood === 'sad' ? 'text-blue-400' : 'text-slate-300'}`}>Sad</span>
                </button>
                <button 
                  className={`flex flex-col items-center p-2 mx-2 rounded-lg hover:bg-slate-600 ${mood === 'anxious' ? 'bg-slate-600 ring-2 ring-amber-400' : ''}`}
                  onClick={() => setMood('anxious')}
                >
                  <Meh className={`w-8 h-8 rotate-180 ${mood === 'anxious' ? 'text-amber-400' : 'text-slate-300'}`} />
                  <span className={`mt-1 text-sm ${mood === 'anxious' ? 'text-amber-400' : 'text-slate-300'}`}>Anxious</span>
                </button>
                <button 
                  className={`flex flex-col items-center p-2 mx-2 rounded-lg hover:bg-slate-600 ${mood === 'angry' ? 'bg-slate-600 ring-2 ring-red-400' : ''}`}
                  onClick={() => setMood('angry')}
                >
                  <Frown className={`w-8 h-8 ${mood === 'angry' ? 'text-red-400' : 'text-slate-300'}`} />
                  <span className={`mt-1 text-sm ${mood === 'angry' ? 'text-red-400' : 'text-slate-300'}`}>Angry</span>
                </button>
              </motion.div>
              
              {/* Journal Entry Fields */}
              <motion.div 
                className="flex-1 mb-6"
                variants={itemVariants}
              >
                <input
                  type="text"
                  placeholder="Journal title (optional)"
                  className="w-full px-4 py-2 mb-4 text-lg text-white bg-transparent border-b border-slate-600 focus:border-emerald-500 focus:outline-none"
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                />
                
                <div className="relative flex-1">
                  <textarea
                    ref={journalInputRef}
                    className="w-full h-48 p-4 text-white rounded-lg resize-none bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Write about your day, thoughts, feelings, or experiences... (or click the microphone to speak)"
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                  />
                  
                  <div className="absolute bottom-0 right-0 flex p-2">
                    <button 
                      className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {isRecording && (
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full p-2 text-white bg-red-500 rounded-t-lg animate-pulse">
                      Recording... Speak clearly
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Tags Section */}
              <motion.div 
                className="mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-slate-300" />
                    <h3 className="text-sm font-medium text-white">Tags</h3>
                  </div>
                  <button 
                    className="flex items-center text-sm text-slate-300 hover:text-white"
                    onClick={() => setShowTagMenu(!showTagMenu)}
                  >
                    {showTagMenu ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" /> Hide Tags
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" /> Browse Tags
                      </>
                    )}
                  </button>
                </div>
                
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTags.map(tagId => (
                      <div 
                        key={tagId} 
                        className={`flex items-center px-3 py-1 text-sm rounded-full ${getTagColor(tagId)}`}
                      >
                        {getTagLabel(tagId)}
                        <button 
                          className="ml-1 text-slate-500 hover:text-slate-700"
                          onClick={() => toggleTag(tagId)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <AnimatePresence>
                  {showTagMenu && (
                    <motion.div 
                      className="p-3 rounded-lg bg-slate-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => (
                          <motion.button 
                            key={tag.id}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedTags.includes(tag.id) 
                                ? tag.color 
                                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                            }`}
                            onClick={() => toggleTag(tag.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tag.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Save Button - Mobile Only */}
              <motion.div
                className="flex justify-center mt-4 sm:hidden"
                variants={itemVariants}
              >
                <button 
                  className="flex items-center justify-center w-full px-4 py-3 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSaveJournal}
                >
                  <Save className="w-5 h-5 mr-2" /> 
                  Save Journal Entry
                </button>
              </motion.div>
            </motion.div>
            
            {/* AI Help Section */}
            <AnimatePresence>
              {showAIHelp && (
                <motion.div 
                  className="flex flex-col p-4 border-t sm:flex-row border-slate-600 bg-slate-700"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <div className="flex-1 p-3 mr-4 overflow-y-auto rounded-lg bg-slate-800 max-h-60">
                    {aiResponse ? (
                      <div className="p-3 rounded-lg bg-slate-600">
                        <div className="flex items-center mb-2">
                          <Sparkles className="w-5 h-5 mr-2 text-amber-400" />
                          <span className="font-medium text-white">AI Mental Health Assistant</span>
                        </div>
                        <p className="text-sm text-slate-300">{aiResponse}</p>
                        <div className="flex items-center justify-end mt-3 space-x-2">
                          <button className="p-1 text-slate-400 hover:text-slate-300">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-slate-300">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-slate-300">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <HelpCircle className="w-10 h-10 mb-2 text-slate-500" />
                        <p className="text-center text-slate-400">
                          Ask the AI assistant for mental health insights, suggestions, or journaling prompts.
                        </p>
                      </div>
                    )}
                    
                    {aiLoading && (
                      <div className="flex items-center justify-center w-full h-8 mt-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full animate-bounce bg-emerald-400"></div>
                          <div className="w-2 h-2 rounded-full animate-bounce bg-emerald-400" style={{animationDelay: "0.1s"}}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce bg-emerald-400" style={{animationDelay: "0.2s"}}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex mt-3 sm:mt-0">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 bg-slate-800 text-slate-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Ask for suggestions..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAIHelp()}
                    />
                    <button 
                      className="px-4 py-2 text-white rounded-r-md bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleAIHelp}
                      disabled={aiLoading}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JournalPage;