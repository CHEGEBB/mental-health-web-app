'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth'; 
import { 
  Home, 
  User, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Menu, 
  X, 
  Brain,
  Settings,
  HelpCircle,
  LogOut,
  Edit,
  Phone,
  AlertTriangle,
  BarChart2
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeRoute }) => {
  const router = useRouter();
  const { user, logout } = useAuth(); // Use the hook
  
  // Navigation items with Mood Tracker added after Resources
  const navItems = [
    { name: 'Dashboard', icon: Home, route: 'dashboard' },
    { name: 'Journal', icon: Edit, route: 'journal' },
    { name: 'Profile', icon: User, route: 'profile' },
    { name: 'Resources', icon: BookOpen, route: 'resources' },
    { name: 'Mood Tracker', icon: BarChart2, route: 'mood' },
    { name: 'Community', icon: Users, route: 'community' },
    { name: 'Therapists', icon: Calendar, route: 'therapists' },
    { name: 'Crisis Resources', icon: AlertTriangle, route: 'crisis' },
  ];
  
  // Bottom items with routes
  const bottomNavItems = [
    { name: 'Settings', icon: Settings, route: 'settings' },
  ];

  // Handle logout using the hook's logout function
  const handleLogout = () => {
    logout();
  };

  // Get user initials for the avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'MH';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">MindHarmony</span>
            </div>
            <button 
              className="p-1 text-white rounded-md hover:bg-slate-700 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Nav Items */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.route}
                href={`/${item.route}`}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeRoute === item.route 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  activeRoute === item.route ? 'text-emerald-400' : ''
                }`} />
                {item.name}
                {activeRoute === item.route && (
                  <div className="ml-auto w-1.5 h-6 rounded-full bg-emerald-400"></div>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Bottom Actions */}
          <div className="p-2 space-y-1 border-t border-slate-700">
            {bottomNavItems.map((item) => (
              <Link
                key={item.route}
                href={`/${item.route}`}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeRoute === item.route 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  activeRoute === item.route ? 'text-emerald-400' : ''
                }`} />
                {item.name}
                {activeRoute === item.route && (
                  <div className="ml-auto w-1.5 h-6 rounded-full bg-emerald-400"></div>
                )}
              </Link>
            ))}
          
            <button 
              className="flex items-center w-full px-4 py-3 text-sm rounded-lg text-slate-300 hover:bg-slate-700"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
                <span className="font-semibold text-emerald-700">{getUserInitials()}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {user ? user.name : 'Guest User'}
                </div>
                <div className="text-xs text-slate-400">
                  {user ? user.email : 'Please sign in'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;