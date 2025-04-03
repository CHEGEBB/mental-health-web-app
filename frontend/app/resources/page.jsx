"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Video, Headphones, Download, Filter, Search, 
  ArrowRight, Heart, BookOpen, Clock, CheckCircle, 
  ThumbsUp, Award, Bookmark, Share, PlayCircle, 
  Menu, X, ChevronDown, ChevronRight, Calendar, User,
  Coffee, CloudRain, Sun, Moon, Wind,
  ThumbsDown
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

const ResourcesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [mood, setMood] = useState('neutral');
  const [showMoodRecommendations, setShowMoodRecommendations] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
// Mock data - Resources
const resourcesData = [
  // Articles
  {
    id: 'a1',
    type: 'article',
    category: 'mental-health',
    subcategory: 'anxiety',
    title: 'Understanding Anxiety: Causes, Symptoms, and Coping Strategies',
    author: 'Dr. Emily Chen',
    date: '2025-03-15',
    readTime: '7 min read',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23a5b4fc"%3E%3C/rect%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23312e81" text-anchor="middle" alignment-baseline="middle"%3EAnxiety%3C/text%3E%3C/svg%3E',
    excerpt: 'Anxiety is more than just feeling stressed or worried. Learn about the different types of anxiety disorders, their symptoms, and effective strategies to manage them.',
    tags: ['anxiety', 'mental health', 'coping strategies'],
    recommended: ['stress', 'anxiety', 'overwhelmed'],
    content: 'Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder. Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry. These disorders alter how a person processes emotions and behaves, also causing physical symptoms. Mild anxiety might be vague and unsettling, while severe anxiety may seriously affect day-to-day living...',
  },
  {
    id: 'a2',
    type: 'article',
    category: 'mental-health',
    subcategory: 'depression',
    title: 'Depression: Beyond Feeling Sad',
    author: 'Dr. James Wilson',
    date: '2025-03-10',
    readTime: '9 min read',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2393c5fd"%3E%3C/rect%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%231e3a8a" text-anchor="middle" alignment-baseline="middle"%3EDepression%3C/text%3E%3C/svg%3E',
    excerpt: 'Depression affects millions of people worldwide. This article explains the science behind depression, common symptoms, and evidence-based treatment approaches.',
    tags: ['depression', 'mental health', 'treatment'],
    recommended: ['sad', 'down', 'hopeless'],
    content: 'Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is also treatable. Depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed. It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home...',
  },
  {
    id: 'a3',
    type: 'article',
    category: 'self-care',
    subcategory: 'mindfulness',
    title: 'The Science of Mindfulness: How Being Present Changes Your Brain',
    author: 'Dr. Sarah Johnson',
    date: '2025-03-25',
    readTime: '6 min read',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2386efac"%3E%3C/rect%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23166534" text-anchor="middle" alignment-baseline="middle"%3EMindfulness%3C/text%3E%3C/svg%3E',
    excerpt: 'Discover how mindfulness practices physically change your brain structure and improve mental health, backed by the latest neuroscience research.',
    tags: ['mindfulness', 'neuroscience', 'brain health'],
    recommended: ['stressed', 'anxious', 'overwhelmed', 'distracted'],
    content: 'Mindfulness has been practiced for thousands of years in various religious and secular traditions. In recent decades, it has been studied extensively by neuroscientists, who have discovered that mindfulness meditation can actually change the physical structure of your brain in beneficial ways. Regular mindfulness practice has been shown to increase the density of gray matter in brain regions linked to learning, memory, emotion regulation, and empathy...',
  },
  {
    id: 'a4',
    type: 'article',
    category: 'relationships',
    subcategory: 'communication',
    title: 'Healthy Communication: The Foundation of Strong Relationships',
    author: 'Dr. Lisa Rodriguez',
    date: '2025-03-05',
    readTime: '8 min read',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23fca5a5"%3E%3C/rect%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23991b1b" text-anchor="middle" alignment-baseline="middle"%3ECommunication%3C/text%3E%3C/svg%3E',
    excerpt: 'Learn effective communication techniques to build healthier relationships, resolve conflicts, and deepen your connections with others.',
    tags: ['relationships', 'communication', 'social health'],
    recommended: ['anxious', 'lonely', 'frustrated'],
    content: 'Communication forms the foundation of all human relationships. Effective communication involves not just exchanging information, but also understanding the emotion behind the information. It includes listening, expressing yourself clearly, and being aware of your own and others\' non-verbal signals. Good communication requires practice and conscious effort, but the rewards in terms of relationship satisfaction are immense...',
  },
  {
    id: 'a5',
    type: 'article',
    category: 'self-care',
    subcategory: 'sleep',
    title: 'Sleep and Mental Health: The Vital Connection',
    author: 'Dr. Mark Thompson',
    date: '2025-03-20',
    readTime: '5 min read',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23c4b5fd"%3E%3C/rect%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%235b21b6" text-anchor="middle" alignment-baseline="middle"%3ESleep%3C/text%3E%3C/svg%3E',
    excerpt: 'Discover why quality sleep is essential for mental health and learn practical strategies for improving your sleep habits.',
    tags: ['sleep', 'mental health', 'self-care'],
    recommended: ['tired', 'anxious', 'stressed', 'irritable'],
    content: 'Sleep is a biological necessity that profoundly affects our mental health and emotional wellbeing. During sleep, your brain processes emotional information and consolidates memories. Lack of quality sleep can impair thinking, regulate emotions, and cope with stress. Research has established strong connections between sleep quality and mental health conditions like depression, anxiety, and bipolar disorder...',
  },
  
  // Videos
  {
    id: 'v1',
    type: 'video',
    category: 'mental-health',
    subcategory: 'stress',
    title: '5-Minute Stress Relief Breathing Exercise',
    creator: 'MindfulMovement',
    duration: '5:14',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23fcd34d"%3E%3C/rect%3E%3Ccircle cx="50" cy="50" r="30" fill="%23fbbf24"%3E%3C/circle%3E%3Ctext x="50" y="55" font-family="Arial" font-size="10" fill="%23854d0e" text-anchor="middle"%3EStress Relief%3C/text%3E%3C/svg%3E',
    description: 'A simple yet powerful breathing exercise you can do anywhere to quickly reduce stress and create a sense of calm.',
    tags: ['stress relief', 'breathing', 'quick exercise'],
    recommended: ['stressed', 'anxious', 'overwhelmed', 'tense'],
    videoUrl: '/assets/vid1.mp4',
  },
  {
    id: 'v2',
    type: 'video',
    category: 'meditation',
    subcategory: 'guided',
    title: '15-Minute Guided Meditation for Beginners',
    creator: 'Mindful Mind',
    duration: '15:28',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23a7f3d0"%3E%3C/rect%3E%3Ccircle cx="50" cy="50" r="30" fill="%236ee7b7"%3E%3C/circle%3E%3Ctext x="50" y="55" font-family="Arial" font-size="9" fill="%23065f46" text-anchor="middle"%3EMeditation%3C/text%3E%3C/svg%3E',
    description: 'A perfect introduction to meditation for those new to the practice. Learn the basics of mindfulness in this gentle guided session.',
    tags: ['meditation', 'mindfulness', 'beginners'],
    recommended: ['anxious', 'stressed', 'overwhelmed', 'restless'],
    videoUrl: '/assets/vid1.mp4',
  },
  {
    id: 'v3',
    type: 'video',
    category: 'exercise',
    subcategory: 'yoga',
    title: '20-Minute Gentle Yoga for Anxiety Relief',
    creator: 'Yoga with Sarah',
    duration: '21:07',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23bfdbfe"%3E%3C/rect%3E%3Cpath d="M50,30 L60,50 L50,70 L40,50 Z" fill="%2393c5fd"%3E%3C/path%3E%3Ctext x="50" y="75" font-family="Arial" font-size="10" fill="%231e40af" text-anchor="middle"%3EYoga%3C/text%3E%3C/svg%3E',
    description: 'A gentle, accessible yoga practice designed specifically to help calm the nervous system and reduce feelings of anxiety.',
    tags: ['yoga', 'anxiety relief', 'gentle exercise'],
    recommended: ['anxious', 'tense', 'stressed', 'restless'],
    videoUrl: '/assets/vid1.mp4',
  },
  {
    id: 'v4',
    type: 'video',
    category: 'mental-health',
    subcategory: 'education',
    title: 'Understanding the Science of Happiness',
    creator: 'MindScience Academy',
    duration: '18:42',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23fecaca"%3E%3C/rect%3E%3Ccircle cx="50" cy="50" r="25" fill="%23fca5a5"%3E%3C/circle%3E%3Ctext x="50" y="55" font-family="Arial" font-size="8" fill="%239f1239" text-anchor="middle"%3EHappiness%3C/text%3E%3C/svg%3E',
    description: 'A fascinating look at the neuroscience behind happiness and practical ways to increase your happiness based on scientific research.',
    tags: ['happiness', 'neuroscience', 'positive psychology'],
    recommended: ['sad', 'neutral', 'unmotivated', 'curious'],
    videoUrl: '/assets/vid1.mp4',
  },
  
  // Audio
  {
    id: 'au1',
    type: 'audio',
    category: 'meditation',
    subcategory: 'sleep',
    title: 'Deep Sleep Meditation',
    creator: 'Peaceful Minds',
    duration: '45:32',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23d8b4fe"%3E%3C/rect%3E%3Cpath d="M30,50 Q50,30 70,50 Q50,70 30,50" fill="%23c084fc"%3E%3C/path%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%236b21a8" text-anchor="middle"%3ESleep%3C/text%3E%3C/svg%3E',
    description: 'Fall asleep faster and enjoy deeper, more restorative sleep with this guided meditation designed to calm your nervous system.',
    tags: ['sleep', 'meditation', 'relaxation'],
    recommended: ['anxious', 'stressed', 'tired', 'restless'],
    audioUrl: 'https://example.com/audio/deep-sleep',
  },
  {
    id: 'au2',
    type: 'audio',
    category: 'mental-health',
    subcategory: 'anxiety',
    title: 'Anxiety Relief Breathing Session',
    creator: 'Calm Collective',
    duration: '10:15',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2393c5fd"%3E%3C/rect%3E%3Cpath d="M35,50 Q50,35 65,50 Q50,65 35,50" fill="%2360a5fa"%3E%3C/path%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%231e40af" text-anchor="middle"%3EAnxiety Relief%3C/text%3E%3C/svg%3E',
    description: 'A guided breathing exercise specifically designed to activate your body\'s relaxation response and reduce anxiety quickly.',
    tags: ['anxiety', 'breathing', 'relaxation'],
    recommended: ['anxious', 'panicky', 'stressed', 'overwhelmed'],
    audioUrl: 'https://example.com/audio/anxiety-breathing',
  },
  {
    id: 'au3',
    type: 'audio',
    category: 'meditation',
    subcategory: 'focus',
    title: 'Focus & Concentration Meditation',
    creator: 'Mind Training',
    duration: '15:27',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2386efac"%3E%3C/rect%3E%3Ccircle cx="50" cy="50" r="20" fill="%234ade80"%3E%3C/circle%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%23166534" text-anchor="middle"%3EFocus%3C/text%3E%3C/svg%3E',
    description: 'Improve your focus and concentration with this meditation designed to train your attention and reduce mental distractions.',
    tags: ['focus', 'concentration', 'productivity'],
    recommended: ['distracted', 'overwhelmed', 'scattered', 'unfocused'],
    audioUrl: 'https://example.com/audio/focus-meditation',
  },
  
  // Interactive Tools
  {
    id: 't1',
    type: 'tool',
    category: 'self-assessment',
    subcategory: 'stress',
    title: 'Stress Level Assessment',
    creator: 'Mental Health Tools',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23fecaca"%3E%3C/rect%3E%3Cpath d="M40,30 L60,30 L60,70 L40,70 Z" fill="%23fca5a5"%3E%3C/path%3E%3Cpath d="M45,40 L55,40 M45,50 L55,50 M45,60 L55,60" stroke="%23991b1b" stroke-width="2"%3E%3C/path%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%23991b1b" text-anchor="middle"%3EAssessment%3C/text%3E%3C/svg%3E',
    description: 'Evaluate your current stress levels and receive personalized recommendations based on your results.',
    tags: ['assessment', 'stress', 'self-help'],
    recommended: ['stressed', 'anxious', 'overwhelmed', 'uncertain'],
    toolUrl: 'https://example.com/tools/stress-assessment',
  },
  {
    id: 't2',
    type: 'tool',
    category: 'self-help',
    subcategory: 'cbt',
    title: 'Thought Record Worksheet',
    creator: 'CBT Resources',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23a5b4fc"%3E%3C/rect%3E%3Crect x="30" y="30" width="40" height="40" fill="%238b5cf6" rx="5"%3E%3C/rect%3E%3Cpath d="M40,50 L60,50 M50,40 L50,60" stroke="%234c1d95" stroke-width="2"%3E%3C/path%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%234c1d95" text-anchor="middle"%3ECBT Tool%3C/text%3E%3C/svg%3E',
    description: 'A cognitive-behavioral therapy (CBT) worksheet to help you identify and challenge negative thought patterns.',
    tags: ['CBT', 'thought patterns', 'cognitive distortions'],
    recommended: ['anxious', 'depressed', 'negative', 'stressed'],
    download: true,
    toolUrl: 'https://example.com/worksheets/thought-record',
  },
  {
    id: 't3',
    type: 'tool',
    category: 'relaxation',
    subcategory: 'interactive',
    title: 'Interactive Breathing Exercise',
    creator: 'Digital Wellness',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2393c5fd"%3E%3C/rect%3E%3Ccircle cx="50" cy="50" r="25" fill="%2360a5fa"%3E%3C/circle%3E%3Ccircle cx="50" cy="50" r="15" fill="%233b82f6"%3E%3C/circle%3E%3Canimate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite"%3E%3C/animate%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%231e40af" text-anchor="middle"%3EBreathing%3C/text%3E%3C/svg%3E',
    description: 'Follow along with this interactive breathing exercise that uses visual cues to help you establish a calming breath pattern.',
    tags: ['breathing', 'relaxation', 'interactive'],
    recommended: ['anxious', 'stressed', 'overwhelmed', 'tense'],
    toolUrl: 'https://example.com/tools/breathing-exercise',
  },
  {
    id: 't4',
    type: 'tool',
    category: 'self-help',
    subcategory: 'gratitude',
    title: 'Gratitude Journal Template',
    creator: 'Positive Psychology',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2386efac"%3E%3C/rect%3E%3Crect x="30" y="30" width="40" height="40" fill="%234ade80" rx="3"%3E%3C/rect%3E%3Cpath d="M35,40 L65,40 M35,50 L65,50 M35,60 L50,60" stroke="%23166534" stroke-width="1.5"%3E%3C/path%3E%3Ctext x="50" y="85" font-family="Arial" font-size="10" fill="%23166534" text-anchor="middle"%3EGratitude%3C/text%3E%3C/svg%3E',
    description: 'A structured template to help you develop a regular gratitude practice, which has been shown to improve mood and overall wellbeing.',
    tags: ['gratitude', 'positive psychology', 'journaling'],
    recommended: ['sad', 'depressed', 'negative', 'pessimistic'],
    download: true,
    toolUrl: 'https://example.com/worksheets/gratitude-journal',
  }
]
  // List of categories and subcategories
  const categories = [
    { id: 'all', label: 'All Resources' },
    { 
      id: 'mental-health', 
      label: 'Mental Health', 
      subcategories: [
        { id: 'all', label: 'All Topics' },
        { id: 'anxiety', label: 'Anxiety' },
        { id: 'depression', label: 'Depression' },
        { id: 'stress', label: 'Stress Management' },
        { id: 'education', label: 'Education & Awareness' },
      ]
    },
    { 
      id: 'self-care', 
      label: 'Self-Care', 
      subcategories: [
        { id: 'all', label: 'All Topics' },
        { id: 'mindfulness', label: 'Mindfulness' },
        { id: 'sleep', label: 'Sleep Hygiene' },
        { id: 'nutrition', label: 'Nutrition & Mental Health' },
      ]
    },
    { 
      id: 'meditation', 
      label: 'Meditation', 
      subcategories: [
        { id: 'all', label: 'All Types' },
        { id: 'guided', label: 'Guided Meditation' },
        { id: 'sleep', label: 'Sleep Meditation' },
        { id: 'focus', label: 'Focus & Concentration' },
      ]
    },
    { 
      id: 'exercise', 
      label: 'Movement & Exercise', 
      subcategories: [
        { id: 'all', label: 'All Activities' },
        { id: 'yoga', label: 'Yoga' },
        { id: 'walking', label: 'Walking Meditation' },
        { id: 'stretching', label: 'Stretching & Relaxation' },
      ]
    },
    { 
      id: 'relationships', 
      label: 'Relationships', 
      subcategories: [
        { id: 'all', label: 'All Topics' },
        { id: 'communication', label: 'Communication Skills' },
        { id: 'boundaries', label: 'Setting Boundaries' },
        { id: 'conflict', label: 'Conflict Resolution' },
      ]
    },
    { 
      id: 'self-assessment', 
      label: 'Self-Assessment Tools', 
      subcategories: [
        { id: 'all', label: 'All Tools' },
        { id: 'stress', label: 'Stress Assessment' },
        { id: 'anxiety', label: 'Anxiety Screening' },
        { id: 'mood', label: 'Mood Tracking' },
      ]
    },
  ];

  const resourceTypes = [
    { id: 'article', label: 'Articles', icon: <Book className="w-4 h-4" /> },
    { id: 'video', label: 'Videos', icon: <Video className="w-4 h-4" /> },
    { id: 'audio', label: 'Audio Guides', icon: <Headphones className="w-4 h-4" /> },
    { id: 'tool', label: 'Interactive Tools', icon: <Download className="w-4 h-4" /> },
  ];

  // Custom hooks for mood recommendations
  const moodBasedRecommendations = [
    { 
      mood: 'anxious', 
      title: 'For Anxiety & Worry',
      resources: resourcesData.filter(r => r.recommended && r.recommended.includes('anxious')).slice(0, 3)
    },
    { 
      mood: 'sad', 
      title: 'For Low Mood & Sadness',
      resources: resourcesData.filter(r => r.recommended && r.recommended.includes('sad')).slice(0, 3)
    },
    { 
      mood: 'stressed', 
      title: 'For Stress Relief',
      resources: resourcesData.filter(r => r.recommended && r.recommended.includes('stressed')).slice(0, 3)
    },
    { 
      mood: 'tired', 
      title: 'For Energy & Motivation',
      resources: resourcesData.filter(r => r.recommended && (r.recommended.includes('tired') || r.recommended.includes('unmotivated'))).slice(0, 3)
    },
  ];

  // State initialization and simulation
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate previously saved favorites and bookmarks
    setFavorites(['a1', 'v1']);
    setBookmarks(['a3', 't2']);

    return () => clearTimeout(timer);
  }, []);

  // Filter resources based on current filters
  const filteredResources = resourcesData.filter(resource => {
    // Filter by search term
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (activeCategory !== 'all' && resource.category !== activeCategory) {
      return false;
    }
    
    // Filter by subcategory
    if (activeSubcategory !== 'all' && resource.subcategory !== activeSubcategory) {
      return false;
    }
    
    return true;
  });

  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(item => item !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Get current subcategories based on active category
  const getSubcategories = () => {
    const category = categories.find(cat => cat.id === activeCategory);
    return category && category.subcategories ? category.subcategories : [];
  };

  // Open resource detail view
  const openResourceDetail = (resource) => {
    setSelectedResource(resource);
  };

  // Handle video player functionality
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="flex h-screen bg-slate-800 font-['Poppins']">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 shadow-md bg-slate-800 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              className="p-1 mr-3 rounded-md text-slate-300 hover:bg-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Mental Health Resources</h1>
              <p className="hidden text-sm text-slate-300 sm:block">Tools, guides, and support for your mental wellbeing journey</p>
            </div>
          </div>
          <div className="items-center hidden md:flex">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="py-1.5 px-3 pr-10 rounded-md bg-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 right-3 top-1/2 text-slate-400" />
            </div>
            <button 
              className="flex items-center px-3 py-1.5 ml-3 text-sm rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </button>
            <button 
              className="flex items-center px-3 py-1.5 ml-3 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowMoodRecommendations(!showMoodRecommendations)}
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Mood Recommendations
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {/* Mobile search */}
          <div className="flex items-center gap-2 p-4 md:hidden">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full py-2 pl-3 pr-10 text-white rounded-md bg-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 right-3 top-1/2 text-slate-400" />
            </div>
            <button 
              className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Mood recommendation banner - mobile only */}
          <div className="flex justify-center p-4 md:hidden">
            <button 
              className="flex items-center justify-center w-full py-2 text-white rounded-md bg-gradient-to-r from-emerald-600 to-teal-600"
              onClick={() => setShowMoodRecommendations(!showMoodRecommendations)}
            >
              <Heart className="w-5 h-5 mr-2" />
              Find Resources for Your Mood
            </button>
          </div>

          {/* Mood-based recommendations section */}
          <AnimatePresence>
            {showMoodRecommendations && (
              <motion.div 
                className="p-4 mx-4 my-4 sm:mx-6 lg:mx-8 rounded-xl bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">How are you feeling today?</h2>
                  <button 
                    className="text-slate-300 hover:text-white"
                    onClick={() => setShowMoodRecommendations(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <button 
                    className={`flex items-center px-4 py-2 rounded-full ${mood === 'anxious' ? 'bg-amber-500 text-amber-900' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                    onClick={() => setMood('anxious')}
                  >
                    <Wind className="w-4 h-4 mr-1.5" />
                    Anxious
                  </button>
                  <button 
                    className={`flex items-center px-4 py-2 rounded-full ${mood === 'sad' ? 'bg-blue-500 text-blue-900' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                    onClick={() => setMood('sad')}
                  >
                    <CloudRain className="w-4 h-4 mr-1.5" />
                    Sad
                  </button>
                  <button 
                    className={`flex items-center px-4 py-2 rounded-full ${mood === 'stressed' ? 'bg-red-500 text-red-900' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                    onClick={() => setMood('stressed')}
                  >
                    <Coffee className="w-4 h-4 mr-1.5" />
                    Stressed
                  </button>
                  <button 
                    className={`flex items-center px-4 py-2 rounded-full ${mood === 'tired' ? 'bg-purple-500 text-purple-900' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                    onClick={() => setMood('tired')}
                  >
                    <Moon className="w-4 h-4 mr-1.5" />
                    Tired
                  </button>
                </div>

                {mood && (
                  <div className="space-y-5">
                    {moodBasedRecommendations
                      .filter(rec => rec.mood === mood)
                      .map(recommendation => (
                        <div key={recommendation.mood}>
                          <h3 className="mb-3 text-lg font-medium text-white">{recommendation.title}</h3>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {recommendation.resources.map(resource => (
                              <motion.div 
                                key={resource.id}
                                className="overflow-hidden transition-shadow rounded-lg bg-slate-800 hover:shadow-lg hover:shadow-emerald-900/20"
                                whileHover={{ y: -5 }}
                                onClick={() => openResourceDetail(resource)}
                              >
                                <div className="relative h-32 overflow-hidden">
                                  <img 
                                    src={resource.thumbnail || resource.image} 
                                    alt={resource.title}
                                    className="object-cover w-full h-full"
                                  />
                                  {resource.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                  )}
                                  {resource.type === 'audio' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                      <Headphones className="w-12 h-12 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-3">
                                  <div className="flex items-center mb-1 text-xs text-slate-400">
                                    {resource.type === 'article' && <Book className="w-3 h-3 mr-1" />}
                                    {resource.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                                    {resource.type === 'audio' && <Headphones className="w-3 h-3 mr-1" />}
                                    {resource.type === 'tool' && <Download className="w-3 h-3 mr-1" />}
                                    <span className="capitalize">{resource.type}</span>
                                    {resource.duration && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <Clock className="w-3 h-3 mr-1" />
                                        {resource.duration}
                                      </>
                                    )}
                                    {resource.readTime && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <Clock className="w-3 h-3 mr-1" />
                                        {resource.readTime}
                                      </>
                                    )}
                                  </div>
                                  <h3 className="font-medium text-white line-clamp-2">{resource.title}</h3>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex justify-center mt-4">
                            <button className="flex items-center px-4 py-2 text-sm text-white rounded-md bg-slate-600 hover:bg-slate-500">
                              View More <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter drawer */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div 
                className="fixed inset-0 z-20 lg:static"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setFilterOpen(false)} />
                <motion.div
                  className="fixed right-0 w-full h-full max-w-sm p-4 overflow-y-auto bg-slate-800 sm:p-6 lg:static lg:block lg:h-auto lg:w-64 lg:rounded-lg lg:mt-0 lg:ml-6 lg:mr-0 lg:p-4"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h2 className="text-lg font-medium text-white">Filter Resources</h2>
                    <button 
                      className="text-slate-300 hover:text-white"
                      onClick={() => setFilterOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-slate-300">Resource Type</h3>
                    <div className="space-y-2">
                      {resourceTypes.map(type => (
                        <button
                          key={type.id}
                          className="flex items-center w-full px-3 py-2 text-left transition-colors rounded-md text-slate-300 hover:bg-slate-700"
                        >
                          <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-slate-700">
                            {type.icon}
                          </div>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-slate-300">Categories</h3>
                    <div className="space-y-1">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`flex items-center w-full px-3 py-2 text-left text-sm transition-colors rounded-md ${activeCategory === category.id ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory('all');
                          }}
                        >
                          {activeCategory === category.id ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <div className="w-4 h-4 mr-2" />
                          )}
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeCategory !== 'all' && getSubcategories().length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-2 text-sm font-medium text-slate-300">Subcategories</h3>
                      <div className="pl-4 space-y-1 border-l border-slate-700">
                        {getSubcategories().map(subcategory => (
                          <button
                            key={subcategory.id}
                            className={`flex items-center w-full px-3 py-1.5 text-left text-sm transition-colors rounded-md ${activeSubcategory === subcategory.id ? 'bg-emerald-600/70 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                            onClick={() => setActiveSubcategory(subcategory.id)}
                          >
                            {activeSubcategory === subcategory.id ? (
                              <CheckCircle className="w-3 h-3 mr-2" />
                            ) : (
                              <div className="w-3 h-3 mr-2" />
                            )}
                            {subcategory.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-6 border-t border-slate-700">
                    <button 
                      className="flex items-center justify-center w-full px-4 py-2 mb-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                    >
                      Apply Filters
                    </button>
                    <button 
                      className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Reset
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured sections and resource grid */}
          <div className="p-4 lg:flex lg:p-0">
            {/* Desktop sidebar for filters - only visible at larger breakpoints */}
            <div className="sticky top-0 hidden h-screen pl-8 pr-4 overflow-y-auto lg:block lg:w-64">
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-300">Resource Type</h3>
                  <div className="space-y-2">
                    {resourceTypes.map(type => (
                      <motion.button
                        key={type.id}
                        className="flex items-center w-full px-3 py-2 text-left transition-colors rounded-md text-slate-300 hover:bg-slate-700"
                        variants={categoryVariants}
                      >
                        <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-slate-700">
                          {type.icon}
                        </div>
                        {type.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

              

                {activeCategory !== 'all' && getSubcategories().length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-slate-300">Subcategories</h3>
                    <div className="pl-4 space-y-1 border-l border-slate-700">
                      {getSubcategories().map(subcategory => (
                        <motion.button
                          key={subcategory.id}
                          className={`flex items-center w-full px-3 py-1.5 text-left text-sm transition-colors rounded-md ${activeSubcategory === subcategory.id ? 'bg-emerald-600/70 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                          onClick={() => setActiveSubcategory(subcategory.id)}
                          variants={categoryVariants}
                        >
                          {activeSubcategory === subcategory.id ? (
                            <CheckCircle className="w-3 h-3 mr-2" />
                          ) : (
                            <div className="w-3 h-3 mr-2" />
                          )}
                          {subcategory.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-lg bg-slate-700/50">
                  <h3 className="mb-2 text-sm font-medium text-white">Need Help?</h3>
                  <p className="mb-3 text-sm text-slate-300">Not sure where to start? Our mental health quiz can help you find the most relevant resources.</p>
                  <button className="flex items-center justify-center w-full px-3 py-2 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                    Take the Quiz
                  </button>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 px-0 py-4 lg:px-6">
              {isLoading ? (
                // Loading state
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 rounded-full border-t-emerald-500 border-slate-700 animate-spin"></div>
                  <p className="mt-4 text-slate-300">Loading resources...</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Featured resource section */}
                  <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">Featured Resources</h2>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-900/90 to-teal-900/40"></div>
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23065f46'/%3E%3Cpath d='M0,200 Q200,100 400,200 Q600,300 800,200' stroke='%2334d399' stroke-width='8' fill='none'/%3E%3Ccircle cx='200' cy='200' r='50' fill='%2334d399' fill-opacity='0.5'/%3E%3Ccircle cx='600' cy='200' r='80' fill='%2334d399' fill-opacity='0.3'/%3E%3C/svg%3E" 
                        alt="Mindfulness Practice"
                        className="object-cover w-full h-64"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                        <span className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-md bg-emerald-600 text-emerald-50">New Resource</span>
                        <h3 className="mb-2 text-2xl font-bold text-white">30-Day Mindfulness Challenge</h3>
                        <p className="mb-4 text-emerald-50">Begin your journey to mindfulness with our guided 30-day program designed to reduce stress and improve focus.</p>
                        <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                          Start Now
                        </button>
                      </div>
                    </div>
                  </motion.section>

                  {/* Quick access section */}
                  <motion.section variants={itemVariants} className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">Quick Access</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <button className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-emerald-700/50">
                          <BookOpen className="w-6 h-6 text-emerald-300" />
                        </div>
                        <span className="text-sm font-medium text-white">Beginners Guide</span>
                      </button>
                      <button className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-blue-700/50">
                          <Headphones className="w-6 h-6 text-blue-300" />
                        </div>
                        <span className="text-sm font-medium text-white">Guided Meditations</span>
                      </button>
                      <button className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-amber-700/50">
                          <Download className="w-6 h-6 text-amber-300" />
                        </div>
                        <span className="text-sm font-medium text-white">Self-Assessment</span>
                      </button>
                      <button className="flex flex-col items-center p-4 transition-colors rounded-lg bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-purple-700/50">
                          <Calendar className="w-6 h-6 text-purple-300" />
                        </div>
                        <span className="text-sm font-medium text-white">Wellness Plans</span>
                      </button>
                    </div>
                  </motion.section>

                  {/* Popular categories section - visible on mobile */}
                  <motion.section variants={itemVariants} className="mb-8 lg:hidden">
                    <h2 className="mb-4 text-xl font-semibold text-white">Popular Categories</h2>
                    <div className="flex pb-2 space-x-3 overflow-x-auto hide-scrollbar">
                      {categories.slice(1, 6).map(category => (
                        <button 
                          key={category.id}
                          className={`flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full ${activeCategory === category.id ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory('all');
                          }}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </motion.section>

                  {/* Resources by topic section */}
                  <motion.section variants={itemVariants}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">All Resources</h2>
                      <div className="flex items-center text-sm text-slate-400">
                        <span>{filteredResources.length} resources found</span>
                      </div>
                    </div>

                    {filteredResources.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-slate-700">
                        <Search className="w-12 h-12 mb-4 text-slate-500" />
                        <h3 className="mb-2 text-lg font-medium text-white">No resources found</h3>
                        <p className="mb-4 text-center text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
                        <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredResources.map((resource) => (
                          <motion.div 
                            key={resource.id}
                            className="overflow-hidden transition-shadow rounded-lg cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-emerald-900/20"
                            whileHover={{ y: -5 }}
                            onClick={() => openResourceDetail(resource)}
                            variants={itemVariants}
                          >
                            <div className="relative h-40 overflow-hidden">
                              <img 
                                src={resource.thumbnail || resource.image} 
                                alt={resource.title}
                                className="object-cover w-full h-full"
                              />
                              {resource.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <PlayCircle className="w-12 h-12 text-white" />
                                </div>
                              )}
                              {resource.type === 'audio' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Headphones className="w-12 h-12 text-white" />
                                </div>
                              )}
                              <button 
                                className="absolute p-1.5 rounded-full top-2 right-2 bg-slate-800/70 hover:bg-slate-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(resource.id);
                                }}
                              >
                                <Heart className={`w-5 h-5 ${favorites.includes(resource.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                              </button>
                              <button 
                                className="absolute p-1.5 rounded-full top-2 left-2 bg-slate-800/70 hover:bg-slate-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(resource.id);
                                }}
                              >
                                <Bookmark className={`w-5 h-5 ${bookmarks.includes(resource.id) ? 'fill-emerald-500 text-emerald-500' : 'text-white'}`} />
                              </button>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center mb-2 text-xs text-slate-400">
                                {resource.type === 'article' && <Book className="w-3 h-3 mr-1" />}
                                {resource.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                                {resource.type === 'audio' && <Headphones className="w-3 h-3 mr-1" />}
                                {resource.type === 'tool' && <Download className="w-3 h-3 mr-1" />}
                                <span className="capitalize">{resource.type}</span>
                                {resource.duration && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {resource.duration}
                                  </>
                                )}
                                {resource.readTime && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {resource.readTime}
                                  </>
                                )}
                              </div>
                              <h3 className="mb-2 font-medium text-white line-clamp-2">{resource.title}</h3>
                              <p className="mb-3 text-sm text-slate-300 line-clamp-2">{resource.excerpt || resource.description}</p>
                              <div className="flex flex-wrap mt-2 text-xs gap-1.5">
                                {resource.tags && resource.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="px-2 py-1 rounded-full bg-slate-600 text-slate-300">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.section>

                  {/* Expert advice section */}
                  <motion.section variants={itemVariants} className="p-6 my-10 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600">
                    <h2 className="mb-6 text-xl font-semibold text-white">Expert Mental Health Advice</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-amber-600/30">
                          <Award className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">Building Healthy Habits</h3>
                          <p className="text-sm text-slate-300">Small, consistent changes are the foundation of better mental health. Start with just 5 minutes of mindfulness each day.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-blue-600/30">
                          <User className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">Self-Compassion Practice</h3>
                          <p className="text-sm text-slate-300">Treat yourself with the same kindness you'd offer to a good friend. Self-criticism rarely leads to positive change.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-green-600/30">
                          <Coffee className="w-6 h-6 text-green-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">Managing Stress Triggers</h3>
                          <p className="text-sm text-slate-300">Identify what activates your stress response and develop specific strategies for each trigger.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 rounded-full bg-purple-600/30">
                          <Moon className="w-6 h-6 text-purple-300" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">Prioritize Your Sleep</h3>
                          <p className="text-sm text-slate-300">Sleep isn't a luxury—it's essential maintenance for your brain. Aim for 7-9 hours of quality sleep each night.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button className="flex items-center px-5 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                        Get Personalized Advice
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </motion.section>

                  {/* Interactive tools section */}
                  <motion.section variants={itemVariants} className="mb-10">
                    <h2 className="mb-4 text-xl font-semibold text-white">Interactive Tools</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="p-5 transition-colors rounded-lg cursor-pointer bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-blue-900/50">
                            <Sun className="w-6 h-6 text-blue-300" />
                          </div>
                          <h3 className="font-medium text-white">Mood Assessment</h3>
                        </div>
                        <p className="mb-3 text-sm text-slate-300">Track your mood patterns and get insights into factors that influence your emotional wellbeing.</p>
                        <button className="flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">
                          Start Assessment <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      <div className="p-5 transition-colors rounded-lg cursor-pointer bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-purple-900/50">
                            <Headphones className="w-6 h-6 text-purple-300" />
                          </div>
                          <h3 className="font-medium text-white">Breathing Coach</h3>
                        </div>
                        <p className="mb-3 text-sm text-slate-300">Interactive breathing exercises with visual guidance to reduce stress and anxiety in minutes.</p>
                        <button className="flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">
                          Try Now <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      <div className="p-5 transition-colors rounded-lg cursor-pointer bg-slate-700 hover:bg-slate-600">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-emerald-900/50">
                            <Download className="w-6 h-6 text-emerald-300" />
                          </div>
                          <h3 className="font-medium text-white">Thought Reframing</h3>
                        </div>
                        <p className="mb-3 text-sm text-slate-300">Learn to identify negative thought patterns and transform them into more balanced perspectives.</p>
                        <button className="flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">
                          Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.section>

                  {/* Weekly challenges */}
                  <motion.section variants={itemVariants} className="p-5 rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">Weekly Challenge</h2>
                      <span className="px-2 py-1 text-xs font-medium text-blue-200 rounded-full bg-blue-500/30">New</span>
                    </div>
                    <h3 className="mb-3 text-lg font-medium text-white">7 Days of Gratitude Practice</h3>
                    <p className="mb-4 text-slate-300">Research shows that regularly practicing gratitude can significantly improve mental wellbeing. Take just 5 minutes each day to write down three things you're grateful for.</p>
                    <div className="p-3 mb-4 rounded-md bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">Progress</span>
                        <span className="text-sm text-slate-300">2/7 days</span>
                      </div>
                      <div className="w-full h-2 overflow-hidden rounded-full bg-slate-700">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Continue Challenge
                    </button>
                  </motion.section>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        {/* Resource detail modal */}
        <AnimatePresence>
          {selectedResource && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
            >
              <motion.div 
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-slate-800"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute p-1 rounded-full top-4 right-4 bg-slate-700 hover:bg-slate-600"
                  onClick={() => setSelectedResource(null)}
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {selectedResource.type === 'article' && (
                  <div>
                    <Image 
                      src={selectedResource.image} 
                      alt={selectedResource.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-64"
                    />
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300">
                          Article
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <Clock className="w-3 h-3 mr-1" /> {selectedResource.readTime}
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <Calendar className="w-3 h-3 mr-1" /> {selectedResource.date}
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <User className="w-3 h-3 mr-1" /> {selectedResource.author}
                        </span>
                      </div>
                      <h2 className="mb-4 text-2xl font-bold text-white">{selectedResource.title}</h2>
                      <p className="mb-6 text-slate-300">{selectedResource.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedResource.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between p-4 border rounded-lg border-slate-700">
                        <div>
                          <h3 className="mb-1 font-medium text-white">Was this helpful?</h3>
                          <div className="flex gap-2">
                            <button className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                              <ThumbsUp className="w-4 h-4 mr-1" /> Yes
                            </button>
                            <button className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                              <ThumbsDown className="w-4 h-4 mr-1" /> No
                            </button>
                          </div>
                        </div>
                        <div className="flex mt-4 sm:mt-0">
                          <button className="flex items-center px-3 py-1 mr-2 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Bookmark className={`w-4 h-4 mr-1 ${bookmarks.includes(selectedResource.id) ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                            {bookmarks.includes(selectedResource.id) ? 'Bookmarked' : 'Bookmark'}
                          </button>
                          <button className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Share className="w-4 h-4 mr-1" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedResource.type === 'video' && (
                  <div>
                    <div className="relative aspect-video bg-slate-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-20 h-20 text-white/80 hover:text-white" onClick={handlePlayVideo} />
                      </div>
                      <img 
                        src={selectedResource.thumbnail} 
                        alt={selectedResource.title}
                        className="object-cover w-full h-full"
                      />
                      <video 
                        ref={videoRef}
                        className="absolute inset-0 invisible w-full h-full"
                        poster={selectedResource.thumbnail}
                        controls
                        onPlay={() => videoRef.current.style.visibility = 'visible'}
                      >
                        <source src={selectedResource.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300">
                          Video
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <Clock className="w-3 h-3 mr-1" /> {selectedResource.duration}
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <User className="w-3 h-3 mr-1" /> {selectedResource.creator}
                        </span>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-white">{selectedResource.title}</h2>
                      <p className="mb-6 text-slate-300">{selectedResource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedResource.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="p-4 mb-6 border rounded-lg border-slate-700">
                        <h3 className="mb-3 font-medium text-white">Related Resources</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {resourcesData
                            .filter(r => r.id !== selectedResource.id && r.type === 'video')
                            .slice(0, 2)
                            .map(resource => (
                              <div 
                                key={resource.id} 
                                className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-700"
                                onClick={() => {
                                  if (videoRef.current) videoRef.current.pause();
                                  setSelectedResource(resource);
                                }}
                              >
                                <div className="relative flex-shrink-0 w-16 h-12 mr-3">
                                  <img 
                                    src={resource.thumbnail} 
                                    alt={resource.title}
                                    className="object-cover w-full h-full rounded"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center rounded bg-black/30">
                                    <PlayCircle className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-white line-clamp-2">{resource.title}</h4>
                                  <span className="text-xs text-slate-400">{resource.duration}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex">
                          <button className="flex items-center px-3 py-1 mr-2 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Bookmark className={`w-4 h-4 mr-1 ${bookmarks.includes(selectedResource.id) ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                            {bookmarks.includes(selectedResource.id) ? 'Bookmarked' : 'Bookmark'}
                          </button>
                          <button className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Share className="w-4 h-4 mr-1" />
                            Share
                          </button>
                        </div>
                        <button className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedResource.type === 'audio' && (
                  <div>
                    <div className="relative h-64 overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900">
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img 
                          src={selectedResource.thumbnail} 
                          alt={selectedResource.title}
                          className="object-contain w-32 h-32"
                        />
                        <div className="flex items-center mt-4">
                          <button className="p-3 mx-1 text-white rounded-full bg-white/20 hover:bg-white/30">
                            <PlayCircle className="w-8 h-8" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300">
                          Audio Guide
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <Clock className="w-3 h-3 mr-1" /> {selectedResource.duration}
                        </span>
                        <span className="flex items-center text-xs text-slate-400">
                          <User className="w-3 h-3 mr-1" /> {selectedResource.creator}
                        </span>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-white">{selectedResource.title}</h2>
                      <p className="mb-6 text-slate-300">{selectedResource.description}</p>
                      
                      <div className="w-full h-12 p-4 mb-6 rounded-lg bg-slate-700">
                        <div className="relative w-full h-1 rounded-full bg-slate-600">
                          <div className="absolute h-full rounded-full bg-emerald-500" style={{ width: '30%' }}></div>
                          <div className="absolute w-3 h-3 transform -translate-y-1/2 rounded-full bg-emerald-500" style={{ left: '30%', top: '50%' }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedResource.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="p-4 mb-6 border rounded-lg border-slate-700">
                        <h3 className="mb-3 font-medium text-white">How To Use This Audio</h3>
                        <ul className="pl-5 mb-3 space-y-2 text-sm list-disc text-slate-300">
                          <li>Find a quiet, comfortable place where you won't be disturbed</li>
                          <li>You can either sit or lie down in a relaxed position</li>
                          <li>Consider using headphones for the best experience</li>
                          <li>Follow the guidance and remember there's no "right way" to do this</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex">
                          <button className="flex items-center px-3 py-1 mr-2 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Bookmark className={`w-4 h-4 mr-1 ${bookmarks.includes(selectedResource.id) ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                            {bookmarks.includes(selectedResource.id) ? 'Bookmarked' : 'Bookmark'}
                          </button>
                          <button className="flex items-center px-3 py-1 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                            <Heart className={`w-4 h-4 mr-1 ${favorites.includes(selectedResource.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            {favorites.includes(selectedResource.id) ? 'Favorited' : 'Favorite'}
                          </button>
                        </div>
                        <button className="flex items-center px-3 py-1 text-sm text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                          <Download className="w-4 h-4 mr-1" />
                          Download Audio
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedResource.type === 'tool' && (
                  <div>
                    <div className="h-48 bg-gradient-to-r from-blue-900 to-indigo-900">
                      <div className="flex flex-col items-center justify-center h-full">
                        <img 
                          src={selectedResource.thumbnail} 
                          alt={selectedResource.title}
                          className="object-contain w-20 h-20 mb-3"
                        />
                        <h2 className="text-2xl font-bold text-white">{selectedResource.title}</h2>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300">
                          Interactive Tool
                        </span>
                        {selectedResource.download && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-900/50 text-emerald-300">
                            Downloadable
                          </span>
                        )}
                        <span className="flex items-center text-xs text-slate-400">
                          <User className="w-3 h-3 mr-1" /> {selectedResource.creator}
                        </span>
                      </div>
                      <p className="mb-6 text-slate-300">{selectedResource.description}</p>
                      
                      <div className="p-5 mb-6 rounded-lg bg-slate-700">
                        <h3 className="mb-3 font-medium text-white">How This Tool Helps</h3>
                        <p className="mb-4 text-sm text-slate-300">
                          This evidence-based tool is designed to help you understand and manage your mental health effectively. Regular use can lead to improved awareness and better coping strategies.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center px-3 py-1.5 rounded-md bg-slate-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                            <span className="text-xs text-slate-300">Research-backed</span>
                          </div>
                          <div className="flex items-center px-3 py-1.5 rounded-md bg-slate-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                            <span className="text-xs text-slate-300">Therapist-approved</span>
                          </div>
                          <div className="flex items-center px-3 py-1.5 rounded-md bg-slate-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" />
                            <span className="text-xs text-slate-300">User-friendly</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedResource.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        {selectedResource.download ? (
                          <button className="flex items-center px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                            <Download className="w-5 h-5 mr-2" />
                            Download Worksheet
                          </button>
                        ) : (
                          <button className="flex items-center px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                            <ArrowRight className="w-5 h-5 mr-2" />
                            Start Using Tool
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResourcesPage;