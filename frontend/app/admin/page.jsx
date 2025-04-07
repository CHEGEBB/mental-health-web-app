"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  CalendarCheck, 
  BarChart2, 
  ShieldAlert, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  Home,
  LogOut,
  ChevronDown,
  Edit,
  Trash2,
  Plus,
  AlertTriangle,
  Check,
  Clock,
  UserPlus,
  UserMinus,
  RefreshCw,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Info,
  User,
  ThumbsUp
} from 'lucide-react';

// Mock data - would come from API in production
const MOCK_USERS = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    email: "alex@example.com", 
    joinDate: "2024-12-05", 
    status: "active",
    therapySessions: 12,
    lastLogin: "2025-04-05T14:32:00",
    riskLevel: "low",
    progress: 78,
    notes: "Making steady progress with anxiety management techniques."
  },
  { 
    id: 2, 
    name: "Samantha Williams", 
    email: "samantha@example.com", 
    joinDate: "2025-01-14", 
    status: "active",
    therapySessions: 8,
    lastLogin: "2025-04-07T09:15:00",
    riskLevel: "medium",
    progress: 62,
    notes: "Experiencing some issues with medication side effects. Scheduled follow-up."
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    email: "michael@example.com", 
    joinDate: "2025-02-21", 
    status: "inactive",
    therapySessions: 3,
    lastLogin: "2025-03-15T11:20:00",
    riskLevel: "low",
    progress: 35,
    notes: "Hasn't logged in for 3 weeks. Needs follow-up contact."
  },
  { 
    id: 4, 
    name: "Olivia Martinez", 
    email: "olivia@example.com", 
    joinDate: "2025-01-03", 
    status: "active",
    therapySessions: 15,
    lastLogin: "2025-04-06T16:45:00",
    riskLevel: "high",
    progress: 52,
    notes: "Recent crisis intervention. Needs close monitoring and support."
  },
  { 
    id: 5, 
    name: "James Wilson", 
    email: "james@example.com", 
    joinDate: "2025-03-10", 
    status: "pending",
    therapySessions: 0,
    lastLogin: "2025-03-10T08:30:00",
    riskLevel: "unknown",
    progress: 0,
    notes: "New sign-up, pending initial assessment."
  },
  { 
    id: 6, 
    name: "Emma Thompson", 
    email: "emma@example.com", 
    joinDate: "2024-11-18", 
    status: "active",
    therapySessions: 20,
    lastLogin: "2025-04-07T13:10:00",
    riskLevel: "low",
    progress: 85,
    notes: "Excellent progress in depression management program."
  },
  { 
    id: 7, 
    name: "David Garcia", 
    email: "david@example.com", 
    joinDate: "2025-02-05", 
    status: "active",
    therapySessions: 6,
    lastLogin: "2025-04-02T10:20:00",
    riskLevel: "medium",
    progress: 45,
    notes: "Working through trauma therapy modules. Showing improvement."
  }
];

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    userId: 1,
    userName: "Alex Johnson",
    therapist: "Dr. Sarah Miller",
    date: "2025-04-10",
    time: "10:00 AM",
    type: "Video Call",
    status: "scheduled"
  },
  {
    id: 2,
    userId: 4,
    userName: "Olivia Martinez",
    therapist: "Dr. Michael Chen",
    date: "2025-04-08",
    time: "11:30 AM",
    type: "In-person",
    status: "completed"
  },
  {
    id: 3,
    userId: 2,
    userName: "Samantha Williams",
    therapist: "Dr. James Wilson",
    date: "2025-04-12",
    time: "3:15 PM",
    type: "Video Call",
    status: "scheduled"
  },
  {
    id: 4,
    userId: 6,
    userName: "Emma Thompson",
    therapist: "Dr. Sarah Miller",
    date: "2025-04-15",
    time: "9:45 AM",
    type: "Video Call",
    status: "scheduled"
  },
  {
    id: 5,
    userId: 7,
    userName: "David Garcia",
    therapist: "Dr. Michael Chen",
    date: "2025-04-09",
    time: "2:00 PM",
    type: "In-person",
    status: "rescheduled"
  },
  {
    id: 6,
    userId: 3,
    userName: "Michael Brown",
    therapist: "Dr. James Wilson",
    date: "2025-04-11",
    time: "4:30 PM",
    type: "Video Call",
    status: "cancelled"
  },
  {
    id: 7,
    userId: 4,
    userName: "Olivia Martinez",
    therapist: "Dr. Sarah Miller",
    date: "2025-04-18",
    time: "10:15 AM",
    type: "In-person",
    status: "scheduled"
  }
];

// Weekly user sign-ups data for chart
const USER_SIGNUP_DATA = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 8 },
  { day: 'Wed', count: 12 },
  { day: 'Thu', count: 7 },
  { day: 'Fri', count: 9 },
  { day: 'Sat', count: 6 },
  { day: 'Sun', count: 4 },
];

// User engagement data for chart
const USER_ENGAGEMENT_DATA = [
  { month: 'Jan', active: 240, total: 270 },
  { month: 'Feb', active: 285, total: 310 },
  { month: 'Mar', active: 320, total: 350 },
  { month: 'Apr', active: 365, total: 390 },
];

// Stats data
const STATS_DATA = {
  totalUsers: 384,
  activeUsers: 312,
  newUsersThisWeek: 51,
  therapySessionsToday: 28,
  upcomingAppointments: 43,
  averageUserProgress: 65,
  activeSessions: 12,
  highRiskUsers: 8
};

// Admin Dashboard Component
export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(MOCK_USERS);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState(STATS_DATA);
  const [userSignupData, setUserSignupData] = useState(USER_SIGNUP_DATA);
  const [userEngagementData, setUserEngagementData] = useState(USER_ENGAGEMENT_DATA);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [status, setStatus] = useState('all');
  const [riskLevel, setRiskLevel] = useState('all');
  const [adminActive, setAdminActive] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "High-risk user detected", isNew: true },
    { id: 2, text: "System update available", isNew: true },
    { id: 3, text: "5 appointment cancellations today", isNew: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [saveNotificationText, setSaveNotificationText] = useState('');
  const [showActionConfirmation, setShowActionConfirmation] = useState(false);
  const [actionConfirmation, setActionConfirmation] = useState({ type: '', message: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [userSearchTimeout, setUserSearchTimeout] = useState(null);
  
  // Verify admin authentication on load
  useEffect(() => {
    // Simulate fetching admin token from storage
    const checkAdminAuth = () => {
      // For demo, we'll just set a token if one doesn't exist
      if (!localStorage.getItem('adminToken')) {
        localStorage.setItem('adminToken', 'demo-token-123');
        localStorage.setItem('adminUser', JSON.stringify({
          name: 'Admin',
          email: 'admin@mindharmony.com'
        }));
      }
      
      setAdminActive(true);
      
      // Simulate data loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    
    checkAdminAuth();
    
    // Dynamically update stats at intervals to simulate real-time data
    const statsInterval = setInterval(() => {
      setStatsData(prev => ({
        ...prev,
        activeUsers: Math.min(prev.totalUsers, prev.activeUsers + Math.floor(Math.random() * 3) - 1),
        activeSessions: Math.max(0, prev.activeSessions + Math.floor(Math.random() * 3) - 1),
        therapySessionsToday: prev.therapySessionsToday + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);
    
    // Auto-create random notifications occasionally
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotificationTexts = [
          "New user registration detected",
          "Suspicious login attempt blocked",
          "Database backup completed",
          "System health check: All systems normal",
          "High-risk user activity detected",
          "API rate limit reached"
        ];
        
        const randomText = newNotificationTexts[Math.floor(Math.random() * newNotificationTexts.length)];
        
        setNotifications(prev => [
          { id: Date.now(), text: randomText, isNew: true },
          ...prev.slice(0, 9) // Keep only the 10 most recent
        ]);
      }
    }, 15000);
    
    return () => {
      clearInterval(statsInterval);
      clearInterval(notificationInterval);
    };
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (userSearchTimeout) {
      clearTimeout(userSearchTimeout);
    }
    
    if (userSearchInput !== searchQuery) {
      setIsDataLoading(true);
      const timeout = setTimeout(() => {
        setSearchQuery(userSearchInput);
        setIsDataLoading(false);
      }, 500);
      
      setUserSearchTimeout(timeout);
    }
    
    return () => {
      if (userSearchTimeout) {
        clearTimeout(userSearchTimeout);
      }
    };
  }, [userSearchInput, searchQuery, userSearchTimeout]);

  const handleLogout = () => {
    // Show confirmation
    setActionConfirmation({
      type: 'logout',
      message: 'Are you sure you want to log out?'
    });
    setShowActionConfirmation(true);
  };

  const confirmLogout = () => {
    setShowActionConfirmation(false);
    
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/');
    }, 800);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserSearch = (e) => {
    setUserSearchInput(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = status === 'all' || user.status === status;
    
    // Apply risk level filter
    const matchesRisk = riskLevel === 'all' || user.riskLevel === riskLevel;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const getRiskBadgeClass = (riskLevel) => {
    switch(riskLevel) {
      case 'high': 
        return 'bg-red-100 text-red-800';
      case 'medium': 
        return 'bg-yellow-100 text-yellow-800';
      case 'low': 
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'active': 
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive': 
        return 'bg-slate-100 text-slate-800';
      case 'pending': 
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStatusClass = (status) => {
    switch(status) {
      case 'scheduled': 
        return 'bg-blue-100 text-blue-800';
      case 'completed': 
        return 'bg-green-100 text-green-800';
      case 'cancelled': 
        return 'bg-red-100 text-red-800';
      case 'rescheduled': 
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark all as read when opening
      setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
    }
  };
  
  const handleDeleteUser = (userId) => {
    setActionConfirmation({
      type: 'deleteUser',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      userId: userId
    });
    setShowActionConfirmation(true);
  };
  
  const confirmDeleteUser = (userId) => {
    setShowActionConfirmation(false);
    setShowUserModal(false);
    
    // Show loading
    setIsDataLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      setIsDataLoading(false);
      
      // Show success notification
      setSaveNotificationText('User deleted successfully');
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    }, 800);
  };
  
  const handleEditUser = (user) => {
    setEditingUser({...user});
    setShowUserEditModal(true);
    setShowUserModal(false);
  };
  
  const saveUserChanges = (updatedUser) => {
    setIsDataLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers(prev => 
        prev.map(user => user.id === updatedUser.id ? updatedUser : user)
      );
      
      setShowUserEditModal(false);
      setIsDataLoading(false);
      
      // Show success notification
      setSaveNotificationText('User updated successfully');
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    }, 800);
  };
  
  const cancelAppointment = (appointmentId) => {
    setActionConfirmation({
      type: 'cancelAppointment',
      message: 'Are you sure you want to cancel this appointment?',
      appointmentId: appointmentId
    });
    setShowActionConfirmation(true);
  };
  
  const confirmCancelAppointment = (appointmentId) => {
    setShowActionConfirmation(false);
    setShowAppointmentModal(false);
    
    // Show loading
    setIsDataLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAppointments(prev => 
        prev.map(a => a.id === appointmentId 
          ? {...a, status: 'cancelled'} 
          : a
        )
      );
      
      setIsDataLoading(false);
      
      // Show success notification
      setSaveNotificationText('Appointment cancelled successfully');
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    }, 800);
  };
  
  const handleChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    
    // Show success notification
    setSaveNotificationText(`Theme changed to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };
  
  const saveSettings = () => {
    setIsDataLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDataLoading(false);
      
      // Show success notification
      setSaveNotificationText('Settings saved successfully');
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    }, 800);
  };
  
  // Loading state
  if (isLoading || !adminActive) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 font-[Poppins]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-t-4 rounded-full border-t-emerald-500 border-slate-700 animate-spin"></div>
          <h2 className="mt-4 text-xl font-semibold text-white">Loading Admin Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-800 font-[Poppins]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 z-50 flex flex-col w-64 bg-slate-700 md:relative"
          >
            <div className="p-4 border-b border-slate-600">
              <div className="flex items-center">
                <div className="mr-2 text-emerald-400">
                  <ShieldAlert size={24} />
                </div>
                <h1 className="text-xl font-bold text-white">MindHarmony Admin</h1>
              </div>
              <p className="mt-1 text-xs text-slate-400">Management Dashboard</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-3 space-x-3 rounded-lg transition-all ${
                  activeTab === 'users' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Users size={20} />
                <span>User Management</span>
              </button>
              
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center w-full p-3 space-x-3 rounded-lg transition-all ${
                  activeTab === 'appointments' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <CalendarCheck size={20} />
                <span>Appointments</span>
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center w-full p-3 space-x-3 rounded-lg transition-all ${
                  activeTab === 'analytics' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <BarChart2 size={20} />
                <span>Analytics</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full p-3 space-x-3 rounded-lg transition-all ${
                  activeTab === 'security' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <ShieldAlert size={20} />
                <span>Security</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 space-x-3 rounded-lg transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>

              <div className="pt-6 mt-6 border-t border-slate-600">
                <button
                  onClick={() => {
                    // Simulate loading
                    setIsLoading(true);
                    setTimeout(() => {
                      router.push('/');
                    }, 800);
                  }}
                  className="flex items-center w-full p-3 space-x-3 rounded-lg text-slate-300 hover:bg-slate-600"
                >
                  <Home size={20} />
                  <span>Go to Homepage</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 space-x-3 text-red-300 rounded-lg hover:bg-slate-600"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
            
            <div className="p-4 border-t border-slate-600">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white rounded-full bg-emerald-500">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-slate-400">admin@mindharmony.com</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="z-10 flex items-center h-16 px-4 bg-slate-700 sm:px-6">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-white">
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'appointments' && 'Appointment Tracking'}
              {activeTab === 'analytics' && 'Analytics & Reports'}
              {activeTab === 'security' && 'Security Settings'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-1 text-slate-300 hover:text-white"
                onClick={toggleNotifications}
              >
                <Bell size={20} />
                {notifications.filter(n => n.isNew).length > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                )}
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 overflow-hidden bg-white rounded-lg shadow-lg w-72">
                  <div className="px-4 py-2 font-medium text-slate-800 bg-slate-100">
                    Notifications
                  </div>
                  <div className="overflow-y-auto max-h-80">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-600">
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 text-sm border-b border-slate-100 ${
                            notification.isNew ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="text-slate-800">{notification.text}</div>
                          <div className="mt-1 text-xs text-slate-500">Just now</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 text-center bg-slate-100">
                    <button 
                      className="w-full px-3 py-1 text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => setNotifications([])}
                    >
                      Clear all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 text-xs text-white rounded-full bg-emerald-500">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto bg-slate-800 sm:p-6">
          {/* Dashboard Overview Stats */}
          <section className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-100">Total Users</p>
                  <h3 className="text-2xl font-bold text-white">{statsData.totalUsers}</h3>
                </div>
                <div className="p-2 bg-white rounded-lg bg-opacity-20">
                  <Users size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-emerald-100">
                <span className="flex items-center">
                  <span className="flex items-center mr-1 text-emerald-200">
                    +{statsData.newUsersThisWeek}
                  </span>
                  new this week
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">Active Users</p>
                  <h3 className="text-2xl font-bold text-white">{statsData.activeUsers}</h3>
                </div>
                <div className="p-2 bg-white rounded-lg bg-opacity-20">
                  <User size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-blue-100">
                <span className="flex items-center">
                  <span className="flex items-center mr-1 text-blue-200">
                    {Math.round((statsData.activeUsers / statsData.totalUsers) * 100)}%
                  </span>
                  of total users
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">Today's Sessions</p>
                  <h3 className="text-2xl font-bold text-white">{statsData.therapySessionsToday}</h3>
                </div>
                <div className="p-2 bg-white rounded-lg bg-opacity-20">
                  <CalendarCheck size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-purple-100">
                <span className="flex items-center">
                  <span className="flex items-center mr-1 text-purple-200">
                    {statsData.activeSessions}
                  </span>
                  in progress now
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-100">High Risk Users</p>
                  <h3 className="text-2xl font-bold text-white">{statsData.highRiskUsers}</h3>
                </div>
                <div className="p-2 bg-white rounded-lg bg-opacity-20">
                  <AlertTriangle size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-red-100">
                <span className="flex items-center">
                  <span className="flex items-center mr-1 text-red-200">
                    {Math.round((statsData.highRiskUsers / statsData.totalUsers) * 100)}%
                  </span>
                  of total users
                </span>
              </div>
            </motion.div>
          </section>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 bg-slate-700 rounded-xl">
                <div className="flex flex-col items-start justify-between p-4 border-b sm:flex-row border-slate-600">
                  <h2 className="mb-2 text-lg font-semibold text-white sm:mb-0">User Management</h2>
                  
                  <div className="flex flex-col w-full space-y-2 sm:flex-row sm:w-auto sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={userSearchInput}
                        onChange={handleUserSearch}
                        className="w-full px-4 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:w-64"
                      />
                      {isDataLoading ? (
                        <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
                          <div className="w-4 h-4 border-2 border-t-2 rounded-full border-slate-600 border-t-emerald-500 animate-spin"></div>
                        </div>
                      ) : (
                        <Search size={18} className="absolute transform -translate-y-1/2 text-slate-400 right-3 top-1/2" />
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <select
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          setIsDataLoading(true);
                          setTimeout(() => setIsDataLoading(false), 300);
                        }}
                        className="px-3 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                      
                      <select
                        value={riskLevel}
                        onChange={(e) => {
                          setRiskLevel(e.target.value);
                          setIsDataLoading(true);
                          setTimeout(() => setIsDataLoading(false), 300);
                        }}
                        className="px-3 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="all">All Risk Levels</option>
                        <option value="high">High Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="low">Low Risk</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 overflow-x-auto">
                  {isDataLoading ? (
                    <div className="py-8 text-center text-slate-400">
                      <div className="w-8 h-8 mx-auto border-2 border-t-2 rounded-full border-slate-600 border-t-emerald-500 animate-spin"></div>
                      <p className="mt-2">Loading users...</p>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="py-8 text-center text-slate-400">
                      <p>No users match your search criteria.</p>
                    </div>
                  ) : (
                    <table className="w-full text-sm text-left text-slate-300">
                      <thead className="text-xs uppercase bg-slate-800 text-slate-400">
                        <tr>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Join Date</th>
                          <th className="px-6 py-3">Risk Level</th>
                          <th className="px-6 py-3">Progress</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr 
                            key={user.id} 
                            className="transition-colors border-b cursor-pointer border-slate-600 hover:bg-slate-800"
                            onClick={() => handleUserClick(user)}
                          >
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                              {user.name}
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">{formatDate(user.joinDate)}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeClass(user.riskLevel)}`}>
                                {user.riskLevel}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-full h-2 mr-2 rounded-full bg-slate-600">
                                  <div 
                                    className="h-2 rounded-full bg-emerald-500" 
                                    style={{ width: `${user.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs whitespace-nowrap">{user.progress}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex space-x-2">
                                <button 
                                  className="p-1 text-slate-400 hover:text-emerald-400"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditUser(user);
                                  }}
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className="p-1 text-slate-400 hover:text-red-400"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUser(user.id);
                                  }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                
                <div className="flex items-center justify-between p-4 border-t border-slate-600">
                  <div className="text-sm text-slate-400">
                    Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{" "}
                    <span className="font-medium text-white">{users.length}</span> users
                  </div>
                  
                  <div className="flex space-x-1">
                    <button 
                      className="px-3 py-1 text-sm transition-colors rounded-md text-slate-400 hover:bg-slate-600 hover:text-white"
                      onClick={() => {
                        setIsDataLoading(true);
                        setTimeout(() => setIsDataLoading(false), 500);
                      }}
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-white transition-colors rounded-md bg-emerald-500 hover:bg-emerald-600">
                      1
                    </button>
                    <button 
                      className="px-3 py-1 text-sm transition-colors rounded-md text-slate-400 hover:bg-slate-600 hover:text-white"
                      onClick={() => {
                        setIsDataLoading(true);
                        setTimeout(() => setIsDataLoading(false), 500);
                      }}
                    >
                      2
                    </button>
                    <button 
                      className="px-3 py-1 text-sm transition-colors rounded-md text-slate-400 hover:bg-slate-600 hover:text-white"
                      onClick={() => {
                        setIsDataLoading(true);
                        setTimeout(() => setIsDataLoading(false), 500);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 bg-slate-700 rounded-xl">
                <div className="flex flex-col items-start justify-between p-4 border-b sm:flex-row border-slate-600">
                  <h2 className="mb-2 text-lg font-semibold text-white sm:mb-0">Appointments</h2>
                  
                  <div className="flex flex-col w-full space-y-2 sm:flex-row sm:w-auto sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search appointments..."
                        className="w-full px-4 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:w-64"
                        onChange={() => {
                          setIsDataLoading(true);
                          setTimeout(() => setIsDataLoading(false), 500);
                        }}
                      />
                      <Search size={18} className="absolute transform -translate-y-1/2 text-slate-400 right-3 top-1/2" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <select
                        className="px-3 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={() => {
                          setIsDataLoading(true);
                          setTimeout(() => setIsDataLoading(false), 300);
                        }}
                      >
                        <option value="all">All Types</option>
                        <option value="video">Video Call</option>
                        <option value="in-person">In-person</option>
                      </select>
                      
                      <select
                        className="px-3 py-2 text-sm rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={() => {
                          setIsDataLoading(true);
                          setTimeout(() => setIsDataLoading(false), 300);
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 overflow-x-auto">
                  {isDataLoading ? (
                    <div className="py-8 text-center text-slate-400">
                      <div className="w-8 h-8 mx-auto border-2 border-t-2 rounded-full border-slate-600 border-t-emerald-500 animate-spin"></div>
                      <p className="mt-2">Loading appointments...</p>
                    </div>
                  ) : (
                    <table className="w-full text-sm text-left text-slate-300">
                      <thead className="text-xs uppercase bg-slate-800 text-slate-400">
                        <tr>
                          <th className="px-6 py-3">Patient</th>
                          <th className="px-6 py-3">Therapist</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Time</th>
                          <th className="px-6 py-3">Type</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(appointment => (
                          <tr 
                            key={appointment.id} 
                            className="transition-colors border-b cursor-pointer border-slate-600 hover:bg-slate-800"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                              {appointment.userName}
                            </td>
                            <td className="px-6 py-4">{appointment.therapist}</td>
                            <td className="px-6 py-4">{formatDate(appointment.date)}</td>
                            <td className="px-6 py-4">{appointment.time}</td>
                            <td className="px-6 py-4">{appointment.type}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAppointmentStatusClass(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex space-x-2">
                                <button 
                                  className="p-1 text-slate-400 hover:text-emerald-400"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit appointment functionality
                                    setSaveNotificationText('Edit functionality in development');
                                    setShowSaveNotification(true);
                                    setTimeout(() => setShowSaveNotification(false), 3000);
                                  }}
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className="p-1 text-slate-400 hover:text-red-400"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (appointment.status !== 'cancelled') {
                                      cancelAppointment(appointment.id);
                                    } else {
                                      setSaveNotificationText('This appointment is already cancelled');
                                      setShowSaveNotification(true);
                                      setTimeout(() => setShowSaveNotification(false), 3000);
                                    }
                                  }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                {/* User Growth */}
                <div className="p-4 bg-slate-700 rounded-xl">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">New User Signups</h3>
                    <div className="flex items-center space-x-2">
                      <select 
                        className="px-2 py-1 text-xs rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={() => {
                          // Simulate loading chart data
                          setIsDataLoading(true);
                          
                          setTimeout(() => {
                            const newData = userSignupData.map(item => ({
                              ...item,
                              count: Math.floor(Math.random() * 15) + 3
                            }));
                            setUserSignupData(newData);
                            setIsDataLoading(false);
                          }, 800);
                        }}
                      >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                      </select>
                      <button 
                        className="p-1 text-slate-400 hover:text-white"
                        onClick={() => {
                          setSaveNotificationText('Report downloaded successfully');
                          setShowSaveNotification(true);
                          setTimeout(() => setShowSaveNotification(false), 3000);
                        }}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-64">
                    {isDataLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 border-2 border-t-2 rounded-full border-slate-600 border-t-emerald-500 animate-spin"></div>
                        <p className="ml-2 text-slate-400">Loading chart data...</p>
                      </div>
                    ) : (
                      <div className="flex items-end h-full pb-5 space-x-2">
                        {userSignupData.map((data, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full transition-all duration-500 ease-in-out rounded-t-lg bg-emerald-500" 
                              style={{ height: `${(data.count / 15) * 100}%` }}
                            ></div>
                            <div className="mt-2 text-xs text-slate-400">{data.day}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* User Engagement */}
                <div className="p-4 bg-slate-700 rounded-xl">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">User Engagement</h3>
                    <div className="flex items-center space-x-2">
                      <select 
                        className="px-2 py-1 text-xs rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={() => {
                          // Simulate loading chart data
                          setIsDataLoading(true);
                          
                          setTimeout(() => {
                            const newData = userEngagementData.map(item => ({
                              ...item,
                              active: Math.floor(Math.random() * 100) + 250,
                              total: Math.floor(Math.random() * 50) + 350
                            }));
                            setUserEngagementData(newData);
                            setIsDataLoading(false);
                          }, 800);
                        }}
                      >
                        <option value="week">Last 3 Months</option>
                        <option value="month">Last 6 Months</option>
                        <option value="year">Last Year</option>
                      </select>
                      <button 
                        className="p-1 text-slate-400 hover:text-white"
                        onClick={() => {
                          setSaveNotificationText('Report downloaded successfully');
                          setShowSaveNotification(true);
                          setTimeout(() => setShowSaveNotification(false), 3000);
                        }}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-64">
                    {isDataLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 border-2 border-t-2 rounded-full border-slate-600 border-t-emerald-500 animate-spin"></div>
                        <p className="ml-2 text-slate-400">Loading chart data...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex items-center mb-4 space-x-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 mr-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-slate-300">Active Users</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 mr-2 rounded-full bg-slate-400"></div>
                            <span className="text-xs text-slate-300">Total Users</span>
                          </div>
                        </div>
                        
                        <div className="flex items-end space-x-6">
                          {userEngagementData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div className="relative w-full">
                                <div 
                                  className="w-full rounded-lg bg-slate-400" 
                                  style={{ height: '16px' }}
                                ></div>
                                <div 
                                  className="absolute bottom-0 left-0 transition-all duration-500 ease-in-out rounded-lg bg-emerald-500" 
                                  style={{ 
                                    height: '16px',
                                    width: `${(data.active / data.total) * 100}%`
                                  }}
                                ></div>
                              </div>
                              <div className="mt-2 text-xs text-center text-slate-400">
                                <div>{data.month}</div>
                                <div className="mt-1 font-medium text-white">{Math.round((data.active / data.total) * 100)}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-xl">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-lg font-semibold text-white">Therapy Session Analytics</h3>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Completion Rate</p>
                        <CheckCircle size={18} className="text-emerald-400" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">92%</p>
                      <div className="flex items-center mt-2 text-xs text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +2.4% from last month
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Average Session Length</p>
                        <Clock size={18} className="text-blue-400" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">45 min</p>
                      <div className="flex items-center mt-2 text-xs text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +3 min from last month
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Patient Satisfaction</p>
                        <ThumbsUp size={18} className="text-purple-400" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">4.8/5</p>
                      <div className="flex items-center mt-2 text-xs text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +0.2 from last month
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">Therapist Utilization</p>
                        <BarChart2 size={18} className="text-yellow-400" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">87%</p>
                      <div className="flex items-center mt-2 text-xs text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        +5.1% from last month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 bg-slate-700 rounded-xl">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-lg font-semibold text-white">Security Settings</h3>
                </div>
                
                <div className="p-4">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-white">Authentication</h4>
                      
                      <div className="p-4 mb-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">Two-Factor Authentication</p>
                            <p className="mt-1 text-sm text-slate-400">Add an extra layer of security to admin accounts</p>
                          </div>
                          <div 
                            className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                            onClick={() => {
                              // Toggle switch animation
                              const switchEl = document.getElementById('twoFactorSwitch');
                              if (switchEl) {
                                if (switchEl.classList.contains('translate-x-6')) {
                                  switchEl.classList.remove('translate-x-6');
                                  switchEl.classList.add('translate-x-0');
                                } else {
                                  switchEl.classList.remove('translate-x-0');
                                  switchEl.classList.add('translate-x-6');
                                }
                              }
                              
                              // Show notification
                              setSaveNotificationText('Two-factor authentication setting updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <label id="twoFactorSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                            <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 mb-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">Login Notifications</p>
                            <p className="mt-1 text-sm text-slate-400">Receive alerts for unusual login attempts</p>
                          </div>
                          <div 
                            className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                            onClick={() => {
                              // Toggle switch animation
                              const switchEl = document.getElementById('loginNotifSwitch');
                              if (switchEl) {
                                if (switchEl.classList.contains('translate-x-6')) {
                                  switchEl.classList.remove('translate-x-6');
                                  switchEl.classList.add('translate-x-0');
                                } else {
                                  switchEl.classList.remove('translate-x-0');
                                  switchEl.classList.add('translate-x-6');
                                }
                              }
                              
                              // Show notification
                              setSaveNotificationText('Login notification setting updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <label id="loginNotifSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                            <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">Session Timeout</p>
                            <p className="mt-1 text-sm text-slate-400">Automatically log out after inactivity</p>
                          </div>
                          <select 
                            className="px-3 py-2 text-sm rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            onChange={() => {
                              // Show notification
                              setSaveNotificationText('Session timeout setting updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-white">Data Protection</h4>
                      
                      <div className="p-4 mb-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">User Data Encryption</p>
                            <p className="mt-1 text-sm text-slate-400">End-to-end encryption for all user data</p>
                          </div>
                          <div 
                            className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                            onClick={() => {
                              // Toggle switch animation
                              const switchEl = document.getElementById('encryptionSwitch');
                              if (switchEl) {
                                if (switchEl.classList.contains('translate-x-6')) {
                                  switchEl.classList.remove('translate-x-6');
                                  switchEl.classList.add('translate-x-0');
                                } else {
                                  switchEl.classList.remove('translate-x-0');
                                  switchEl.classList.add('translate-x-6');
                                }
                              }
                              
                              // Show notification
                              setSaveNotificationText('Encryption setting updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <label id="encryptionSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                            <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 mb-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">GDPR Compliance</p>
                            <p className="mt-1 text-sm text-slate-400">Enable advanced privacy controls</p>
                          </div>
                          <div 
                            className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                            onClick={() => {
                              // Toggle switch animation
                              const switchEl = document.getElementById('gdprSwitch');
                              if (switchEl) {
                                if (switchEl.classList.contains('translate-x-6')) {
                                  switchEl.classList.remove('translate-x-6');
                                  switchEl.classList.add('translate-x-0');
                                } else {
                                  switchEl.classList.remove('translate-x-0');
                                  switchEl.classList.add('translate-x-6');
                                }
                              }
                              
                              // Show notification
                              setSaveNotificationText('GDPR compliance setting updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <label id="gdprSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                            <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">Data Backup Frequency</p>
                            <p className="mt-1 text-sm text-slate-400">How often to backup system data</p>
                          </div>
                          <select 
                            className="px-3 py-2 text-sm rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            onChange={() => {
                              // Show notification
                              setSaveNotificationText('Backup frequency updated');
                              setShowSaveNotification(true);
                              setTimeout(() => setShowSaveNotification(false), 3000);
                            }}
                          >
                            <option>Daily</option>
                            <option>Every 12 hours</option>
                            <option>Every 6 hours</option>
                            <option>Hourly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-xl">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-lg font-semibold text-white">Security Logs</h3>
                </div>
                
                <div className="p-4">
                  <div className="mb-4 overflow-hidden rounded-lg bg-slate-800">
                    <div className="px-4 py-3 font-medium text-white bg-slate-900">Recent Activity</div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white rounded-full bg-emerald-500">
                          A
                        </div>
                        <div>
                          <p className="text-sm text-white">Admin logged in</p>
                          <p className="text-xs text-slate-400">Today, 10:32 AM | IP: 192.168.1.105</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white bg-blue-500 rounded-full">
                          <UserPlus size={14} />
                        </div>
                        <div>
                          <p className="text-sm text-white">New user created</p>
                          <p className="text-xs text-slate-400">Today, 9:45 AM | User ID: 3892</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white rounded-full bg-amber-500">
                          <AlertTriangle size={14} />
                        </div>
                        <div>
                          <p className="text-sm text-white">Failed login attempt</p>
                          <p className="text-xs text-slate-400">Yesterday, 6:18 PM | IP: 83.45.132.61</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white bg-purple-500 rounded-full">
                          <RefreshCw size={14} />
                        </div>
                        <div>
                          <p className="text-sm text-white">System update completed</p>
                          <p className="text-xs text-slate-400">Yesterday, 3:30 PM | Version 2.4.1</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-8 h-8 mr-3 text-xs text-white rounded-full bg-emerald-500">
                          A
                        </div>
                        <div>
                          <p className="text-sm text-white">Admin updated security settings</p>
                          <p className="text-xs text-slate-400">Apr 5, 2025, 11:15 AM | IP: 192.168.1.105</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      className="px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white"
                      onClick={() => {
                        setSaveNotificationText('Loading all security logs...');
                        setShowSaveNotification(true);
                        setTimeout(() => setShowSaveNotification(false), 3000);
                      }}
                    >
                      View All Security Logs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 bg-slate-700 rounded-xl">
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-lg font-semibold text-white">System Settings</h3>
                </div>
                
                <div className="p-4">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-white">General</h4>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-800">
                          <label className="block mb-2 text-sm font-medium text-white">System Name</label>
                          <input 
                            type="text" 
                            defaultValue="MindHarmony Admin Portal" 
                            className="w-full px-4 py-2 border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800">
                          <label className="block mb-2 text-sm font-medium text-white">Contact Email</label>
                          <input 
                            type="email" 
                            defaultValue="admin@mindharmony.com" 
                            className="w-full px-4 py-2 border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800">
                          <label className="block mb-2 text-sm font-medium text-white">Timezone</label>
                          <select 
                            className="w-full px-4 py-2 border rounded-lg bg-slate-900 border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            onChange={() => {
                              // Show loading to simulate processing
                              setIsDataLoading(true);
                              setTimeout(() => {
                                setIsDataLoading(false);
                                // Show success notification
                                setSaveNotificationText('Timezone updated successfully');
                                setShowSaveNotification(true);
                                setTimeout(() => setShowSaveNotification(false), 3000);
                              }, 800);
                            }}
                          >
                            <option>UTC -8:00 (Pacific Time)</option>
                            <option>UTC -7:00 (Mountain Time)</option>
                            <option>UTC -6:00 (Central Time)</option>
                            <option>UTC -5:00 (Eastern Time)</option>
                            <option>UTC +0:00 (GMT)</option>
                          </select>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800">
                          <label className="block mb-2 text-sm font-medium text-white">Theme Mode</label>
                          <div className="flex items-center">
                            <button
                              className={`px-4 py-2 mr-2 text-sm font-medium rounded-lg ${
                                theme === 'light' 
                                  ? 'bg-white text-slate-800' 
                                  : 'bg-slate-700 text-white'
                              }`}
                              onClick={() => handleChangeTheme()}
                            >
                              Light
                            </button>
                            <button
                              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                                theme === 'dark' 
                                  ? 'bg-slate-900 text-white border border-slate-600' 
                                  : 'bg-slate-700 text-white'
                              }`}
                              onClick={() => handleChangeTheme()}
                            >
                              Dark
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-white">Notifications</h4>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-white">Email Notifications</p>
                              <p className="mt-1 text-sm text-slate-400">Receive system alerts via email</p>
                            </div>
                            <div 
                              className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                              onClick={() => {
                                // Toggle switch animation
                                const switchEl = document.getElementById('emailSwitch');
                                if (switchEl) {
                                  if (switchEl.classList.contains('translate-x-6')) {
                                    switchEl.classList.remove('translate-x-6');
                                    switchEl.classList.add('translate-x-0');
                                  } else {
                                    switchEl.classList.remove('translate-x-0');
                                    switchEl.classList.add('translate-x-6');
                                  }
                                }
                              }}
                            >
                              <label id="emailSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                              <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-white">High Risk User Alerts</p>
                              <p className="mt-1 text-sm text-slate-400">Get notified when high-risk users are detected</p>
                            </div>
                            <div 
                              className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                              onClick={() => {
                                // Toggle switch animation
                                const switchEl = document.getElementById('riskSwitch');
                                if (switchEl) {
                                  if (switchEl.classList.contains('translate-x-6')) {
                                    switchEl.classList.remove('translate-x-6');
                                    switchEl.classList.add('translate-x-0');
                                  } else {
                                    switchEl.classList.remove('translate-x-0');
                                    switchEl.classList.add('translate-x-6');
                                  }
                                }
                              }}
                            >
                              <label id="riskSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                              <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-white">System Updates</p>
                              <p className="mt-1 text-sm text-slate-400">Notify when system updates are available</p>
                            </div>
                            <div 
                              className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-emerald-500"
                              onClick={() => {
                                // Toggle switch animation
                                const switchEl = document.getElementById('updateSwitch');
                                if (switchEl) {
                                  if (switchEl.classList.contains('translate-x-6')) {
                                    switchEl.classList.remove('translate-x-6');
                                    switchEl.classList.add('translate-x-0');
                                  } else {
                                    switchEl.classList.remove('translate-x-0');
                                    switchEl.classList.add('translate-x-6');
                                  }
                                }
                              }}
                            >
                              <label id="updateSwitch" className="absolute left-0 w-6 h-6 transition duration-100 ease-in-out transform translate-x-6 bg-white rounded-full cursor-pointer"></label>
                              <input type="checkbox" className="w-full h-full sr-only" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="mt-6 mb-4 text-lg font-medium text-white">Advanced</h4>
                      
                      <div className="p-4 rounded-lg bg-slate-800">
                        <button 
                          className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                          onClick={() => {
                            setActionConfirmation({
                              type: 'resetSystem',
                              message: 'Are you sure you want to reset all system data? This action cannot be undone.'
                            });
                            setShowActionConfirmation(true);
                          }}
                        >
                          Reset System Data
                        </button>
                        <p className="mt-2 text-xs text-center text-slate-400">
                          This action cannot be undone. All system data will be reset.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-600 hover:bg-slate-500">
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-emerald-500 hover:bg-emerald-600"
                      onClick={saveSettings}
                    >
                      {isDataLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 mr-2 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          Saving...
                        </div>
                      ) : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
      
      {/* User Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl p-6 mx-4 overflow-hidden bg-slate-700 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Risk Level</p>
                  <p className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskBadgeClass(selectedUser.riskLevel)}`}>
                      {selectedUser.riskLevel}
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Join Date</p>
                  <p className="text-white">{formatDate(selectedUser.joinDate)}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Last Login</p>
                  <p className="text-white">{getTimeAgo(selectedUser.lastLogin)}</p>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Therapy Sessions</p>
                  <p className="text-white">{selectedUser.therapySessions} sessions</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Progress</p>
                  <div className="flex items-center mt-1">
                    <div className="w-full h-2 mr-2 rounded-full bg-slate-600">
                      <div 
                        className="h-2 rounded-full bg-emerald-500" 
                        style={{ width: `${selectedUser.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white">{selectedUser.progress}%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400">Notes</p>
                  <div className="p-3 mt-1 rounded-lg bg-slate-800">
                    <p className="text-sm text-white">{selectedUser.notes}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-600">
              <button
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete User
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-600 hover:bg-slate-500"
                >
                  Close
                </button>
                <button
                  onClick={() => handleEditUser(selectedUser)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-emerald-500 hover:bg-emerald-600"
                >
                  <Edit size={16} className="mr-2" />
                  Edit User
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showUserEditModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl p-6 mx-4 overflow-y-auto bg-slate-700 rounded-xl max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Edit User</h3>
              <button
                onClick={() => setShowUserEditModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Name</label>
                  <input 
                    type="text" 
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Email</label>
                  <input 
                    type="email" 
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Status</label>
                  <select 
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Risk Level</label>
                  <select 
                    value={editingUser.riskLevel}
                    onChange={(e) => setEditingUser({...editingUser, riskLevel: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Progress (%)</label>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={editingUser.progress}
                    onChange={(e) => setEditingUser({...editingUser, progress: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="w-full h-2 mt-2 rounded-full bg-slate-600">
                    <div 
                      className="h-2 rounded-full bg-emerald-500" 
                      style={{ width: `${editingUser.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-white">Notes</label>
                  <textarea 
                    value={editingUser.notes}
                    onChange={(e) => setEditingUser({...editingUser, notes: e.target.value})}
                    className="w-full h-32 px-4 py-2 border rounded-lg bg-slate-800 border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6 mt-6 space-x-3 border-t border-slate-600">
              <button
                onClick={() => setShowUserEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-600 hover:bg-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => saveUserChanges(editingUser)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                {isDataLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Saving...
                  </div>
                ) : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Appointment Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-6 mx-4 overflow-hidden bg-slate-700 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Appointment Details</h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Patient</p>
                <p className="text-white">{selectedAppointment.userName}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-400">Therapist</p>
                <p className="text-white">{selectedAppointment.therapist}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Date</p>
                  <p className="text-white">{formatDate(selectedAppointment.date)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400">Time</p>
                  <p className="text-white">{selectedAppointment.time}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Type</p>
                  <p className="text-white">{selectedAppointment.type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="flex items-center mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAppointmentStatusClass(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-600">
              {selectedAppointment.status !== 'cancelled' ? (
                <button
                  onClick={() => cancelAppointment(selectedAppointment.id)}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Cancel Appointment
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg cursor-not-allowed bg-slate-500"
                  disabled
                >
                  Already Cancelled
                </button>
              )}
              
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-600 hover:bg-slate-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showActionConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 mx-4 overflow-hidden text-center bg-slate-700 rounded-xl"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-slate-800">
              <AlertTriangle size={24} className="text-yellow-400" />
            </div>
            
            <h3 className="mb-2 text-xl font-bold text-white">Confirm Action</h3>
            <p className="mb-6 text-slate-300">{actionConfirmation.message}</p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowActionConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-slate-600 hover:bg-slate-500"
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  switch(actionConfirmation.type) {
                    case 'deleteUser':
                      confirmDeleteUser(actionConfirmation.userId);
                      break;
                    case 'cancelAppointment':
                      confirmCancelAppointment(actionConfirmation.appointmentId);
                      break;
                    case 'logout':
                      confirmLogout();
                      break;
                    case 'resetSystem':
                      // Handle system reset
                      setShowActionConfirmation(false);
                      setIsDataLoading(true);
                      setTimeout(() => {
                        setIsDataLoading(false);
                        setSaveNotificationText('System reset successful');
                        setShowSaveNotification(true);
                        setTimeout(() => setShowSaveNotification(false), 3000);
                      }, 2000);
                      break;
                    default:
                      setShowActionConfirmation(false);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed z-50 transform -translate-x-1/2 bottom-6 left-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="flex items-center px-4 py-3 text-white rounded-lg shadow-lg bg-emerald-500"
          >
            <CheckCircle className="mr-2" size={20} />
            <span>{saveNotificationText}</span>
          </motion.div>
        </div>
      )}
      
      {/* Loading Overlay */}
      {isDataLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20">
          {/* This is transparent and just prevents clicks while loading */}
        </div>
      )}
    </div>
  );
}