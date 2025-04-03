// services/journalService.js
import axios from 'axios';

// Create an axios instance with the base URL
const API = axios.create({
  baseURL: 'https://mental-health-web-app.onrender.com/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Journal API methods
const journalService = {
  // Create a new journal entry
  createEntry: async (entryData) => {
    try {
      const response = await API.post('/journal/entry', entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Get all journal entries
  getEntries: async () => {
    try {
      const response = await API.get('/journal/entries');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Get a single journal entry by ID
  getEntry: async (entryId) => {
    try {
      const response = await API.get(`/journal/entry/${entryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Update a journal entry
  updateEntry: async (entryId, entryData) => {
    try {
      const response = await API.put(`/journal/entry/${entryId}`, entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Delete a journal entry
  deleteEntry: async (entryId) => {
    try {
      const response = await API.delete(`/journal/entry/${entryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  }
};

export default journalService;