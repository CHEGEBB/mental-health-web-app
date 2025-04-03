"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Moon, 
  Menu, 
  BarChart2, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Brain,
  ThumbsUp,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Zap,
  FileText,
  ArrowUp,
  ArrowDown,
  User,
  LogOut
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Lottie from 'react-lottie';
import peopleWavingAnimation from '../lottie/wave.json';
import { useAuth } from '../hooks/useAuth';

// Create User Auth Context
const AuthContext = createContext();


// Create a wrapper component for authentication logic
function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const userData = {
            id: "user_123",
            name: "Alex Johnson",
            email: "alex@example.com",
          };
          
          setUser(userData);
          setLoading(false);
          localStorage.setItem('user', JSON.stringify(userData));
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// Dashboard Component
const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const { user, loading, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Set greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Morning");
    } else if (hours < 18) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, []);

  // Fetch user-specific data
  useEffect(() => {
    if (user) {
      // This would be a real API call in production
      const fetchUserData = async () => {
        setDataLoading(true);
        try {
          // Simulate API call
          setTimeout(() => {
            // Mock user-specific data
            const mockUserData = {
              moodData: [
                { name: 'Mon', mood: 7, anxiety: 4 },
                { name: 'Tue', mood: 6, anxiety: 6 },
                { name: 'Wed', mood: 8, anxiety: 3 },
                { name: 'Thu', mood: 5, anxiety: 7 },
                { name: 'Fri', mood: 7, anxiety: 4 },
                { name: 'Sat', mood: 9, anxiety: 2 },
                { name: 'Sun', mood: 8, anxiety: 3 },
              ],
              sleepData: [
                { name: 'Mon', hours: 6.5 },
                { name: 'Tue', hours: 7 },
                { name: 'Wed', hours: 8 },
                { name: 'Thu', hours: 5.5 },
                { name: 'Fri', hours: 6 },
                { name: 'Sat', hours: 8.5 },
                { name: 'Sun', hours: 7.5 },
              ],
              exerciseData: [
                { name: 'Meditation', minutes: 120, fill: '#10b981' },
                { name: 'Breathing', minutes: 90, fill: '#3b82f6' },
                { name: 'Journaling', minutes: 60, fill: '#8b5cf6' },
                { name: 'Yoga', minutes: 45, fill: '#ec4899' },
              ],
              upcomingAppointments: [
                { id: 1, therapist: 'Dr. Sarah Johnson', date: 'Apr 10, 2025', time: '10:00 AM', type: 'Video Call' },
                { id: 2, therapist: 'Dr. Michael Chen', date: 'Apr 15, 2025', time: '2:30 PM', type: 'In-person' },
              ],
              tasksData: [
                { id: 1, task: 'Complete daily mood journal', completed: true },
                { id: 2, task: 'Practice mindfulness meditation', completed: true },
                { id: 3, task: 'Read chapter on cognitive therapy', completed: false },
                { id: 4, task: 'Complete breathing exercise routine', completed: false },
              ],
              wellnessScoreData: [
                { date: 'Mar 27', score: 72 },
                { date: 'Mar 28', score: 75 },
                { date: 'Mar 29', score: 78 },
                { date: 'Mar 30', score: 74 },
                { date: 'Mar 31', score: 80 },
                { date: 'Apr 1', score: 83 },
                { date: 'Apr 2', score: 85 },
              ],
              stats: {
                appointments: 12,
                newAppointments: 2,
                averageMood: 7.2,
                moodChange: 0.5,
                therapySessions: 8,
                nextTherapy: 'Apr 10, 2025',
                completedExercises: 24,
                completionRate: 85
              }
            };
            
            setUserData(mockUserData);
            setDataLoading(false);
          }, 1500);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setDataLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [user]);

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: peopleWavingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Loading states
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-t-emerald-500 border-b-emerald-700 border-l-emerald-600 border-r-emerald-600 animate-spin"></div>
          <h2 className="text-xl font-semibold text-white">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  if (dataLoading || !userData) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-t-emerald-500 border-b-emerald-700 border-l-emerald-600 border-r-emerald-600 animate-spin"></div>
          <h2 className="text-xl font-semibold text-white">Fetching your mental health data...</h2>
        </div>
      </div>
    );
  }

  // Destructure user data for easier access
  const { 
    moodData, 
    sleepData, 
    exerciseData, 
    upcomingAppointments, 
    tasksData, 
    wellnessScoreData,
    stats
  } = userData;

  return (
    <AuthWrapper>
    <div className="flex h-screen bg-slate-600 font-['Poppins']">
      
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
        userName={user.name}
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
            <h1 className="text-xl font-semibold text-slate-100">Mental Health Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600">
              <Moon className="w-6 h-6" />
            </button>
            <div className="relative group">
              <button className="flex items-center justify-center w-8 h-8 overflow-hidden text-white rounded-full bg-emerald-600">
                <User className="w-5 h-5" />
              </button>
              <div className="absolute right-0 z-10 invisible w-48 p-2 transition-all origin-top-right scale-95 -translate-y-2 rounded-md shadow-lg opacity-0 bg-slate-700 top-full group-hover:visible group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="p-3">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-slate-300">{user.email}</p>
                  <div className="h-px my-2 bg-slate-600"></div>
                  <button 
                    onClick={logout}
                    className="flex items-center w-full px-2 py-1 mt-1 text-sm text-left rounded-md text-slate-300 hover:bg-slate-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-slate-800 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div 
            className="p-6 mb-8 shadow-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-white">Good {greeting}, {user.name}!</h2>
                <p className="mt-1 text-slate-300">Here&apos;s an overview of your mental wellness journey</p>
              </div>
              <div className="w-32 h-32 mb-12 mr-10 md:mr-80 sm:-mt-40 md:-mt-20">
                {/* Replace Brain icon with Lottie animation */}
                <Lottie options={defaultOptions} height={200} width={200} />
              </div>
              
            </div>
            
            {/* Wellness Score */}
            <div className="p-4 mt-6 bg-slate-900 bg-opacity-30 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">Your Wellness Score</h3>
                <span className="text-lg font-semibold text-emerald-400">85/100</span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wellnessScoreData}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fill="url(#scoreGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">+3 points</span>
                <span className="ml-2 text-sm text-slate-400">from last week</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center">
                <div className="p-3 mr-4 rounded-full bg-emerald-100">
                  <Calendar className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Appointments</p>
                  <h3 className="text-2xl font-bold text-slate-100">{stats.appointments}</h3>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="font-medium text-emerald-400">+{stats.newAppointments} new</span>
                <span className="ml-2 text-slate-300">this month</span>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="p-3 mr-4 bg-blue-100 rounded-full">
                  <ThumbsUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Average Mood</p>
                  <h3 className="text-2xl font-bold text-slate-100">{stats.averageMood}/10</h3>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="font-medium text-emerald-400">+{stats.moodChange}</span>
                <span className="ml-2 text-slate-300">from last week</span>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center">
                <div className="p-3 mr-4 bg-purple-100 rounded-full">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Therapy Sessions</p>
                  <h3 className="text-2xl font-bold text-slate-100">{stats.therapySessions}</h3>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-slate-300">Next: {stats.nextTherapy}</span>
              </div>
            </motion.div>

            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center">
                <div className="p-3 mr-4 rounded-full bg-amber-100">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Completed Exercises</p>
                  <h3 className="text-2xl font-bold text-slate-100">{stats.completedExercises}</h3>
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="font-medium text-emerald-400">{stats.completionRate}%</span>
                <span className="ml-2 text-slate-300">completion rate</span>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex p-1 mb-8 overflow-x-auto shadow-sm bg-slate-700 rounded-xl">
            <button 
              onClick={() => setCurrentTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex-shrink-0 ${
                currentTab === 'overview' 
                  ? 'bg-slate-600 text-slate-100' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-600'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setCurrentTab('mood')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex-shrink-0 ${
                currentTab === 'mood' 
                  ? 'bg-slate-600 text-slate-100' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-600'
              }`}
            >
              Mood Tracking
            </button>
            <button 
              onClick={() => setCurrentTab('sleep')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex-shrink-0 ${
                currentTab === 'sleep' 
                  ? 'bg-slate-600 text-slate-100' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-600'
              }`}
            >
              Sleep Analysis
            </button>
            <button 
              onClick={() => setCurrentTab('exercises')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex-shrink-0 ${
                currentTab === 'exercises' 
                  ? 'bg-slate-600 text-slate-100' 
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-600'
              }`}
            >
              Mental Exercises
            </button>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {currentTab === 'overview' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Mood Chart */}
                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Weekly Mood Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                          name="Mood Score"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="anxiety" 
                          stroke="#f97316" 
                          strokeWidth={2}
                          name="Anxiety Level" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Sleep Chart */}
                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Sleep Duration</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sleepData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                        <Legend />
                        <Bar 
                          dataKey="hours" 
                          fill="#8b5cf6" 
                          name="Sleep Hours"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            )}

            {currentTab === 'mood' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div 
                  className="col-span-2 p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="mb-6 text-lg font-semibold text-slate-100">Detailed Mood Tracking</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        ...moodData,
                        { name: 'Mon (prev)', mood: 5, anxiety: 6 },
                        { name: 'Tue (prev)', mood: 4, anxiety: 7 },
                        { name: 'Wed (prev)', mood: 6, anxiety: 5 },
                        { name: 'Thu (prev)', mood: 7, anxiety: 4 },
                        { name: 'Fri (prev)', mood: 6, anxiety: 5 },
                        { name: 'Sat (prev)', mood: 8, anxiety: 3 },
                        { name: 'Sun (prev)', mood: 7, anxiety: 4 },
                      ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" domain={[0, 10]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                          name="Mood Score"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="anxiety" 
                          stroke="#f97316" 
                          strokeWidth={2}
                          name="Anxiety Level" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Mood Insights */}
                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Mood Insights</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                        <h4 className="font-medium text-slate-100">Positive Trends</h4>
                      </div>
                      <p className="text-sm text-slate-300">
                        Your overall mood has improved 12% over the past 2 weeks. 
                        Meditation sessions appear to correlate with higher mood scores.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-5 h-5 mr-2 text-amber-400" />
                        <h4 className="font-medium text-slate-100">Attention Areas</h4>
                      </div>
                      <p className="text-sm text-slate-300">
                        Anxiety levels tend to increase on Tuesdays and Thursdays, 
                        which coincide with your busiest work days.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <FileText className="w-5 h-5 mr-2 text-blue-400" />
                        <h4 className="font-medium text-slate-100">Journal Sentiment</h4>
                      </div>
                      <div className="flex justify-between mt-2 mb-1">
                        <span className="text-xs text-slate-400">Negative</span>
                        <span className="text-xs text-slate-400">Positive</span>
                      </div>
                      <div className="w-full h-2 mb-2 rounded-full bg-slate-600">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-sm text-slate-300">
                        Your journal entries show a 70% positive sentiment over the past week.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Recommendations</h3>
                  <div className="space-y-4">
                    <div className="py-1 pl-4 border-l-4 border-emerald-500">
                      <h4 className="font-medium text-slate-100">Morning Meditation</h4>
                      <p className="mt-1 text-sm text-slate-300">
                        Adding a 5-minute meditation to your morning routine may help 
                        reduce anxiety levels on your busy days.
                      </p>
                    </div>
                    <div className="py-1 pl-4 border-l-4 border-blue-500">
                      <h4 className="font-medium text-slate-100">Journal Prompts</h4>
                      <p className="mt-1 text-sm text-slate-300">
                        Try using gratitude prompts in your evening journal to maintain 
                        positive sentiment patterns.
                      </p>
                    </div>
                    <div className="py-1 pl-4 border-l-4 border-purple-500">
                      <h4 className="font-medium text-slate-100">Social Connection</h4>
                      <p className="mt-1 text-sm text-slate-300">
                        Your mood scores increase after social interactions. Consider 
                        scheduling more regular check-ins with friends.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {currentTab === 'sleep' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Sleep Duration</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sleepData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                        <Legend />
                        <Bar 
                          dataKey="hours" 
                          fill="#8b5cf6" 
                          name="Sleep Hours"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-100">Sleep Quality Analysis</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-300">Overall Quality</span>
                        <span className="text-sm font-medium text-slate-300">75%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-600">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-300">Sleep Consistency</span>
                        <span className="text-sm font-medium text-slate-300">60%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-600">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-300">Deep Sleep</span>
                        <span className="text-sm font-medium text-slate-300">70%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-600">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-300">REM Sleep</span>
                        <span className="text-sm font-medium text-slate-300">80%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-600">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-2 font-medium text-md text-slate-100">Sleep Insights</h4>
                    <p className="text-sm text-slate-300">
                      Your sleep pattern shows good REM sleep but could improve in consistency. 
                      Try maintaining a more regular sleep schedule to improve overall quality.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {currentTab === 'exercises' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-emerald-500">Mental Exercises Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={exerciseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="minutes"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {exerciseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 shadow-sm bg-slate-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="mb-4 text-lg font-semibold text-emerald-500">Exercise Completion</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-emerald-100">
                            <Brain className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">5-Minute Meditation</h4>
                            <p className="text-sm text-slate-500">Mindfulness</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-emerald-500">Completed</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full">
                            <Clock className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Deep Breathing</h4>
                            <p className="text-sm text-slate-500">Stress Reduction</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-emerald-500">Completed</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-purple-100 rounded-full">
                            <FileText className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Journaling</h4>
                            <p className="text-sm text-slate-500">Self-reflection</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-amber-500">In progress</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-rose-100">
                            <ThumbsUp className="w-6 h-6 text-rose-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Gratitude Practice</h4>
                            <p className="text-sm text-slate-500">Positivity</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-slate-500">Not started</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming Appointments */}
            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Upcoming Appointments</h3>
                <button className="text-sm text-emerald-500 hover:text-emerald-600">View all</button>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <Clock className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{appointment.therapist}</h4>
                          <p className="text-sm text-slate-500">{appointment.date} at {appointment.time}</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mt-1">
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex mt-3 sm:mt-0">
                        <button className="mr-4 text-sm text-slate-400 hover:text-slate-500">
                          Reschedule
                        </button>
                        <button className="text-sm text-slate-400 hover:text-slate-500">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mental Health Tasks */}
            <motion.div 
              className="p-6 shadow-sm bg-slate-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-500">Your Tasks</h3>
                <button className="text-sm text-emerald-500 hover:text-emerald-600">Add new</button>
              </div>
              <div className="space-y-4">
                {tasksData.map(task => (
                  <div key={task.id} className="flex items-start p-3 rounded-lg hover:bg-slate-500">
                    <div className="flex-shrink-0 mr-3">
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 rounded-full border-slate-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-400'}`}>
                        {task.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Weekly Progress</h4>
                  <span className="text-sm font-medium text-emerald-500">2/4 completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-500">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: '50%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
    </AuthWrapper>
   
  );
};

export default Dashboard;