'use client'
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api';

// Create an AuthContext
const AuthContext = createContext();

// Provider component that wraps your app and makes auth available to any child component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const loadUser = async () => {
        try {
          const token = localStorage.getItem('token');
          
          if (token) {
            // Load user profile from API
            const userData = await authService.getProfile();
            setUser(userData);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          // If there's an error with the token, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } finally {
          setLoading(false);
        }
      };
      
      loadUser();
    }
  }, []);

  // Login function that uses the authService
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      // Store the JWT token
      localStorage.setItem('token', response.token);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Set the user in state
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function that uses the authService
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      // Store the JWT token
      localStorage.setItem('token', response.token);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Set the user in state
      setUser(response.user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = await authService.updateProfile(userData);
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update user in state
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function that uses the authService
  const logout = () => {
    authService.logout();
    setUser(null);
    
    // Redirect to home page
    if (typeof window !== 'undefined') {
      window.location.href = '/'; 
    }
  };

  // Value to be provided by the context
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook that allows easy access to the AuthContext values
export function useAuth() {
  return useContext(AuthContext);
}