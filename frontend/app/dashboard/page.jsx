"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  Bell, 
  Moon, 
  Menu, 
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
  LogOut,
  X,
  Edit,
  Plus,
  Save,
  Trash,
  Info
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Create User Auth Context
const AuthContext = createContext();

// Create a wrapper component for authentication logic
function AuthProvider({ children }) {
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

    // Client-side only code
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        fetchUser();
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Chart.js dynamic import
const DynamicChart = ({ type, data, options }) => {
  const [chartLibrary, setChartLibrary] = useState(null);
  const chartRef = React.useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const importChart = async () => {
      if (typeof window !== 'undefined') {
        try {
          const Chart = await import('chart.js/auto');
          setChartLibrary(Chart);
        } catch (error) {
          console.error('Error loading Chart.js:', error);
        }
      }
    };
    importChart();
  }, []);

  useEffect(() => {
    if (chartLibrary && chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chart) {
        chart.destroy();
      }

      // Create new chart
      const newChart = new chartLibrary.Chart(chartRef.current, {
        type,
        data,
        options
      });

      setChart(newChart);
      
      // Cleanup function
      return () => {
        if (newChart) {
          newChart.destroy();
        }
      };
    }
  }, [chartLibrary, data, options, type, chartRef]);

  return <canvas ref={chartRef} />;
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-lg p-6 mx-4 bg-slate-700 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-600"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

// Glassmorphic Card component
const GlassmorphicCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-slate-700 bg-opacity-70 backdrop-blur-lg border border-slate-600 border-opacity-20 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const auth = useContext(AuthContext);
  const { user, loading, logout } = auth || { user: null, loading: true, logout: () => {} };

  // Modal states
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [activeInfoContent, setActiveInfoContent] = useState("");

  // Editing states
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState(null);

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

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setUserData(prevData => {
      const updatedTasks = prevData.tasksData.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prevData, tasksData: updatedTasks };
    });
  };

  // Function to add new task
  const addNewTask = () => {
    if (newTask.trim() === "") return;
    
    const newTaskObj = {
      id: Date.now(),
      task: newTask,
      completed: false
    };
    
    setUserData(prevData => ({
      ...prevData,
      tasksData: [...prevData.tasksData, newTaskObj]
    }));
    
    setNewTask("");
    setTaskModalOpen(false);
  };

  // Function to delete task
  const deleteTask = (taskId) => {
    setUserData(prevData => ({
      ...prevData,
      tasksData: prevData.tasksData.filter(task => task.id !== taskId)
    }));
  };

  // Function to cancel appointment
  const cancelAppointment = (appointmentId) => {
    setUserData(prevData => ({
      ...prevData,
      upcomingAppointments: prevData.upcomingAppointments.filter(
        appointment => appointment.id !== appointmentId
      ),
      stats: {
        ...prevData.stats,
        appointments: prevData.stats.appointments - 1
      }
    }));
    setAppointmentModalOpen(false);
  };

  // Function to start editing appointment
  const startEditAppointment = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setEditedAppointment({...appointment});
    setCurrentAppointment(appointment);
    setAppointmentModalOpen(true);
  };

  // Function to save edited appointment
  const saveEditedAppointment = () => {
    if (!editedAppointment) return;
    
    setUserData(prevData => ({
      ...prevData,
      upcomingAppointments: prevData.upcomingAppointments.map(appt => 
        appt.id === editingAppointmentId ? editedAppointment : appt
      )
    }));
    
    setEditingAppointmentId(null);
    setEditedAppointment(null);
    setAppointmentModalOpen(false);
  };

  // Function to show info modal with specific content
  const showInfoModal = (contentType) => {
    let content = "";
    
    switch(contentType) {
      case "wellnessScore":
        content = "Your Wellness Score is calculated based on various factors including your mood trends, sleep quality, exercise habits, and therapy adherence. Higher scores indicate better overall mental wellness.";
        break;
      case "mood":
        content = "The Mood Tracker helps you visualize your emotional state over time. Track patterns to identify triggers and improvements in your mental health journey.";
        break;
      case "sleep":
        content = "Quality sleep is essential for mental health. This chart shows your sleep duration throughout the week, helping you identify patterns that may affect your mood and anxiety levels.";
        break;
      case "appointments":
        content = "Manage your therapy sessions and mental health appointments here. You can view upcoming appointments, reschedule, or cancel as needed.";
        break;
      default:
        content = "This section provides important information about your mental health journey.";
    }
    
    setActiveInfoContent(content);
    setInfoModalOpen(true);
  };

  // Chart data for Chart.js
  const prepareMoodChartData = () => {
    if (!userData) return null;
    
    return {
      labels: userData.moodData.map(item => item.name),
      datasets: [
        {
          label: 'Mood',
          data: userData.moodData.map(item => item.mood),
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Anxiety',
          data: userData.moodData.map(item => item.anxiety),
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const prepareSleepChartData = () => {
    if (!userData) return null;
    
    return {
      labels: userData.sleepData.map(item => item.name),
      datasets: [
        {
          label: 'Sleep Hours',
          data: userData.sleepData.map(item => item.hours),
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 2,
          barThickness: 15,
          borderRadius: 4
        }
      ]
    };
  };

  const prepareExerciseChartData = () => {
    if (!userData) return null;
    
    return {
      labels: userData.exerciseData.map(item => item.name),
      datasets: [
        {
          data: userData.exerciseData.map(item => item.minutes),
          backgroundColor: userData.exerciseData.map(item => item.fill),
          borderWidth: 0,
          hoverOffset: 15
        }
      ]
    };
  };

  const prepareWellnessScoreChartData = () => {
    if (!userData) return null;
    
    return {
      labels: userData.wellnessScoreData.map(item => item.date),
      datasets: [
        {
          label: 'Wellness Score',
          data: userData.wellnessScoreData.map(item => item.score),
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  // Chart options
  const moodChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const sleepChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const exerciseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const wellnessScoreChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
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
    <div className="flex h-screen bg-slate-800 font-['Poppins']">
      
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
            <motion.button 
              className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-6 h-6" />
            </motion.button>
            <motion.button 
              className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Moon className="w-6 h-6" />
            </motion.button>
            <div className="relative group">
              <motion.button 
                className="flex items-center justify-center w-8 h-8 overflow-hidden text-white rounded-full bg-emerald-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
              </motion.button>
              <motion.div 
                className="absolute right-0 z-10 invisible w-48 p-2 transition-all origin-top-right scale-95 -translate-y-2 rounded-md shadow-lg opacity-0 bg-slate-700 top-full group-hover:visible group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
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
              </motion.div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-slate-800 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div 
            className="relative p-6 mb-8 overflow-hidden shadow-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"></div>
            
            <div className="relative flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 md:mb-0">
                <motion.h2 
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Good {greeting}, {user.name}!
                </motion.h2>
                <motion.p 
                  className="mt-1 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Here&apos;s an overview of your mental wellness journey
                </motion.p>
              </div>
            </div>
            
            {/* Wellness Score */}
            <GlassmorphicCard className="p-4 mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-white">Your Wellness Score</h3>
                  <button 
                    onClick={() => showInfoModal("wellnessScore")}
                    className="p-1 ml-1 text-slate-400 hover:text-white"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-lg font-semibold text-emerald-400">
                  <CountUp end={85} duration={2} /> / 100
                </span>
              </div>
              <div className="h-20">
                {userData && (
                  <DynamicChart 
                    type="line"
                    data={prepareWellnessScoreChartData()}
                    options={wellnessScoreChartOptions}
                  />
                )}
              </div>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">+3 points</span>
                <span className="ml-2 text-sm text-slate-400">from last week</span>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              className="relative overflow-hidden border shadow-lg bg-slate-700 rounded-xl border-slate-600/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-emerald-500/10"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 mr-4 rounded-full bg-emerald-100">
                    <Calendar className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">Appointments</p>
                    <h3 className="text-2xl font-bold text-slate-100">
                      <CountUp end={stats.appointments} duration={2} />
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="font-medium text-emerald-400">+{stats.newAppointments} new</span>
                  <span className="ml-2 text-slate-300">this month</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden border shadow-lg bg-slate-700 rounded-xl border-slate-600/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-blue-500/10"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 mr-4 bg-blue-100 rounded-full">
                    <ThumbsUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">Average Mood</p>
                    <h3 className="text-2xl font-bold text-slate-100">
                      <CountUp end={stats.averageMood} decimals={1} duration={2} /> / 10
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="font-medium text-emerald-400">+{stats.moodChange}</span>
                  <span className="ml-2 text-slate-300">from last week</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden border shadow-lg bg-slate-700 rounded-xl border-slate-600/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-purple-500/10"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 mr-4 bg-purple-100 rounded-full">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">Therapy Sessions</p>
                    <h3 className="text-2xl font-bold text-slate-100">
                      <CountUp end={stats.therapySessions} duration={2} />
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="font-medium text-slate-300">Next: </span>
                  <span className="ml-2 text-slate-300">{stats.nextTherapy}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden border shadow-lg bg-slate-700 rounded-xl border-slate-600/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-amber-500/10"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="p-3 mr-4 rounded-full bg-amber-100">
                    <CheckCircle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">Exercises Completed</p>
                    <h3 className="text-2xl font-bold text-slate-100">
                      <CountUp end={stats.completedExercises} duration={2} />
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="font-medium text-emerald-400">{stats.completionRate}%</span>
                  <span className="ml-2 text-slate-300">completion rate</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-start mb-6 border-b border-slate-700">
            <button
              onClick={() => setCurrentTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
                currentTab === 'overview' 
                  ? 'text-emerald-400 border-b-2 border-emerald-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentTab('mood')}
              className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
                currentTab === 'mood' 
                  ? 'text-emerald-400 border-b-2 border-emerald-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Mood Tracker
            </button>
            <button
              onClick={() => setCurrentTab('sleep')}
              className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
                currentTab === 'sleep' 
                  ? 'text-emerald-400 border-b-2 border-emerald-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sleep
            </button>
            <button
              onClick={() => setCurrentTab('appointments')}
              className={`px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
                currentTab === 'appointments' 
                  ? 'text-emerald-400 border-b-2 border-emerald-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Appointments
            </button>
          </div>

          {/* Main Dashboard Content */}
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {currentTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Mood Overview Card */}
                  <GlassmorphicCard className="col-span-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-slate-100">Mood Overview</h3>
                        <button 
                          onClick={() => showInfoModal('mood')}
                          className="p-1 ml-1 text-slate-400 hover:text-white"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-300">Past Week</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="h-64">
                      {userData && (
                        <DynamicChart 
                          type="line"
                          data={prepareMoodChartData()}
                          options={moodChartOptions}
                        />
                      )}
                    </div>
                  </GlassmorphicCard>

                  {/* Tasks Card */}
                  <GlassmorphicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-100">Self-Care Tasks</h3>
                      <motion.button
                        onClick={() => setTaskModalOpen(true)}
                        className="p-2 rounded-full bg-slate-600 hover:bg-slate-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                    <div className="h-64 overflow-y-auto">
                      {tasksData.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 mb-2 rounded-lg bg-slate-600/50">
                          <div className="flex items-center">
                            <button 
                              onClick={() => toggleTaskCompletion(task.id)}
                              className={`p-1 mr-3 rounded-full border ${
                                task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-400'
                              }`}
                            >
                              {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                            </button>
                            <span className={`text-sm ${
                              task.completed ? 'text-slate-400 line-through' : 'text-white'
                            }`}>{task.task}</span>
                          </div>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-slate-400 hover:text-red-400"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {tasksData.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <FileText className="w-12 h-12 mb-2 text-slate-500" />
                          <p className="text-slate-400">No tasks added yet</p>
                          <button 
                            onClick={() => setTaskModalOpen(true)}
                            className="px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
                          >
                            Add New Task
                          </button>
                        </div>
                      )}
                    </div>
                  </GlassmorphicCard>

                  {/* Sleep Card */}
                  <GlassmorphicCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-slate-100">Sleep Hours</h3>
                        <button 
                          onClick={() => showInfoModal('sleep')}
                          className="p-1 ml-1 text-slate-400 hover:text-white"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="h-64">
                      {userData && (
                        <DynamicChart 
                          type="bar"
                          data={prepareSleepChartData()}
                          options={sleepChartOptions}
                        />
                      )}
                    </div>
                  </GlassmorphicCard>

                  {/* Weekly Wellness Activities */}
                  <GlassmorphicCard className="col-span-1 p-6 lg:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold text-slate-100">Weekly Wellness Activities</h3>
                    <div className="flex items-center justify-center h-64">
                      {userData && (
                        <DynamicChart 
                          type="pie"
                          data={prepareExerciseChartData()}
                          options={exerciseChartOptions}
                        />
                      )}
                    </div>
                  </GlassmorphicCard>
                </div>
              </motion.div>
            )}

            {/* Mood Tracker Tab */}
            {currentTab === 'mood' && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-slate-100">Mood & Anxiety Tracker</h3>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-slate-300">Past Week</span>
                      <div className="px-3 py-1 text-sm rounded-lg bg-slate-600 text-slate-300">
                        Mar 27 - Apr 2
                      </div>
                    </div>
                  </div>
                  <div className="h-96">
                    {userData && (
                      <DynamicChart 
                        type="line"
                        data={prepareMoodChartData()}
                        options={moodChartOptions}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Average Mood</p>
                      <h4 className="text-2xl font-semibold text-white">7.1 / 10</h4>
                      <div className="flex items-center mt-2">
                        <ArrowUp className="w-4 h-4 mr-1 text-emerald-400" />
                        <span className="text-sm text-emerald-400">0.3 from last week</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Average Anxiety</p>
                      <h4 className="text-2xl font-semibold text-white">4.1 / 10</h4>
                      <div className="flex items-center mt-2">
                        <ArrowDown className="w-4 h-4 mr-1 text-emerald-400" />
                        <span className="text-sm text-emerald-400">0.5 from last week</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Best Mood Day</p>
                      <h4 className="text-2xl font-semibold text-white">Saturday</h4>
                      <div className="flex items-center mt-2">
                        <Zap className="w-4 h-4 mr-1 text-amber-400" />
                        <span className="text-sm text-slate-300">9.0 / 10</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Lowest Anxiety</p>
                      <h4 className="text-2xl font-semibold text-white">Saturday</h4>
                      <div className="flex items-center mt-2">
                        <Zap className="w-4 h-4 mr-1 text-amber-400" />
                        <span className="text-sm text-slate-300">2.0 / 10</span>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            )}

            {/* Sleep Tab */}
            {currentTab === 'sleep' && (
              <motion.div
                key="sleep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-slate-100">Sleep Tracker</h3>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-slate-300">Past Week</span>
                      <div className="px-3 py-1 text-sm rounded-lg bg-slate-600 text-slate-300">
                        Mar 27 - Apr 2
                      </div>
                    </div>
                  </div>
                  <div className="h-96">
                    {userData && (
                      <DynamicChart 
                        type="bar"
                        data={prepareSleepChartData()}
                        options={sleepChartOptions}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Average Sleep</p>
                      <h4 className="text-2xl font-semibold text-white">7.0 hrs</h4>
                      <div className="flex items-center mt-2">
                        <ArrowUp className="w-4 h-4 mr-1 text-emerald-400" />
                        <span className="text-sm text-emerald-400">0.5 from last week</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Best Sleep</p>
                      <h4 className="text-2xl font-semibold text-white">8.5 hrs</h4>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-1 text-amber-400" />
                        <span className="text-sm text-slate-300">Saturday</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Least Sleep</p>
                      <h4 className="text-2xl font-semibold text-white">5.5 hrs</h4>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-1 text-red-400" />
                        <span className="text-sm text-slate-300">Thursday</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-600/50 rounded-xl">
                      <p className="text-sm text-slate-300">Sleep Quality</p>
                      <h4 className="text-2xl font-semibold text-white">7.2 / 10</h4>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 mr-1 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Improving</span>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            )}

            {/* Appointments Tab */}
            {currentTab === 'appointments' && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GlassmorphicCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <h3 className="text-xl font-semibold text-slate-100">Upcoming Appointments</h3>
                      <button 
                        onClick={() => showInfoModal('appointments')}
                        className="p-1 ml-1 text-slate-400 hover:text-white"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-slate-600">
                          <th className="pb-2 text-slate-300">Provider</th>
                          <th className="pb-2 text-slate-300">Date</th>
                          <th className="pb-2 text-slate-300">Time</th>
                          <th className="pb-2 text-slate-300">Type</th>
                          <th className="pb-2 text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAppointments.map(appointment => (
                          <tr key={appointment.id} className="border-b border-slate-700">
                            <td className="py-4 text-white">{appointment.therapist}</td>
                            <td className="py-4 text-white">{appointment.date}</td>
                            <td className="py-4 text-white">{appointment.time}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                appointment.type === 'Video Call' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {appointment.type}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => startEditAppointment(appointment)}
                                  className="p-1 text-slate-300 hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    setCurrentAppointment(appointment);
                                    setAppointmentModalOpen(true);
                                  }}
                                  className="p-1 text-slate-300 hover:text-red-400"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {upcomingAppointments.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400">
                              No upcoming appointments
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {taskModalOpen && (
          <Modal 
            isOpen={taskModalOpen}
            onClose={() => setTaskModalOpen(false)}
            title="Add New Self-Care Task"
          >
            <div className="mt-4">
              <input 
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task description"
                className="w-full px-4 py-3 border rounded-lg bg-slate-600 text-slate-100 border-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => setTaskModalOpen(false)}
                className="px-4 py-2 font-medium bg-transparent rounded-lg text-slate-300 hover:bg-slate-600"
              >
                Cancel
              </button>
              <button 
                onClick={addNewTask}
                className="px-4 py-2 font-medium text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
              >
                Add Task
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Appointment Modal */}
      <AnimatePresence>
        {appointmentModalOpen && (
          <Modal 
            isOpen={appointmentModalOpen}
            onClose={() => {
              setAppointmentModalOpen(false);
              setEditingAppointmentId(null);
              setEditedAppointment(null);
            }}
            title={editingAppointmentId ? "Edit Appointment" : "Appointment Details"}
          >
            <div className="mt-4">
              {editingAppointmentId ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">Therapist</label>
                    <input 
                      type="text"
                      value={editedAppointment?.therapist || ''}
                      onChange={(e) => setEditedAppointment({...editedAppointment, therapist: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg bg-slate-600 text-slate-100 border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">Date</label>
                    <input 
                      type="text"
                      value={editedAppointment?.date || ''}
                      onChange={(e) => setEditedAppointment({...editedAppointment, date: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg bg-slate-600 text-slate-100 border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">Time</label>
                    <input 
                      type="text"
                      value={editedAppointment?.time || ''}
                      onChange={(e) => setEditedAppointment({...editedAppointment, time: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg bg-slate-600 text-slate-100 border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">Type</label>
                    <select
                      value={editedAppointment?.type || ''}
                      onChange={(e) => setEditedAppointment({...editedAppointment, type: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg bg-slate-600 text-slate-100 border-slate-500"
                    >
                      <option value="Video Call">Video Call</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Therapist:</span>
                    <span className="font-medium text-white">{currentAppointment?.therapist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Date:</span>
                    <span className="font-medium text-white">{currentAppointment?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time:</span>
                    <span className="font-medium text-white">{currentAppointment?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Type:</span>
                    <span className="font-medium text-white">{currentAppointment?.type}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => {
                  setAppointmentModalOpen(false);
                  setEditingAppointmentId(null);
                  setEditedAppointment(null);
                }}
                className="px-4 py-2 font-medium bg-transparent rounded-lg text-slate-300 hover:bg-slate-600"
              >
                Cancel
              </button>
              {editingAppointmentId ? (
                <button 
                  onClick={saveEditedAppointment}
                  className="px-4 py-2 font-medium text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => currentAppointment && cancelAppointment(currentAppointment.id)}
                  className="px-4 py-2 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {infoModalOpen && (
          <Modal 
            isOpen={infoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            title="Information"
          >
            <div className="mt-4">
              <p className="text-slate-300">{activeInfoContent}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setInfoModalOpen(false)}
                className="px-4 py-2 font-medium text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
              >
                Got it
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default DashboardPage;