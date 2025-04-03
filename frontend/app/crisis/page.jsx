"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Heart, LifeBuoy, Clock, MapPin, Globe, 
  ChevronDown, ChevronUp, Search, ExternalLink, 
  Bookmark, Share2, Info, CheckCircle, AlertTriangle,
  HelpCircle, MessageSquare, Menu, Filter
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const CrisisResourcesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('crisis');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedResource, setExpandedResource] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    language: 'all',
    availability: 'all',
    type: 'all'
  });

  // Simulate getting user location
  useEffect(() => {
    setTimeout(() => {
      setUserLocation({ lat: 40.7128, lng: -74.006 });
    }, 1000);
  }, []);

  // Toggle resource expansion
  const toggleResourceExpansion = (id) => {
    if (expandedResource === id) {
      setExpandedResource(null);
    } else {
      setExpandedResource(id);
    }
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    if (bookmarkedResources.includes(id)) {
      setBookmarkedResources(bookmarkedResources.filter(resourceId => resourceId !== id));
    } else {
      setBookmarkedResources([...bookmarkedResources, id]);
    }
  };

  // Categories for crisis resources
  const categories = [
    { id: 'all', name: 'All Resources', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'hotlines', name: 'Crisis Hotlines', icon: <Phone className="w-4 h-4" /> },
    { id: 'centers', name: 'Support Centers', icon: <MapPin className="w-4 h-4" /> },
    { id: 'immediate', name: 'Immediate Help', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'online', name: 'Online Support', icon: <Globe className="w-4 h-4" /> },
    { id: 'selfhelp', name: 'Self-Help Tools', icon: <Heart className="w-4 h-4" /> },
  ];

  // Emergency contacts and resources
  const emergencyContacts = [
    {
      id: 'emergency-services',
      name: 'Emergency Services',
      number: '911',
      description: 'Call for immediate emergency assistance in life-threatening situations.',
      category: 'immediate',
      availability: '24/7',
      languages: ['English', 'Spanish'],
      type: 'emergency'
    },
    {
      id: 'national-suicide-lifeline',
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.',
      website: 'https://988lifeline.org/',
      category: 'hotlines',
      availability: '24/7',
      languages: ['English', 'Spanish', 'TTY'],
      type: 'crisis'
    },
    {
      id: 'crisis-text-line',
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 support for those in crisis. Text with a trained crisis counselor for support with anxiety, depression, stress, and more.',
      website: 'https://www.crisistextline.org/',
      category: 'hotlines',
      availability: '24/7',
      languages: ['English'],
      type: 'text'
    },
    {
      id: 'samhsa',
      name: 'SAMHSA Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Treatment referral and information service for individuals facing mental health or substance use disorders.',
      website: 'https://www.samhsa.gov/find-help/national-helpline',
      category: 'hotlines',
      availability: '24/7',
      languages: ['English', 'Spanish'],
      type: 'referral'
    },
    {
      id: 'veterans-crisis',
      name: 'Veterans Crisis Line',
      number: '988, then press 1',
      description: 'Confidential support for Veterans and their families. Connect with caring, qualified responders, many of whom are Veterans themselves.',
      website: 'https://www.veteranscrisisline.net/',
      category: 'hotlines',
      availability: '24/7',
      languages: ['English', 'Spanish'],
      type: 'crisis'
    },
    {
      id: 'trevor-project',
      name: 'The Trevor Project',
      number: '1-866-488-7386',
      description: 'Crisis intervention and suicide prevention services for LGBTQ+ young people under 25.',
      website: 'https://www.thetrevorproject.org/',
      category: 'hotlines',
      availability: '24/7',
      languages: ['English'],
      type: 'crisis'
    },
    {
      id: 'nami-helpline',
      name: 'NAMI HelpLine',
      number: '1-800-950-NAMI (6264)',
      description: 'Free, nationwide peer-support service providing information, resource referrals and support to people living with mental health conditions.',
      website: 'https://www.nami.org/help',
      category: 'hotlines',
      availability: 'Mon-Fri, 10am-10pm ET',
      languages: ['English', 'Spanish'],
      type: 'support'
    },
    {
      id: 'calm-app',
      name: 'Calm Harm App',
      description: 'App designed to help people resist or manage the urge to self-harm. Uses evidence-based techniques to help change thoughts and behaviors.',
      website: 'https://calmharm.co.uk/',
      category: 'selfhelp',
      availability: '24/7',
      languages: ['English'],
      type: 'app'
    },
    {
      id: 'breathe2relax',
      name: 'Breathe2Relax',
      description: 'Stress management tool that provides detailed information on the effects of stress on the body and instructions on diaphragmatic breathing.',
      website: 'https://apps.apple.com/us/app/breathe2relax/id425720246',
      category: 'selfhelp',
      availability: '24/7',
      languages: ['English'],
      type: 'app'
    },
    {
      id: 'online-therapy',
      name: 'Online Therapy Platforms',
      description: 'Various online therapy services offering text, voice, and video sessions with licensed therapists.',
      website: 'https://www.betterhelp.com/',
      category: 'online',
      availability: 'Varies',
      languages: ['Multiple'],
      type: 'therapy'
    },
    {
      id: 'support-groups',
      name: 'Support Groups Online',
      description: 'Online communities and forums for peer support across many mental health concerns.',
      website: 'https://www.supportgroups.com/',
      category: 'online',
      availability: '24/7',
      languages: ['English'],
      type: 'community'
    },
    {
      id: 'community-centers',
      name: 'Local Community Mental Health Centers',
      description: 'Centers providing outpatient mental health services, including psychiatric, counseling, and case management services.',
      category: 'centers',
      availability: 'Varies by location',
      languages: ['Varies'],
      type: 'inperson'
    }
  ];

  // Filter resources based on search query, category and other filters
  const filteredResources = emergencyContacts.filter(resource => {
    // Filter by search query
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    // Filter by other filters
    const matchesLanguage = filters.language === 'all' || 
                           (resource.languages && resource.languages.includes(filters.language));
    const matchesAvailability = filters.availability === 'all' || 
                               (resource.availability && resource.availability.includes(filters.availability));
    const matchesType = filters.type === 'all' || resource.type === filters.type;
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesAvailability && matchesType;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
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

  // Self-help techniques section
  const selfHelpTechniques = [
    {
      id: 'breathing',
      title: 'Deep Breathing Exercise',
      description: 'Breathe in slowly through your nose for 4 counts, hold for 1 count, then exhale through your mouth for 6 counts. Repeat 5-10 times.',
      icon: <Clock className="w-10 h-10 text-emerald-500" />
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding Technique',
      description: 'Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.',
      icon: <CheckCircle className="w-10 h-10 text-emerald-500" />
    },
    {
      id: 'body-scan',
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and then relax each muscle group in your body, starting from your toes and working up to your head.',
      icon: <Heart className="w-10 h-10 text-emerald-500" />
    },
  ];

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
            <h1 className="text-xl font-semibold text-slate-100">Crisis Resources</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center p-2 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-40 px-3 py-2 pr-8 text-sm rounded-md md:w-64 bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 right-3 top-1/2 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-slate-800">
          {/* Emergency Call Banner */}
          <div className="p-4 text-center bg-red-600">
            <h2 className="text-lg font-bold text-white">In Immediate Danger?</h2>
            <p className="text-white">If you or someone else is in immediate danger, call <span className="text-xl font-bold">911</span> or your local emergency number right away</p>
          </div>

          {/* Filter Dropdown */}
          {filterMenuOpen && (
            <motion.div 
              className="p-4 border-b border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">Language</label>
                  <select 
                    className="w-full p-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                  >
                    <option value="all">All Languages</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="TTY">TTY Services</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">Availability</label>
                  <select 
                    className="w-full p-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={filters.availability}
                    onChange={(e) => setFilters({...filters, availability: e.target.value})}
                  >
                    <option value="all">All Hours</option>
                    <option value="24/7">24/7 Services</option>
                    <option value="Mon">Weekday Services</option>
                    <option value="Varies">Varied Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">Resource Type</label>
                  <select 
                    className="w-full p-2 text-sm rounded-md bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="crisis">Crisis Support</option>
                    <option value="therapy">Therapy Services</option>
                    <option value="app">Mental Health Apps</option>
                    <option value="community">Community Support</option>
                    <option value="inperson">In-Person Services</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Categories */}
          <div className="flex p-4 space-x-2 overflow-x-auto border-b border-slate-700">
            {categories.map(category => (
              <button
                key={category.id}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            {/* Self-Help Techniques Section */}
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Immediate Self-Help Techniques</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {selfHelpTechniques.map(technique => (
                  <motion.div
                    key={technique.id}
                    className="p-4 rounded-lg bg-slate-700"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-center mb-3">{technique.icon}</div>
                    <h3 className="mb-2 text-lg font-medium text-center text-white">{technique.title}</h3>
                    <p className="text-sm text-center text-slate-300">{technique.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Crisis Resources Section */}
            <motion.section
              className="mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="mb-4 text-xl font-semibold text-white">Crisis Support Resources</h2>
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {filteredResources.map(resource => (
                    <motion.div
                      key={resource.id}
                      className="overflow-hidden rounded-lg bg-slate-700"
                      variants={itemVariants}
                    >
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleResourceExpansion(resource.id)}
                      >
                        <div className="flex items-center">
                          {resource.category === 'hotlines' && <Phone className="w-5 h-5 mr-3 text-emerald-500" />}
                          {resource.category === 'centers' && <MapPin className="w-5 h-5 mr-3 text-emerald-500" />}
                          {resource.category === 'immediate' && <AlertTriangle className="w-5 h-5 mr-3 text-red-500" />}
                          {resource.category === 'online' && <Globe className="w-5 h-5 mr-3 text-blue-500" />}
                          {resource.category === 'selfhelp' && <Heart className="w-5 h-5 mr-3 text-purple-500" />}
                          <div>
                            <h3 className="font-medium text-white">{resource.name}</h3>
                            {resource.number && (
                              <p className="text-sm font-semibold text-emerald-400">{resource.number}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            className="p-2 mr-2 rounded-full text-slate-400 hover:bg-slate-600 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(resource.id);
                            }}
                          >
                            <Bookmark className={`w-4 h-4 ${
                              bookmarkedResources.includes(resource.id) ? 'fill-emerald-500 text-emerald-500' : ''
                            }`} />
                          </button>
                          {expandedResource === resource.id ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                      
                      {expandedResource === resource.id && (
                        <motion.div 
                          className="p-4 border-t border-slate-600"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <p className="mb-3 text-slate-300">{resource.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                            {resource.availability && (
                              <div className="flex items-center text-slate-400">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{resource.availability}</span>
                              </div>
                            )}
                            {resource.languages && (
                              <div className="flex items-center text-slate-400">
                                <Globe className="w-4 h-4 mr-1" />
                                <span>{resource.languages.join(', ')}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex mt-4 space-x-2">
                            {resource.website && (
                              <a 
                                href={resource.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Visit Website
                              </a>
                            )}
                            {resource.number && (
                              <a 
                                href={`tel:${resource.number.replace(/\D/g,'')}`}
                                className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                              >
                                <Phone className="w-4 h-4 mr-1" />
                                Call Now
                              </a>
                            )}
                            <button 
                              className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Share functionality would go here
                                alert(`Sharing ${resource.name}`);
                              }}
                            >
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-slate-700">
                  <Info className="w-12 h-12 mb-3 text-slate-500" />
                  <p className="text-center text-slate-400">No resources found matching your criteria. Try adjusting your filters or search terms.</p>
                </div>
              )}
            </motion.section>

            {/* Community Support Section */}
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Community Support</h2>
              <div className="p-6 rounded-lg bg-slate-700">
                <div className="flex flex-col items-center mb-4 md:flex-row md:items-start">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full md:mr-6 md:mb-0 bg-emerald-800">
                    <MessageSquare className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-white">You are Not Alone</h3>
                    <p className="text-slate-300">
                      Connecting with others who understand what you are going through can be incredibly helpful. 
                      In our support community, you can share experiences, find advice, and build meaningful connections.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <a 
                        href="#"
                        className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Community Forums
                      </a>
                      <a 
                        href="#"
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Support Groups
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Local Resources Map (placeholder) */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Local Resources</h2>
                <button 
                  className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </div>
              
              {showMap && (
                <div className="relative overflow-hidden rounded-lg h-80 bg-slate-700">
                  <div className="flex items-center justify-center h-full text-slate-400">
                    {userLocation ? (
                      <>
                        <p>Interactive map would be displayed here with nearby mental health resources</p>
                        {/* In a real app, would integrate with Google Maps or similar */}
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className="mb-2">Enable location services to see resources near you</p>
                        <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700">
                          Enable Location
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Additional Resources and Information */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">Additional Information</h2>
              <div className="p-5 rounded-lg bg-slate-700">
                <h3 className="mb-3 text-lg font-medium text-white">When to Seek Help</h3>
                <p className="mb-4 text-slate-300">
                  It is important to reach out for professional help if you or someone you know is experiencing:
                </p>
                <ul className="mb-6 space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500 shrink-0" />
                    <span>Thoughts of harming yourself or others</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500 shrink-0" />
                    <span>Overwhelming feelings of hopelessness or despair that wont go away</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500 shrink-0" />
                    <span>Inability to perform daily activities or care for yourself</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500 shrink-0" />
                    <span>Extreme mood changes, significant anxiety, or panic attacks</span>
                  </li>
                </ul>

                <h3 className="mb-3 text-lg font-medium text-white">Supporting Someone in Crisis</h3>
                <p className="mb-4 text-slate-300">
                  If you are helping someone who is experiencing a mental health crisis:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 shrink-0" />
                    <span>Stay calm and listen without judgment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 shrink-0" />
                    <span>Take all talk of suicide seriously</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 shrink-0" />
                    <span>Encourage them to seek professional help</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 shrink-0" />
                    <span>Help them contact crisis resources or emergency services if needed</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrisisResourcesPage;