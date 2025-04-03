"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Edit3, Save, Camera, X, CheckCircle, RefreshCw, 
  Brain, Heart, Smile, Activity, Award, Moon, Coffee,
  ChevronDown, ChevronUp, Menu, PieChart, BarChart2,
  MapPin, Briefcase, Bookmark, Book, Music, Film, Globe,
  ShieldAlert, Lock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth'; 

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedMetricView, setSelectedMetricView] = useState('chart'); // 'chart' or 'stats'
  const [expandedSection, setExpandedSection] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Use the auth hook to get current user and update methods
  const { user, updateUserProfile, updateUserEmail, updateUserPassword, loading } = useAuth();
  
  // User profile state with expanded details
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Clinical psychologist with a focus on anxiety disorders and mindfulness techniques. I'm using this app to track my own mental health journey while helping others. Outside of work, I'm an avid hiker, amateur photographer, and passionate about supporting mental health awareness in my community.",
    avatar: "15", // Using avatar API index
    gender: "female", // for avatar API
    location: "Seattle, Washington",
    occupation: "Clinical Psychologist",
    joinDate: "2024-09-15",
    timezone: "America/Los_Angeles",
    interests: ["Hiking", "Meditation", "Photography", "Reading", "Jazz Music"],
    favoriteQuote: "The greatest discovery of my generation is that human beings can alter their lives by altering their attitudes of mind.",
    books: ["The Body Keeps the Score", "Man's Search for Meaning", "Thinking, Fast and Slow"],
    music: ["Jazz", "Classical", "Ambient"],
    languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
    weeklyGoals: {
      meditation: { target: 7, completed: 5 },
      exercise: { target: 5, completed: 3 },
      journaling: { target: 7, completed: 6 }
    },
    metrics: {
      moodScore: 78,
      sleepQuality: 65,
      anxietyLevel: 42,
      stressLevel: 51,
      mindfulnessDays: 15,
      journalStreak: 8
    }
  });
  
  // Form state for editing
  const [formData, setFormData] = useState({...profile});
  
  // Load user data on mount
  useEffect(() => {
    if (user) {
      // Update profile with actual user data if available
      setProfile(prevProfile => ({
        ...prevProfile,
        name: user.name || prevProfile.name,
        email: user.email || prevProfile.email,
      }));
      setFormData(prevFormData => ({
        ...prevFormData,
        name: user.displayName || prevFormData.name,
        email: user.email || prevFormData.email,
      }));
    }
  }, [user]);
  
  // Available avatars using the API
  const generateAvatarOptions = () => {
    const options = [];
    // Generate 8 male and 8 female avatars
    for (let i = 1; i <= 8; i++) {
      options.push({ id: `${i}`, gender: "male", name: `Avatar ${i}` });
    }
    for (let i = 9; i <= 16; i++) {
      options.push({ id: `${i}`, gender: "female", name: `Avatar ${i}` });
    }
    return options;
  };
  
  const avatars = generateAvatarOptions();
  
  // Reset form when toggling edit mode
  useEffect(() => {
    if (!editMode) {
      setFormData({...profile});
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordError('');
    }
  }, [editMode, profile]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleMetricChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      metrics: {
        ...formData.metrics,
        [name]: parseInt(value, 10)
      }
    });
  };
  
  const handleGoalChange = (area, field, value) => {
    setFormData({
      ...formData,
      weeklyGoals: {
        ...formData.weeklyGoals,
        [area]: {
          ...formData.weeklyGoals[area],
          [field]: parseInt(value, 10)
        }
      }
    });
  };
  
  const handleArrayChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.split(',').map(item => item.trim())
    });
  };
  
  const handleAvatarSelect = (avatarId, gender) => {
    setFormData({
      ...formData,
      avatar: avatarId,
      gender: gender
    });
    setShowAvatarSelector(false);
  };
  
  const validatePasswordForm = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) return;
    
    setSaveStatus('saving');
    try {
      await updateUserPassword(passwordData.currentPassword, passwordData.newPassword);
      setSaveStatus('saved');
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      setSaveStatus(null);
      setPasswordError(error.message || "Failed to update password");
    }
  };
  
  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    
    try {
      // Update profile data
      const profileUpdates = {
        displayName: formData.name,
        // You can add more profile properties here that your authentication system supports
      };
      
      // Update email if it has changed
      if (formData.email !== profile.email) {
        await updateUserEmail(formData.email);
      }
      
      // Update profile information
      await updateUserProfile(profileUpdates);
      
      // Update the local state with the new data
      setProfile(formData);
      setEditMode(false);
      setSaveStatus('saved');
      
      // Also update any additional profile data in your database here
      // e.g., saveUserData(user.uid, additionalProfileData);
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus('error');
      
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    }
  };
  
  const handleCancel = () => {
    setFormData({...profile});
    setEditMode(false);
    setShowPasswordForm(false);
  };
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  // Get avatar from the API
  const getAvatarImage = (avatarId, gender) => {
    const actualGender = gender || profile.gender;
    return (
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-slate-700">
        <img 
          src={`https://avatar.iran.liara.run/public/girl`} 
          alt="User avatar" 
          className="object-cover w-full h-full"
        />
      </div>
    );
  };
  
  // Animation variants
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
  
  // Simulated metric history data for charts
  const metricHistory = {
    mood: [65, 70, 62, 75, 71, 78],
    sleep: [50, 65, 60, 55, 62, 65],
    anxiety: [70, 65, 55, 50, 45, 42],
    stress: [75, 70, 65, 60, 55, 51]
  };
  
  // Get an appropriate color for a metric based on its value
  const getMetricColor = (value, type) => {
    // For metrics where lower is better (anxiety, stress)
    if (type === 'inverse') {
      if (value < 30) return "text-emerald-400";
      if (value < 50) return "text-blue-400";
      if (value < 70) return "text-amber-400";
      return "text-red-400";
    }
    // For metrics where higher is better (mood, sleep)
    else {
      if (value >= 70) return "text-emerald-400";
      if (value >= 50) return "text-blue-400";
      if (value >= 30) return "text-amber-400";
      return "text-red-400";
    }
  };
  
  // Get appropriate icon for a metric
  const getMetricIcon = (metricName) => {
    switch(metricName) {
      case 'moodScore': return <Smile className="w-5 h-5" color='#6ee7b7'/>;
      case 'sleepQuality': return <Moon className="w-5 h-5" color='#06b6d4'/>;
      case 'anxietyLevel': return <Activity className="w-5 h-5" color='#06b6d4' />;
      case 'stressLevel': return <Brain className="w-5 h-5" color='#fbbf24' />;
      case 'mindfulnessDays': return <Heart className="w-5 h-5"color='#ef4444' />;
      case 'journalStreak': return <Award className="w-5 h-5" color='#ef4444' />;
      default: return <Coffee className="w-5 h-5" />;
    }
  };
  
  // Progress bar component
  const ProgressBar = ({ value, color }) => (
    <div className="w-full h-2 overflow-hidden rounded-full bg-slate-600">
      <motion.div 
        className={color}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
  
  // Progress circles for weekly goals
  const ProgressCircle = ({ completed, target, color }) => {
    const percentage = Math.min((completed / target) * 100, 100);
    const circumference = 2 * Math.PI * 18; // radius = 18
    const dashOffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width="48" height="48" className="transform -rotate-90">
          <circle 
            cx="24" cy="24" r="18"
            stroke="#334155" // bg-slate-700
            strokeWidth="4"
            fill="transparent"
          />
          <circle 
            cx="24" cy="24" r="18"
            stroke={color === "emerald" ? "#10b981" : color === "blue" ? "#3b82f6" : "#f59e0b"} // matching the text colors
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xs font-medium text-white">{completed}/{target}</span>
        </div>
      </div>
    );
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
            <h1 className="text-xl font-semibold text-slate-100">Your Profile</h1>
          </div>
          <div className="flex items-center space-x-4">
            {loading && (
              <span className="flex items-center text-sm text-slate-300">
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> Processing...
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="text-sm text-slate-300">Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center text-sm text-emerald-400">
                <CheckCircle className="w-4 h-4 mr-1" /> Saved
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center text-sm text-red-400">
                <X className="w-4 h-4 mr-1" /> Error saving changes
              </span>
            )}
            {!editMode ? (
              <button 
                className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                onClick={() => setEditMode(true)}
                disabled={loading}
              >
                <Edit3 className="w-4 h-4 mr-1" /> 
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-1" /> 
                  Cancel
                </button>
                <button 
                  className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-1" /> 
                  Save
                </button>
              </div>
            )}
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto sm:p-6 lg:p-8 bg-slate-800">
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Header */}
            <motion.div 
              className="flex flex-col items-center p-6 rounded-lg md:flex-row bg-slate-700"
              variants={itemVariants}
            >
              {/* Avatar */}
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="relative w-24 h-24 overflow-hidden border-4 rounded-full border-slate-600">
                  {getAvatarImage(profile.avatar)}
                </div>
                
                {editMode && (
                  <button 
                    onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-600"
                    disabled={loading}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                
                {/* Avatar selector popup */}
                {showAvatarSelector && (
                  <motion.div 
                    className="absolute z-10 p-3 mt-2 overflow-y-auto rounded-lg shadow-lg top-full bg-slate-800"
                    style={{ maxHeight: '300px' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {avatars.map(avatar => (
                        <button
                          key={avatar.id}
                          className={`p-2 rounded-lg hover:bg-slate-700 ${
                            formData.avatar === avatar.id ? 'ring-2 ring-emerald-500 bg-slate-700' : ''
                          }`}
                          onClick={() => handleAvatarSelect(avatar.id, avatar.gender)}
                        >
                          <div className="w-12 h-12">
                            {getAvatarImage(avatar.id, avatar.gender)}
                          </div>
                          <p className="mt-1 text-xs text-slate-300">{avatar.name}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                {!editMode ? (
                  <>
                    <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
                    <p className="text-slate-300">{profile.email}</p>
                    <div className="flex flex-wrap justify-center mt-2 space-x-4 md:justify-start">
                      <p className="flex items-center text-sm text-slate-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile.location}
                      </p>
                      <p className="flex items-center text-sm text-slate-400">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {profile.occupation}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      Member since {new Date(profile.joinDate).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Your name"
                      disabled={loading}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Your email"
                      disabled={loading}
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Your location"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Your occupation"
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700"
                      disabled={loading}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                    </button>
                    {showPasswordForm && (
                      <div className="p-4 mt-2 space-y-3 rounded-md bg-slate-800">
                        <h4 className="font-medium text-slate-300">Update Password</h4>
                        {passwordError && (
                          <p className="text-sm text-red-400">{passwordError}</p>
                        )}
                        <div>
                          <label className="block mb-1 text-xs text-slate-400">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-xs text-slate-400">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-xs text-slate-400">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            disabled={loading}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleUpdatePassword}
                          className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                          disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                        >
                          <ShieldAlert className="w-4 h-4 mr-2" />
                          Update Password
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Bio */}
            <motion.div 
              className="p-6 rounded-lg bg-slate-700"
              variants={itemVariants}
            >
              <h3 className="mb-3 text-lg font-medium text-white">About Me</h3>
              {!editMode ? (
                <p className="text-slate-300">{profile.bio}</p>
              ) : (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md resize-none bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Tell us about yourself"
                  rows={4}
                  disabled={loading}
                />
              )}
              
              {!editMode && (
                <div className="mt-4">
                  <div className="p-3 border rounded-md border-slate-600 bg-slate-800">
                    <p className="text-sm italic text-slate-400">{profile.favoriteQuote}</p>
                  </div>
                </div>
              )}
              
              {editMode && (
                <div className="mt-4">
                  <label className="block mb-1 text-sm text-slate-300">Favorite Quote</label>
                  <textarea
                    name="favoriteQuote"
                    value={formData.favoriteQuote}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md resize-none bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Share your favorite quote"
                    rows={2}
                    disabled={loading}
                  />
                </div>
              )}
            </motion.div>
            
            {/* Interests & Hobbies */}
            <motion.div 
              className="overflow-hidden rounded-lg bg-slate-700"
              variants={itemVariants}
            >
              <div 
                className="flex items-center justify-between p-6 cursor-pointer border-slate-600"
                onClick={() => toggleSection('interests')}
              >
                <h3 className="text-lg font-medium text-white">Interests & Hobbies</h3>
                <button className="p-1 rounded-full bg-slate-800 text-slate-300">
                  {expandedSection === 'interests' ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {(expandedSection === 'interests' || editMode) && (
                <div className="p-6 border-t border-slate-600">
                  {!editMode ? (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile.interests.map((interest, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 text-sm font-medium rounded-full bg-slate-800 text-emerald-400"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
                        <div className="p-4 rounded-md bg-slate-800">
                          <h4 className="flex items-center mb-2 text-sm font-medium text-slate-300">
                            <Book className="w-4 h-4 mr-2" /> Favorite Books
                          </h4>
                          <ul className="text-sm text-slate-400">
                            {profile.books.map((book, index) => (
                              <li key={index} className="mb-1">• {book}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 rounded-md bg-slate-800">
                          <h4 className="flex items-center mb-2 text-sm font-medium text-slate-300">
                            <Music className="w-4 h-4 mr-2" /> Music Preferences
                          </h4>
                          <ul className="text-sm text-slate-400">
                            {profile.music.map((genre, index) => (
                              <li key={index} className="mb-1">• {genre}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 rounded-md bg-slate-800">
                          <h4 className="flex items-center mb-2 text-sm font-medium text-slate-300">
                            <Globe className="w-4 h-4 mr-2" /> Languages
                          </h4>
                          <ul className="text-sm text-slate-400">
                            {profile.languages.map((language, index) => (
                              <li key={index} className="mb-1">• {language}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 text-sm text-slate-300">Interests (comma separated)</label>
                        <input
                          type="text"
                          name="interests"
                          value={formData.interests.join(', ')}
                          onChange={(e) => handleArrayChange('interests', e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Hiking, Meditation, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm text-slate-300">Favorite Books (comma separated)</label>
                        <input
                          type="text"
                          name="books"
                          value={formData.books.join(', ')}
                          onChange={(e) => handleArrayChange('books', e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Book titles"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm text-slate-300">Music Preferences (comma separated)</label>
                        <input
                          type="text"
                          name="music"
                          value={formData.music.join(', ')}
                          onChange={(e) => handleArrayChange('music', e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Jazz, Classical, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-1 text-sm text-slate-300">Languages (comma separated)</label>
                        <input
                          type="text"
                          name="languages"
                          value={formData.languages.join(', ')}
                          onChange={(e) => handleArrayChange('languages', e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="English (Native), Spanish (Conversational), etc."
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
            
            {/* Weekly Goals */}
            <motion.div 
              className="overflow-hidden rounded-lg bg-slate-700"
              variants={itemVariants}
            >
              <div 
                className="flex items-center justify-between p-6 cursor-pointer border-slate-600"
                onClick={() => toggleSection('goals')}
              >
                <h3 className="text-lg font-medium text-white">Weekly Goals</h3>
                <button className="p-1 rounded-full bg-slate-800 text-slate-300">
                  {expandedSection === 'goals' ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {(expandedSection === 'goals' || editMode) && (
                <div className="p-6 border-t border-slate-600">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Object.entries(profile.weeklyGoals).map(([area, goal]) => {
                      const completion = (goal.completed / goal.target) * 100;
                      let colorClass = "text-emerald-400";
                      let colorRing = "emerald";
                      
                      if (completion < 50) {
                        colorClass = "text-amber-400";
                        colorRing = "amber";
                      } else if (completion < 75) {
                        colorClass = "text-blue-400";
                        colorRing = "blue";
                      }
                      
                      return (
                        <div key={area} className="p-4 rounded-lg bg-slate-800">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium capitalize text-slate-300">
                              {area}
                            </h4>
                            <span className={`text-sm font-semibold ${colorClass}`}>
                              {goal.completed}/{goal.target} days
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-center mt-3">
                            <ProgressCircle 
                              completed={goal.completed} 
                              target={goal.target} 
                              color={colorRing}
                            />
                            {editMode && (
                              <div className="ml-4">
                                <div className="mb-2">
                                  <label className="block mb-1 text-xs text-slate-400">Target</label>
                                  <input
                                    type="number"
                                    min="1"
                                    max="7"
                                    value={formData.weeklyGoals[area].target}
                                    onChange={(e) => handleGoalChange(area, 'target', e.target.value)}
                                    className="w-16 px-2 py-1 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  />
                                </div>
                                <div>
                                  <label className="block mb-1 text-xs text-slate-400">Completed</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="7"
                                    value={formData.weeklyGoals[area].completed}
                                    onChange={(e) => handleGoalChange(area, 'completed', e.target.value)}
                                    className="w-16 px-2 py-1 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Mental Health Metrics */}
            <motion.div 
              className="overflow-hidden rounded-lg bg-slate-700"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-600">
                <h3 className="text-lg font-medium text-white">Mental Health Metrics</h3>
                <div className="flex rounded-md bg-slate-800">
                <button
                    className={`px-3 py-1.5 text-xs font-medium ${selectedMetricView === 'chart' ? 'bg-slate-600 text-white' : 'text-slate-300'}`}
                    onClick={() => setSelectedMetricView('chart')}
                  >
                    <PieChart className="inline-block w-4 h-4 mr-1" />
                    Charts
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-medium ${selectedMetricView === 'stats' ? 'bg-slate-600 text-white' : 'text-slate-300'}`}
                    onClick={() => setSelectedMetricView('stats')}
                  >
                    <BarChart2 className="inline-block w-4 h-4 mr-1" />
                    Stats
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Chart view */}
                {selectedMetricView === 'chart' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-slate-300">Weekly Trends</h4>
                      <div className="h-40 p-2 rounded-lg bg-slate-800">
                        {/* This would be a chart component in a real app */}
                        <div className="flex items-end h-full">
                          {Object.entries(metricHistory).map(([metric, values], index) => (
                            <div key={metric} className="flex flex-col items-center flex-1">
                              <div className="w-full px-1">
                                {values.map((value, i) => (
                                  <motion.div
                                    key={i}
                                    className={`h-2 mb-1 rounded-sm ${
                                      metric === 'mood' || metric === 'sleep' 
                                        ? 'bg-emerald-500' 
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ opacity: 0.5 + (i * 0.1) }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(value / 100) * 30}px` }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                  />
                                ))}
                              </div>
                              <span className="mt-2 text-xs capitalize text-slate-400">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Current metrics */}
                    <div>
                      <h4 className="mb-3 text-sm font-medium text-slate-300">Current Status</h4>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {Object.entries(profile.metrics).map(([metric, value]) => {
                          const isInverse = metric === 'anxietyLevel' || metric === 'stressLevel';
                          const color = getMetricColor(value, isInverse ? 'inverse' : 'normal');
                          
                          return (
                            <div 
                              key={metric} 
                              className="p-3 rounded-lg bg-slate-800"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-1">
                                  {getMetricIcon(metric)}
                                  <span className="text-xs capitalize text-slate-400">
                                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                </div>
                                <span className={`text-sm font-medium ${color}`}>
                                  {isInverse ? (100 - value) : value}/100
                                </span>
                              </div>
                              
                              {!editMode ? (
                                <ProgressBar 
                                  value={isInverse ? (100 - value) : value} 
                                  color={color.replace('text', 'bg')}
                                />
                              ) : (
                                <input
                                  type="range"
                                  name={metric}
                                  min="0"
                                  max="100"
                                  value={value}
                                  onChange={handleMetricChange}
                                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-600 accent-emerald-500"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Stats view */}
                {selectedMetricView === 'stats' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h4 className="mb-3 text-sm font-medium text-slate-300">Mood & Energy</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Average mood score</span>
                            <span className="text-sm font-medium text-emerald-400">78/100</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Week-over-week change</span>
                            <span className="text-sm font-medium text-blue-400">+3.5%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Best day</span>
                            <span className="text-sm font-medium text-slate-300">Wednesday</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h4 className="mb-3 text-sm font-medium text-slate-300">Sleep & Recovery</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Average sleep quality</span>
                            <span className="text-sm font-medium text-blue-400">65/100</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Week-over-week change</span>
                            <span className="text-sm font-medium text-emerald-400">+5.2%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Average sleep duration</span>
                            <span className="text-sm font-medium text-slate-300">7.2 hrs</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h4 className="mb-3 text-sm font-medium text-slate-300">Mindfulness & Practice</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Mindfulness days</span>
                            <span className="text-sm font-medium text-emerald-400">15 days</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Journal streak</span>
                            <span className="text-sm font-medium text-blue-400">8 days</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Monthly goal progress</span>
                            <span className="text-sm font-medium text-slate-300">62%</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <h4 className="mb-3 text-sm font-medium text-slate-300">Stress & Anxiety</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Average anxiety level</span>
                            <span className="text-sm font-medium text-blue-400">42/100</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Week-over-week change</span>
                            <span className="text-sm font-medium text-emerald-400">-8.3%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Stress triggers identified</span>
                            <span className="text-sm font-medium text-slate-300">3</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {editMode && (
                      <div className="p-4 rounded-lg bg-slate-700">
                        <p className="text-xs text-slate-400">
                          * Note: In this demo, these statistics are pre-populated. In a real application, 
                          these would be calculated from your actual tracking data.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;