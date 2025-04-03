// First, create an API service file
// services/api.js
"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mental-health-web-app.onrender.com';

// Helper for making authenticated requests
export const fetchWithAuth = async (endpoint, options = {}) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Set headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth service functions
export const authService = {
  // Register a new user
  register: async (userData) => {
    return fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login a user
  login: async (credentials) => {
    return fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Get the current user's profile
  getProfile: async () => {
    return fetchWithAuth('/api/auth/profile');
  },

  // Update the current user's profile
  updateProfile: async (userData) => {
    return fetchWithAuth('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },

  // Logout - client side only
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

