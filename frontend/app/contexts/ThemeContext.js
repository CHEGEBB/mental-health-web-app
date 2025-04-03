"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('emerald');
  
  // Color scheme mapping
  const colorSchemes = {
    emerald: {
      primary: 'emerald-500',
      primaryHover: 'emerald-600',
      primaryActive: 'emerald-700',
      light: 'emerald-400',
      dark: 'emerald-600',
    },
    ocean: {
      primary: 'blue-500',
      primaryHover: 'blue-600',
      primaryActive: 'blue-700',
      light: 'blue-400',
      dark: 'blue-600',
    },
    lavender: {
      primary: 'purple-500',
      primaryHover: 'purple-600',
      primaryActive: 'purple-700',
      light: 'purple-400',
      dark: 'purple-600',
    },
    sunset: {
      primary: 'amber-500',
      primaryHover: 'amber-600',
      primaryActive: 'amber-700',
      light: 'amber-400',
      dark: 'amber-600',
    },
    slate: {
      primary: 'slate-500',
      primaryHover: 'slate-600',
      primaryActive: 'slate-700',
      light: 'slate-400',
      dark: 'slate-600',
    }
  };

  // Apply theme when component mounts or theme changes
  useEffect(() => {
    const body = document.body;
    
    // Apply dark/light mode
    if (darkMode) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
    
    // Apply accent color
    Object.keys(colorSchemes).forEach(color => {
      body.classList.remove(`theme-${color}`);
    });
    
    body.classList.add(`theme-${accentColor}`);

    // Store preferences in localStorage
    localStorage.setItem('mindharmony-theme', JSON.stringify({ darkMode, accentColor }));
  }, [darkMode, accentColor]);
  
  // Load saved theme preferences on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('mindharmony-theme');
    
    if (savedTheme) {
      try {
        const { darkMode: savedDarkMode, accentColor: savedAccentColor } = JSON.parse(savedTheme);
        setDarkMode(savedDarkMode);
        setAccentColor(savedAccentColor);
      } catch (error) {
        console.error('Error loading saved theme preferences:', error);
      }
    }
  }, []);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      accentColor, 
      colorSchemes,
      toggleDarkMode, 
      setDarkMode, 
      setAccentColor 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);