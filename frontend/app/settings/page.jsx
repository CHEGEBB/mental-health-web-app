"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, User, Bell, Lock, Eye, EyeOff, Moon, Sun, 
  Globe, Smartphone, Download, Trash2, LogOut, Save,
  ToggleLeft, ToggleRight, Info, ChevronRight, Check,
  AlertTriangle, Menu, Shield, PieChart, MessageSquare,
  Image as ImageIcon // Renamed to avoid conflict with DOM Image
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('settings');
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  
  // Use the theme context
  const { darkMode, accentColor, setDarkMode, setAccentColor } = useTheme();
  
  const [emailNotifications, setEmailNotifications] = useState({
    journalReminders: true,
    weeklyInsights: true,
    supportMessages: false,
    resourceUpdates: true,
    communityActivity: false
  });
  const [pushNotifications, setPushNotifications] = useState({
    journalReminders: true,
    moodTracking: true,
    newMessages: true,
    appointments: true
  });
  const [privacy, setPrivacy] = useState({
    privateJournal: true,
    anonymousCommunityPosts: true,
    dataCollection: false,
    shareInsights: false
  });
  const [dataExportType, setDataExportType] = useState('json');
  const [exportInProgress, setExportInProgress] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    language: 'english',
    password: '••••••••',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle toggle switch change
  const handleToggleChange = (category, setting) => {
    if (category === 'emailNotifications') {
      setEmailNotifications({ 
        ...emailNotifications, 
        [setting]: !emailNotifications[setting] 
      });
    } else if (category === 'pushNotifications') {
      setPushNotifications({ 
        ...pushNotifications, 
        [setting]: !pushNotifications[setting] 
      });
    } else if (category === 'privacy') {
      setPrivacy({ 
        ...privacy, 
        [setting]: !privacy[setting] 
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show saving state
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      
      // Reset after a few seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  // Handle export data
  const handleExportData = () => {
    setExportInProgress(true);
    
    // Simulate export process
    setTimeout(() => {
      setExportInProgress(false);
      alert('Your data has been exported successfully!');
    }, 2000);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  // Handle theme change
  const handleThemeChange = (isDark) => {
    setDarkMode(isDark);
  };

  // Handle accent color change
  const handleAccentColorChange = (color) => {
    setAccentColor(color);
  };

  // Tabs for settings sections
  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Moon className="w-5 h-5" /> },
    { id: 'data', label: 'Data Management', icon: <Download className="w-5 h-5" /> },
  ];

  // Animation variants
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

  // Get background and text classes based on current theme
  const getThemeClasses = () => {
    if (darkMode) {
      return {
        bg: 'bg-slate-800',
        bgCard: 'bg-slate-700',
        bgSecondary: 'bg-slate-600',
        text: 'text-white',
        textSecondary: 'text-slate-300',
        textMuted: 'text-slate-400',
        border: 'border-slate-700',
        inputBg: 'bg-slate-800',
      };
    } else {
      return {
        bg: 'bg-white',
        bgCard: 'bg-slate-50',
        bgSecondary: 'bg-slate-100',
        text: 'text-slate-900',
        textSecondary: 'text-slate-700',
        textMuted: 'text-slate-500',
        border: 'border-slate-200',
        inputBg: 'bg-white',
      };
    }
  };

  // Get accent color classes
  const getAccentClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-emerald-500',
        border: 'border-emerald-500',
      },
      ocean: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-blue-500',
        border: 'border-blue-500',
      },
      lavender: {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-purple-500',
        border: 'border-purple-500',
      },
      sunset: {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-amber-500',
        border: 'border-amber-500',
      },
      slate: {
        bg: 'bg-slate-500',
        hover: 'hover:bg-slate-600',
        text: 'text-slate-500',
        border: 'border-slate-500',
      },
    };
    
    return colorMap[color] || colorMap.emerald;
  };

  const themeClasses = getThemeClasses();
  const accentClasses = getAccentClasses(accentColor);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-slate-600' : 'bg-slate-100'} font-['Poppins']`}>
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className={`flex items-center justify-between px-4 py-3 shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'} sm:px-6 lg:px-8`}>
          <div className="flex items-center">
            <button 
              className={`p-1 mr-3 rounded-md ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'} lg:hidden`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className={`text-xl font-semibold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus === 'saving' && (
              <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="flex items-center text-sm text-emerald-400">
                <Check className="w-4 h-4 mr-1" /> Saved
              </span>
            )}
            <button 
              className={`flex items-center px-3 py-1 text-sm font-medium text-white rounded-md ${accentClasses.bg} ${accentClasses.hover}`}
              onClick={handleSubmit}
            >
              <Save className="w-4 h-4 mr-1" /> 
              Save Changes
            </button>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-auto ${themeClasses.bg}`}>
          <div className="grid h-full grid-cols-1 md:grid-cols-12">
            {/* Settings Sidebar */}
            <div className={`p-4 border-b md:border-b-0 md:border-r ${themeClasses.border} md:col-span-3 lg:col-span-2`}>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? `${accentClasses.bg} text-white`
                        : `${themeClasses.textSecondary} ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
              
              <div className={`pt-6 mt-6 border-t ${themeClasses.border}`}>
                <button 
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium text-red-400 rounded-md ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-5 h-5 mr-3" />
                  Delete Account
                </button>
                <button className={`flex items-center w-full px-3 py-2 mt-1 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="p-4 overflow-y-auto md:p-6 lg:p-8 md:col-span-9 lg:col-span-10">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl"
              >
                {/* Account Settings - No changes needed for this section */}
                {activeTab === 'account' && (
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                      <p className="mt-1 text-sm text-slate-400">Manage your personal information and account details</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Personal Information</h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-300">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-slate-300">Phone Number (Optional)</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="language" className="block mb-2 text-sm font-medium text-slate-300">Preferred Language</label>
                            <select
                              id="language"
                              name="language"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.language}
                              onChange={handleInputChange}
                            >
                              <option value="english">English</option>
                              <option value="spanish">Spanish</option>
                              <option value="french">French</option>
                              <option value="german">German</option>
                              <option value="japanese">Japanese</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              className="w-full px-4 py-2 pr-10 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-slate-300">New Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="newPassword"
                              name="newPassword"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              placeholder="Leave blank to keep current"
                            />
                          </div>
                          <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-slate-300">Confirm New Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Leave blank to keep current"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-2 text-sm text-slate-400">
                          <p>Password should be at least 8 characters and include a mix of letters, numbers, and symbols.</p>
                        </div>
                      </form>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Linked Accounts</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-600">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-blue-600 rounded-full">G</div>
                            <div>
                              <p className="font-medium text-white">Google</p>
                              <p className="text-sm text-slate-400">Connected</p>
                            </div>
                          </div>
                          <button className="px-3 py-1 text-sm text-white rounded-md bg-slate-600 hover:bg-slate-500">
                            Disconnect
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-slate-600">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-blue-800 rounded-full">F</div>
                            <div>
                              <p className="font-medium text-white">Facebook</p>
                              <p className="text-sm text-slate-400">Not connected</p>
                            </div>
                          </div>
                          <button className="px-3 py-1 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                            Connect
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-blue-400 rounded-full">A</div>
                            <div>
                              <p className="font-medium text-white">Apple</p>
                              <p className="text-sm text-slate-400">Not connected</p>
                            </div>
                          </div>
                          <button className="px-3 py-1 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                            Connect
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                      <p className="mt-1 text-sm text-slate-400">Configure how and when you receive notifications</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Journal Reminders</p>
                            <p className="text-sm text-slate-400">Receive reminders to log your daily mood and journal entry</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('emailNotifications', 'journalReminders')}
                          >
                            {emailNotifications.journalReminders ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Weekly Insights</p>
                            <p className="text-sm text-slate-400">Get weekly summaries of your mood patterns and insights</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('emailNotifications', 'weeklyInsights')}
                          >
                            {emailNotifications.weeklyInsights ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Support Messages</p>
                            <p className="text-sm text-slate-400">Receive notifications about new messages from support team</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('emailNotifications', 'supportMessages')}
                          >
                            {emailNotifications.supportMessages ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Resource Updates</p>
                            <p className="text-sm text-slate-400">Get notified about new mental health resources and articles</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('emailNotifications', 'resourceUpdates')}
                          >
                            {emailNotifications.resourceUpdates ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Community Activity</p>
                            <p className="text-sm text-slate-400">Receive updates about activity in your community groups</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('emailNotifications', 'communityActivity')}
                          >
                            {emailNotifications.communityActivity ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Journal Reminders</p>
                            <p className="text-sm text-slate-400">Receive push notifications to remind you to journal</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('pushNotifications', 'journalReminders')}
                          >
                            {pushNotifications.journalReminders ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Mood Tracking</p>
                            <p className="text-sm text-slate-400">Get nudges to log your mood throughout the day</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('pushNotifications', 'moodTracking')}
                          >
                            {pushNotifications.moodTracking ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">New Messages</p>
                            <p className="text-sm text-slate-400">Get notified when you receive new messages</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('pushNotifications', 'newMessages')}
                          >
                            {pushNotifications.newMessages ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Appointment Reminders</p>
                            <p className="text-sm text-slate-400">Get reminders for upcoming therapy appointments</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('pushNotifications', 'appointments')}
                          >
                            {pushNotifications.appointments ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Notification Schedule</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="reminder-time" className="block mb-2 text-sm font-medium text-slate-300">Journal Reminder Time</label>
                          <input
                            type="time"
                            id="reminder-time"
                            className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            defaultValue="20:00"
                          />
                        </div>
                        
                        <div>
                          <label className="block mb-2 text-sm font-medium text-slate-300">Quiet Hours</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="quiet-start" className="block mb-1 text-xs text-slate-400">Start</label>
                              <input
                                type="time"
                                id="quiet-start"
                                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                defaultValue="22:00"
                              />
                            </div>
                            <div>
                              <label htmlFor="quiet-end" className="block mb-1 text-xs text-slate-400">End</label>
                              <input
                                type="time"
                                id="quiet-end"
                                className="w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                defaultValue="07:00"
                              />
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-slate-400">No notifications will be sent during quiet hours</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
                      <p className="mt-1 text-sm text-slate-400">Manage your privacy preferences and security settings</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Keep Journal Entries Private</p>
                            <p className="text-sm text-slate-400">Your journal entries will not be shared with anyone, including our AI analysis system</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('privacy', 'privateJournal')}
                          >
                            {privacy.privateJournal ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Anonymous Community Posts</p>
                            <p className="text-sm text-slate-400">Hide your name and profile picture when posting in community forums</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('privacy', 'anonymousCommunityPosts')}
                          >
                            {privacy.anonymousCommunityPosts ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Data Collection for Research</p>
                            <p className="text-sm text-slate-400">Allow anonymized data to be used for mental health research</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('privacy', 'dataCollection')}
                          >
                            {privacy.dataCollection ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-200">Share Insights with Therapist</p>
                            <p className="text-sm text-slate-400">Allow your mood insights to be shared with your connected therapist</p>
                          </div>
                          <button 
                            className="text-emerald-500"
                            onClick={() => handleToggleChange('privacy', 'shareInsights')}
                          >
                            {privacy.shareInsights ? (
                              <ToggleRight className="w-10 h-6" />
                            ) : (
                              <ToggleLeft className="w-10 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 mr-3 text-emerald-500" />
                            <div>
                              <p className="font-medium text-slate-200">Two-Factor Authentication</p>
                              <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                            </div>
                          </div>
                          <button className="px-3 py-1 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                            Enable
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 mr-3 text-amber-500" />
                            <div>
                              <p className="font-medium text-slate-200">Session Management</p>
                              <p className="text-sm text-slate-400">View and manage your active sessions</p>
                            </div>
                          </div>
                          <button className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-slate-500 hover:bg-slate-400">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <Lock className="w-5 h-5 mr-3 text-amber-500" />
                            <div>
                              <p className="font-medium text-slate-200">Login History</p>
                              <p className="text-sm text-slate-400">Review recent account access</p>
                            </div>
                          </div>
                          <button className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-slate-500 hover:bg-slate-400">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 mr-3 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-medium text-white">Data Privacy Statement</h3>
                          <p className="mt-2 text-sm text-slate-300">
                            We take your privacy seriously. Your mental health data is encrypted and stored securely. 
                            We never sell your personal data to third parties. You can request deletion of your data at any time.
                          </p>
                          <a href="#" className="inline-block mt-2 text-sm font-medium text-emerald-400 hover:text-emerald-300">
                            Read our full privacy policy
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Appearance Settings */}
              {/* Appearance Settings - Updated with actual theme functionality */}
              {activeTab === 'appearance' && (
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Appearance Settings</h2>
                      <p className={`mt-1 text-sm ${themeClasses.textMuted}`}>Customize the look and feel of your application</p>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-6 rounded-lg ${themeClasses.bgCard}`}
                      variants={itemVariants}
                    >
                      <h3 className={`mb-4 text-lg font-medium ${themeClasses.text}`}>Theme</h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <button 
                          className={`p-4 border-2 rounded-lg flex items-center ${
                            !darkMode ? `${accentClasses.border}` : 'border-transparent'
                          } bg-slate-200`}
                          onClick={() => handleThemeChange(false)}
                        >
                          <Sun className="w-6 h-6 mr-3 text-amber-500" />
                          <div className="text-left">
                            <p className="font-medium text-slate-900">Light Mode</p>
                            <p className="text-sm text-slate-600">Bright interface for daytime use</p>
                          </div>
                          {!darkMode && (
                            <Check className={`w-5 h-5 ml-auto ${accentClasses.text}`} />
                          )}
                        </button>
                        
                        <button 
                          className={`p-4 border-2 rounded-lg flex items-center ${
                            darkMode ? `${accentClasses.border}` : 'border-transparent'
                          } bg-slate-900`}
                          onClick={() => handleThemeChange(true)}
                        >
                          <Moon className="w-6 h-6 mr-3 text-purple-400" />
                          <div className="text-left">
                            <p className="font-medium text-slate-200">Dark Mode</p>
                            <p className="text-sm text-slate-400">Easier on the eyes in low-light</p>
                          </div>
                          {darkMode && (
                            <Check className={`w-5 h-5 ml-auto ${accentClasses.text}`} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-6 rounded-lg ${themeClasses.bgCard}`}
                      variants={itemVariants}
                    >
                      <h3 className={`mb-4 text-lg font-medium ${themeClasses.text}`}>Color Scheme</h3>
                      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                        <button 
                          className={`flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-500 hover:ring-2 ring-white ${accentColor === 'emerald' ? 'ring-2' : ''}`}
                          onClick={() => handleAccentColorChange('emerald')}
                        >
                          <div className="w-6 h-6 mb-2 rounded-full bg-emerald-500 ring-2 ring-white"></div>
                          <span className="text-xs font-medium text-white">Emerald</span>
                        </button>
                        
                        <button 
                          className={`flex flex-col items-center justify-center p-3 bg-blue-500 rounded-lg hover:ring-2 ring-white ${accentColor === 'ocean' ? 'ring-2' : ''}`}
                          onClick={() => handleAccentColorChange('ocean')}
                        >
                          <div className="w-6 h-6 mb-2 bg-blue-500 rounded-full ring-2 ring-white"></div>
                          <span className="text-xs font-medium text-white">Ocean</span>
                        </button>
                        
                        <button 
                          className={`flex flex-col items-center justify-center p-3 bg-purple-500 rounded-lg hover:ring-2 ring-white ${accentColor === 'lavender' ? 'ring-2' : ''}`}
                          onClick={() => handleAccentColorChange('lavender')}
                        >
                          <div className="w-6 h-6 mb-2 bg-purple-500 rounded-full ring-2 ring-white"></div>
                          <span className="text-xs font-medium text-white">Lavender</span>
                        </button>
                        
                        <button 
                          className={`flex flex-col items-center justify-center p-3 rounded-lg bg-amber-500 hover:ring-2 ring-white ${accentColor === 'sunset' ? 'ring-2' : ''}`}
                          onClick={() => handleAccentColorChange('sunset')}
                        >
                          <div className="w-6 h-6 mb-2 rounded-full bg-amber-500 ring-2 ring-white"></div>
                          <span className="text-xs font-medium text-white">Sunset</span>
                        </button>
                        
                        <button 
                          className={`flex flex-col items-center justify-center p-3 rounded-lg bg-slate-500 hover:ring-2 ring-white ${accentColor === 'slate' ? 'ring-2' : ''}`}
                          onClick={() => handleAccentColorChange('slate')}
                        >
                          <div className="w-6 h-6 mb-2 rounded-full bg-slate-500 ring-2 ring-white"></div>
                          <span className="text-xs font-medium text-white">Slate</span>
                        </button>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-6 rounded-lg ${themeClasses.bgCard}`}
                      variants={itemVariants}
                    >
                      <h3 className={`mb-4 text-lg font-medium ${themeClasses.text}`}>Interface Preview</h3>
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${themeClasses.border}`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-8 h-8 rounded-full ${accentClasses.bg} flex items-center justify-center text-white font-bold`}>A</div>
                          <div className="ml-3">
                            <p className={`font-medium ${themeClasses.text}`}>Your theme preview</p>
                            <p className={`text-sm ${themeClasses.textMuted}`}>See how your selection looks</p>
                          </div>
                        </div>
                        
                        <div className={`p-3 mb-3 rounded-md ${themeClasses.bgSecondary}`}>
                          <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Sample card with your current theme</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className={`px-3 py-1 text-sm font-medium text-white rounded-md ${accentClasses.bg} ${accentClasses.hover}`}>
                            Primary Button
                          </button>
                          <button className={`px-3 py-1 text-sm font-medium rounded-md border ${themeClasses.textSecondary} ${themeClasses.border}`}>
                            Secondary Button
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-6 rounded-lg ${themeClasses.bgCard}`}
                      variants={itemVariants}
                    >
                      <h3 className={`mb-4 text-lg font-medium ${themeClasses.text}`}>Interface Layout</h3>
                      <div className="space-y-4">
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${themeClasses.textSecondary}`}>Dashboard Layout</label>
                          <div className="flex space-x-3">
                            <button className={`p-3 border-2 rounded-lg ${accentClasses.border} ${themeClasses.bgSecondary}`}>
                              <div className={`w-20 h-12 mb-2 overflow-hidden rounded-md ${themeClasses.bgCard}`}>
                                <div className={`w-full h-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                <div className="flex h-10">
                                  <div className="w-1/3 p-1">
                                    <div className={`w-full h-full rounded opacity-50 ${accentClasses.bg}`}></div>
                                  </div>
                                  <div className="w-2/3 p-1">
                                    <div className={`w-full h-3 mb-1 rounded ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                    <div className={`w-full h-5 rounded ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                  </div>
                                </div>
                              </div>
                              <span className={`text-xs font-medium ${themeClasses.textSecondary}`}>Default</span>
                            </button>
                            
                            <button className={`p-3 border-2 border-transparent rounded-lg ${themeClasses.bgSecondary} hover:border-slate-600`}>
                              <div className={`w-20 h-12 mb-2 overflow-hidden rounded-md ${themeClasses.bgCard}`}>
                                <div className={`w-full h-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                <div className="flex h-10">
                                  <div className="w-2/3 p-1">
                                    <div className={`w-full h-3 mb-1 rounded ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                    <div className={`w-full h-5 rounded ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                  </div>
                                  <div className="w-1/3 p-1">
                                    <div className={`w-full h-full rounded opacity-50 ${accentClasses.bg}`}></div>
                                  </div>
                                </div>
                              </div>
                              <span className={`text-xs font-medium ${themeClasses.textSecondary}`}>Reversed</span>
                            </button>
                            
                            <button className={`p-3 border-2 border-transparent rounded-lg ${themeClasses.bgSecondary} hover:border-slate-600`}>
                              <div className={`w-20 h-12 mb-2 overflow-hidden rounded-md ${themeClasses.bgCard}`}>
                                <div className={`w-full h-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                <div className="flex flex-col h-10">
                                  <div className="p-1 h-1/2">
                                    <div className={`w-full h-full rounded ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                  </div>
                                  <div className="p-1 h-1/2">
                                    <div className={`w-full h-full rounded opacity-50 ${accentClasses.bg}`}></div>
                                  </div>
                                </div>
                              </div>
                              <span className={`text-xs font-medium ${themeClasses.textSecondary}`}>Stacked</span>
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className={`block mb-2 text-sm font-medium ${themeClasses.textSecondary}`}>Text Size</label>
                          <div className="flex items-center max-w-md">
                            <span className={`mr-2 text-xs ${themeClasses.textMuted}`}>A</span>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              defaultValue="3"
                              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-slate-600' : 'bg-slate-300'} accent-[var(--color-accent)]`}
                            />
                            <span className={`ml-2 text-base font-bold ${themeClasses.textMuted}`}>A</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className={`p-6 rounded-lg ${themeClasses.bgCard}`}
                      variants={itemVariants}
                    >
                      <h3 className={`mb-4 text-lg font-medium ${themeClasses.text}`}>Accessibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${themeClasses.textSecondary}`}>High Contrast Mode</p>
                            <p className={`text-sm ${themeClasses.textMuted}`}>Increase contrast for better readability</p>
                          </div>
                          <button className={themeClasses.textMuted}>
                            <ToggleLeft className="w-10 h-6" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${themeClasses.textSecondary}`}>Reduce Animations</p>
                            <p className={`text-sm ${themeClasses.textMuted}`}>Minimize motion for those with sensitivities</p>
                          </div>
                          <button className={themeClasses.textMuted}>
                            <ToggleLeft className="w-10 h-6" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`font-medium ${themeClasses.textSecondary}`}>Screen Reader Optimization</p>
                            <p className={`text-sm ${themeClasses.textMuted}`}>Enhance compatibility with screen readers</p>
                          </div>
                          <button className={accentClasses.text}>
                            <ToggleRight className="w-10 h-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Data Management Settings */}
                {activeTab === 'data' && (
                  <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-xl font-semibold text-white">Data Management</h2>
                      <p className="mt-1 text-sm text-slate-400">Control your data and manage your account information</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Export Your Data</h3>
                      <p className="mb-4 text-slate-300">
                        Download a copy of your data, including journal entries, mood logs, and account settings.
                      </p>
                      
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300">Export Format</label>
                        <div className="flex space-x-3">
                          <button 
                            className={`px-4 py-2 rounded-md ${dataExportType === 'json' ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                            onClick={() => setDataExportType('json')}
                          >
                            JSON
                          </button>
                          <button 
                            className={`px-4 py-2 rounded-md ${dataExportType === 'csv' ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                            onClick={() => setDataExportType('csv')}
                          >
                            CSV
                          </button>
                          <button 
                            className={`px-4 py-2 rounded-md ${dataExportType === 'pdf' ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}
                            onClick={() => setDataExportType('pdf')}
                          >
                            PDF
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300">Data to Include</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="include-journal" 
                              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-600 focus:ring-emerald-500" 
                              defaultChecked 
                            />
                            <label htmlFor="include-journal" className="ml-2 text-sm text-slate-300">Journal Entries</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="include-mood" 
                              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-600 focus:ring-emerald-500" 
                              defaultChecked 
                            />
                            <label htmlFor="include-mood" className="ml-2 text-sm text-slate-300">Mood Tracking Data</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="include-insights" 
                              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-600 focus:ring-emerald-500" 
                              defaultChecked 
                            />
                            <label htmlFor="include-insights" className="ml-2 text-sm text-slate-300">AI Insights & Recommendations</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="include-account" 
                              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-600 focus:ring-emerald-500" 
                              defaultChecked 
                            />
                            <label htmlFor="include-account" className="ml-2 text-sm text-slate-300">Account Settings</label>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="flex items-center px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={handleExportData}
                        disabled={exportInProgress}
                      >
                        {exportInProgress ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Export My Data
                          </>
                        )}
                      </button>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Data Usage & Storage</h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-300">Storage Used</span>
                          <span className="text-sm text-slate-400">43.2 MB of 500 MB</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-600">
                          <div className="w-[8%] h-2 rounded-full bg-emerald-500"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <MessageSquare className="w-5 h-5 mr-3 text-blue-400" />
                            <div>
                              <p className="font-medium text-slate-200">Journal Entries</p>
                              <p className="text-xs text-slate-400">123 entries, 28.7 MB</p>
                            </div>
                          </div>
                          <button className="px-2 py-1 text-xs text-slate-300 hover:text-slate-100">
                            View
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <PieChart className="w-5 h-5 mr-3 text-emerald-400" />
                            <div>
                              <p className="font-medium text-slate-200">Mood Data</p>
                              <p className="text-xs text-slate-400">365 data points, 2.1 MB</p>
                            </div>
                          </div>
                          <button className="px-2 py-1 text-xs text-slate-300 hover:text-slate-100">
                            View
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-md bg-slate-600">
                          <div className="flex items-center">
                            <ImageIcon className="w-5 h-5 mr-3 text-purple-400" />
                            <div>
                              <p className="font-medium text-slate-200">Media Uploads</p>
                              <p className="text-xs text-slate-400">12 files, 12.4 MB</p>
                            </div>
                          </div>
                          <button className="px-2 py-1 text-xs text-slate-300 hover:text-slate-100">
                            View
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6 border rounded-lg bg-red-900/20 border-red-500/20"
                      variants={itemVariants}
                    >
                      <h3 className="mb-4 text-lg font-medium text-white">Delete Account</h3>
                      <p className="mb-4 text-slate-300">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <div className="p-3 mb-4 border rounded-md border-red-500/30 bg-red-500/10">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 mr-2 text-red-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-200">
                            Deleting your account will permanently remove all your journal entries, mood data, 
                            and personal information. You will lose access to all your mental health insights and history.
                          </p>
                        </div>
                      </div>
                      <button 
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        onClick={handleDeleteAccount}
                      >
                        Delete My Account
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;