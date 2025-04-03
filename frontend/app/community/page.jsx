"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Search, Filter, PlusCircle, Heart, MessageCircle, 
  Shield, Flag, ChevronDown, ChevronUp, Menu, Send, Clock, User, ThumbsUp,
  Bookmark, Share2, Eye, Lock, AlertCircle, X, Check, Sparkles, Bell
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

const CommunityPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('community');
  const [activeTab, setActiveTab] = useState('forums');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);

  // Mock data for the community page
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'anxiety', name: 'Anxiety & Stress' },
    { id: 'depression', name: 'Depression' },
    { id: 'self-care', name: 'Self-Care' },
    { id: 'relationships', name: 'Relationships' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'wellness', name: 'General Wellness' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "How do you manage anxiety during work meetings?",
      content: "I've been struggling with anxiety before and during work meetings. I start to get really nervous when I have to speak up. Has anyone found techniques that help them stay calm in these situations?",
      author: "anxious_analyst",
      date: "2025-04-01T10:23:00",
      category: "anxiety",
      likes: 24,
      replies: 8,
      views: 156,
      isAnonymous: false,
      tags: ["anxiety", "work", "meetings"]
    },
    {
      id: 2,
      title: "Mindfulness practices that actually work",
      content: "I've tried several mindfulness apps but haven't found one that really helps me. I'd love to hear what practices have actually made a difference for others in their mental health journey.",
      author: "mind_explorer",
      date: "2025-03-31T14:45:00",
      category: "mindfulness",
      likes: 42,
      replies: 15,
      views: 230,
      isAnonymous: false,
      tags: ["mindfulness", "meditation", "practices"]
    },
    {
      id: 3,
      title: "Depression and motivation loss",
      content: "I've been diagnosed with depression and the hardest part for me is the complete lack of motivation. Everything feels overwhelming. How do you break things down into manageable steps?",
      author: "Anonymous",
      date: "2025-03-30T09:12:00",
      category: "depression",
      likes: 36,
      replies: 12,
      views: 189,
      isAnonymous: true,
      tags: ["depression", "motivation", "small-steps"]
    },
    {
      id: 4,
      title: "Self-care routines for busy schedules",
      content: "I barely have time to breathe between work and family responsibilities. How do you fit in self-care when your schedule is packed? Looking for realistic suggestions.",
      author: "busy_bee",
      date: "2025-03-29T18:20:00",
      category: "self-care",
      likes: 29,
      replies: 11,
      views: 164,
      isAnonymous: false,
      tags: ["self-care", "busy", "routines"]
    },
    {
      id: 5,
      title: "Setting boundaries with family members",
      content: "I struggle with setting healthy boundaries with my parents. Every time I try, I feel guilty. Does anyone have experience with establishing boundaries without damaging relationships?",
      author: "boundary_seeker",
      date: "2025-03-28T12:30:00",
      category: "relationships",
      likes: 31,
      replies: 14,
      views: 175,
      isAnonymous: false,
      tags: ["boundaries", "family", "relationships"]
    }
  ];

  const supportGroups = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      description: "A safe space to share experiences and coping strategies for anxiety and panic disorders.",
      members: 328,
      category: "anxiety",
      image: "/api/placeholder/60/60",
      meetingTimes: "Tuesdays & Thursdays, 7PM EST",
      isPrivate: false
    },
    {
      id: 2,
      name: "Depression Recovery Path",
      description: "Supporting each other through depression with understanding and practical strategies.",
      members: 254,
      category: "depression",
      image: "/api/placeholder/60/60",
      meetingTimes: "Mondays & Wednesdays, 6PM EST",
      isPrivate: false
    },
    {
      id: 3,
      name: "Mindfulness Practitioners",
      description: "Daily mindfulness practices and discussions on incorporating mindfulness into everyday life.",
      members: 412,
      category: "mindfulness",
      image: "/api/placeholder/60/60",
      meetingTimes: "Daily check-ins, Group meditation Sundays 10AM EST",
      isPrivate: false
    },
    {
      id: 4,
      name: "Work-Life Balance",
      description: "Strategies for maintaining mental health while balancing career demands and personal life.",
      members: 189,
      category: "wellness",
      image: "/api/placeholder/60/60",
      meetingTimes: "Fridays, 5PM EST",
      isPrivate: true
    },
    {
      id: 5,
      name: "Relationship Healing",
      description: "Healing from relationship trauma and building healthy connections moving forward.",
      members: 216,
      category: "relationships",
      image: "/api/placeholder/60/60",
      meetingTimes: "Wednesdays, 7PM EST",
      isPrivate: false
    }
  ];

  const comments = [
    {
      id: 1,
      postId: 1,
      author: "calm_counselor",
      content: "I've found that the 4-7-8 breathing technique really helps before meetings. Inhale for 4 seconds, hold for 7, exhale for 8. Also, preparing talking points in advance helps me feel more confident when speaking up.",
      date: "2025-04-01T11:45:00",
      likes: 8
    },
    {
      id: 2,
      postId: 1,
      author: "meeting_master",
      content: "What helped me was exposure therapy - I deliberately started speaking up more in low-stakes meetings to build confidence. It was uncomfortable at first but got easier with practice.",
      date: "2025-04-01T12:10:00",
      likes: 5
    },
    {
      id: 3,
      postId: 1,
      author: "Anonymous",
      content: "I struggle with this too. My therapist suggested visualizing the meeting going well beforehand. Also, I keep a small stress ball in my pocket to squeeze when I feel anxious during the meeting.",
      date: "2025-04-01T14:22:00",
      likes: 6,
      isAnonymous: true
    }
  ];

  // Get formatted date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Filter posts based on search and category
  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort posts based on selected sorting method
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (selectedSort === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (selectedSort === 'popular') {
      return b.likes - a.likes;
    } else if (selectedSort === 'active') {
      return b.replies - a.replies;
    }
    return 0;
  });

  // Filter support groups based on category
  const filteredGroups = supportGroups.filter(group => {
    const matchesSearch = searchQuery.trim() === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Show filtered comments for expanded post
  const getPostComments = (postId) => {
    return comments.filter(comment => comment.postId === postId);
  };

  // Toggle post expansion
  const togglePostExpansion = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
    }
  };

  // Join support group
  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setShowJoinModal(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  return (
    <div className="flex h-screen bg-slate-600 font-['Poppins']">
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
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
            <h1 className="text-xl font-semibold text-slate-100">Community Support</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600">
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <button 
              className="hidden p-1 rounded-full md:block bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setShowNewPostModal(true)}
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex flex-col flex-1 overflow-hidden bg-slate-800">
          {/* Tabs and Search */}
          <div className="p-4 border-b sm:px-6 lg:px-8 border-slate-700">
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
              {/* Tabs */}
              <div className="flex mb-4 space-x-4 md:mb-0">
                <button 
                  className={`flex items-center px-1 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'forums' 
                      ? 'text-emerald-400 border-emerald-400' 
                      : 'text-slate-400 border-transparent hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('forums')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discussion Forums
                </button>
                <button 
                  className={`flex items-center px-1 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'groups' 
                      ? 'text-emerald-400 border-emerald-400' 
                      : 'text-slate-400 border-transparent hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('groups')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Support Groups
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 pl-10 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Filters and New Post Button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <button
                  className="flex items-center px-3 py-1 mr-3 text-sm rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-1.5" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="w-3 h-3 ml-1" />
                  ) : (
                    <ChevronDown className="w-3 h-3 ml-1" />
                  )}
                </button>
                <div className="hidden sm:flex sm:space-x-2">
                  <button
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedSort === 'recent' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedSort('recent')}
                  >
                    Recent
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedSort === 'popular' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedSort('popular')}
                  >
                    Popular
                  </button>
                  <button
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedSort === 'active' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedSort('active')}
                  >
                    Most Active
                  </button>
                </div>
              </div>
              <button
                className="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded-md md:hidden bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowNewPostModal(true)}
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                New Post
              </button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="mt-4 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-lg bg-slate-700">
                    <h3 className="mb-2 text-sm font-medium text-white">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`px-3 py-1 text-xs rounded-full ${
                            selectedCategory === category.id 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <button
                        className="px-3 py-1 text-xs text-white rounded-md bg-slate-600 hover:bg-slate-500"
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSort('recent');
                          setSearchQuery('');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Forum Content */}
          <div className="flex-1 p-4 overflow-y-auto sm:p-6 lg:p-8">
            {activeTab === 'forums' ? (
              <>
                {/* Forum Posts */}
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedPosts.length > 0 ? (
                    sortedPosts.map(post => (
                      <motion.div 
                        key={post.id}
                        className="overflow-hidden rounded-lg bg-slate-700"
                        variants={itemVariants}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-white">{post.title}</h3>
                              <div className="flex flex-wrap items-center mt-2 text-xs text-slate-400">
                                <span className="flex items-center mr-3">
                                  <User className="w-3 h-3 mr-1" />
                                  {post.isAnonymous ? 'Anonymous' : post.author}
                                </span>
                                <span className="flex items-center mr-3">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {formatDate(post.date)}
                                </span>
                                <span className="px-2 py-0.5 mt-1 mr-2 text-xs rounded-full bg-slate-600">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-1 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                              <button className="p-1 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-slate-600">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className={`text-sm text-slate-300 ${expandedPost !== post.id && 'line-clamp-2'}`}>
                              {post.content}
                            </p>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {post.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="px-2 py-0.5 text-xs rounded-full bg-slate-600 text-slate-300"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex space-x-4">
                              <button className="flex items-center text-sm text-slate-400 hover:text-emerald-400">
                                <Heart className="w-4 h-4 mr-1.5" />
                                {post.likes}
                              </button>
                              <button 
                                className="flex items-center text-sm text-slate-400 hover:text-emerald-400"
                                onClick={() => togglePostExpansion(post.id)}
                              >
                                <MessageCircle className="w-4 h-4 mr-1.5" />
                                {post.replies}
                              </button>
                              <div className="flex items-center text-sm text-slate-400">
                                <Eye className="w-4 h-4 mr-1.5" />
                                {post.views}
                              </div>
                            </div>
                            <button 
                              className="flex items-center px-2 py-1 text-xs rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500"
                              onClick={() => togglePostExpansion(post.id)}
                            >
                              {expandedPost === post.id ? 'Hide Comments' : 'View Comments'}
                              {expandedPost === post.id ? (
                                <ChevronUp className="w-3 h-3 ml-1" />
                              ) : (
                                <ChevronDown className="w-3 h-3 ml-1" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        <AnimatePresence>
                          {expandedPost === post.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="p-4 border-t border-slate-600">
                                <h4 className="mb-3 text-sm font-medium text-slate-300">Comments</h4>
                                <div className="mb-4 space-y-3">
                                  {getPostComments(post.id).map(comment => (
                                    <div 
                                      key={comment.id} 
                                      className="p-3 rounded-lg bg-slate-600"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                          <span className="font-medium text-white">
                                            {comment.isAnonymous ? 'Anonymous' : comment.author}
                                          </span>
                                          <span className="ml-2 text-xs text-slate-400">
                                            {formatDate(comment.date)}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <button className="text-slate-400 hover:text-emerald-400">
                                            <ThumbsUp className="w-3 h-3" />
                                          </button>
                                          <span className="text-xs text-slate-400">{comment.likes}</span>
                                          <button className="text-slate-400 hover:text-red-400">
                                            <Flag className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                      <p className="text-sm text-slate-300">
                                        {comment.content}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="flex items-center p-1 rounded-lg bg-slate-600">
                                  <input 
                                    type="text" 
                                    placeholder="Add your comment..."
                                    className="flex-1 px-3 py-2 text-sm bg-transparent text-slate-200 focus:outline-none"
                                  />
                                  <div className="flex items-center">
                                    <button className="p-2 mr-1 rounded-full text-slate-400 hover:text-slate-300 hover:bg-slate-500">
                                      <Sparkles className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-white rounded-full bg-emerald-600 hover:bg-emerald-700">
                                      <Send className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8">
                      <MessageSquare className="w-12 h-12 mb-3 text-slate-500" />
                      <h3 className="mb-2 text-lg font-medium text-white">No posts found</h3>
                      <p className="mb-4 text-center text-slate-400">
                        We couldnt find any posts matching your current filters.
                      </p>
                      <button 
                        className="px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                {/* Support Groups */}
                <motion.div 
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                      <motion.div 
                        key={group.id}
                        className="overflow-hidden rounded-lg bg-slate-700"
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                              <img 
                                src={group.image} 
                                alt={group.name} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <h3 className="flex items-center text-lg font-medium text-white">
                                {group.name}
                                {group.isPrivate && (
                                  <Lock className="w-3 h-3 ml-1 text-slate-400" />
                                )}
                              </h3>
                              <div className="flex items-center text-xs text-slate-400">
                                <Users className="w-3 h-3 mr-1" />
                                {group.members} members
                              </div>
                            </div>
                          </div>
                          <p className="mb-3 text-sm text-slate-300">{group.description}</p>
                          <div className="mb-3">
                            <div className="p-2 text-xs rounded-md bg-slate-600 text-slate-300">
                              <span className="flex items-center mb-1 font-medium">
                                <Clock className="w-3 h-3 mr-1" /> Meeting Times:
                              </span>
                              {group.meetingTimes}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-600 text-slate-300">
                              {group.category}
                            </span>
                            <button 
                              className="px-3 py-1 text-xs font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => handleJoinGroup(group)}
                            >
                              Join Group
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 col-span-full">
                      <Users className="w-12 h-12 mb-3 text-slate-500" />
                      <h3 className="mb-2 text-lg font-medium text-white">No groups found</h3>
                      <p className="mb-4 text-center text-slate-400">
                        We couldnt find any support groups matching your current filters.
                      </p>
                      <button 
                        className="px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                className="relative w-full max-w-lg p-6 overflow-hidden rounded-lg bg-slate-800"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <button 
                  className="absolute p-1 rounded-full top-4 right-4 text-slate-400 hover:bg-slate-700"
                  onClick={() => setShowNewPostModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h2 className="mb-4 text-xl font-semibold text-white">Create New Post</h2>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Title
                  </label>
                  <input 
                    type="text" 
                    placeholder="Post title"
                    className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    {categories.filter(cat => cat.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Content
                  </label>
                  <textarea 
                    placeholder="What's on your mind?"
                    rows={4}
                    className="w-full px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 mr-2 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Post anonymously
                  </label>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full text-slate-400 hover:text-slate-300 hover:bg-slate-700">
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 px-4 py-2 font-medium border rounded-md text-slate-300 border-slate-600 hover:bg-slate-700"
                    onClick={() => setShowNewPostModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowNewPostModal(false)}
                  >
                    Post
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Group Modal */}
      <AnimatePresence>
        {showJoinModal && selectedGroup && (
          <motion.div
            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                className="relative w-full max-w-md p-6 overflow-hidden rounded-lg bg-slate-800"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <button 
                  className="absolute p-1 rounded-full top-4 right-4 text-slate-400 hover:bg-slate-700"
                  onClick={() => setShowJoinModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
                    <Image 
                      src={selectedGroup.image} 
                      alt={selectedGroup.name} 
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedGroup.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {selectedGroup.members} members
                    </p>
                  </div>
                </div>
                
                <div className="p-4 mb-4 rounded-lg bg-slate-700">
                  <h3 className="flex items-center mb-2 font-medium text-white">
                    <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                    Group Guidelines
                  </h3>
                  <ul className="pl-6 mb-3 text-sm list-disc text-slate-300">
                    <li>Be respectful and supportive to all members</li>
                    <li>Keep shared information confidential</li>
                    <li>Participate actively and constructively</li>
                    <li>No promotion or solicitation allowed</li>
                  </ul>
                  <div className="flex items-start p-2 text-sm rounded-md bg-slate-600">
                    <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-amber-400" />
                    <p className="text-slate-300">
                      This group meets {selectedGroup.meetingTimes.toLowerCase()}. Regular participation is encouraged.
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 mr-2 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    I agree to follow the group guidelines and community code of conduct
                  </label>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 px-4 py-2 font-medium border rounded-md text-slate-300 border-slate-600 hover:bg-slate-700"
                    onClick={() => setShowJoinModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowJoinModal(false)}
                  >
                    <Check className="inline w-4 h-4 mr-1" />
                    Join Group
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityPage;