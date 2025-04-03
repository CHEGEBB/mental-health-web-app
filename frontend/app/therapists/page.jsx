"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, MapPin, Star, X, 
  Check, ChevronDown, ChevronUp, Heart, Video, Phone, 
  MessageSquare, Bookmark, BookOpen, Menu, ArrowLeft,
  UserPlus, Zap, Award, Shield, Sliders, Tag
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { format, addDays, isSameDay } from 'date-fns';

const TherapistsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('therapists');
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialties: [],
    acceptingNewPatients: false,
    priceRange: [0, 200],
    rating: 0,
    onlineOnly: false,
    availability: 'any',
    insuranceAccepted: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [bookingState, setBookingState] = useState({
    isBooking: false,
    step: 1,
    selectedDate: null,
    selectedTime: null,
    selectedType: null,
    notes: '',
    confirmed: false
  });

  // List of specialties for filtering
  const specialtyOptions = [
    'Anxiety', 'Depression', 'Trauma', 'Stress Management',
    'Relationship Issues', 'Grief', 'Life Transitions',
    'ADHD', 'Addiction', 'Eating Disorders'
  ];

  // Appointment type options
  const appointmentTypes = [
    { id: 'video', label: 'Video Call', icon: <Video className="w-4 h-4" /> },
    { id: 'phone', label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
    { id: 'chat', label: 'Text Chat', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  // Load mock therapists data
  useEffect(() => {
    const mockTherapists = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        title: "Licensed Clinical Psychologist",
        specialty: ["Anxiety", "Depression", "Trauma"],
        rating: 4.9,
        reviews: 128,
        price: 150,
        image:"/assets/doc1.jpeg" ,
        location: "New York, NY",
        acceptingNewPatients: true,
        onlineOnly: false,
        nextAvailable: "Tomorrow",
        insuranceAccepted: true,
        bio: "Dr. Johnson specializes in helping adults navigate anxiety, depression, and trauma using evidence-based approaches. She creates a warm and supportive environment to help clients build resilience and achieve their goals.",
        experience: "15+ years of clinical experience working with diverse populations. PhD from Columbia University.",
        approach: "Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), Mindfulness-Based Approaches"
      },
      {
        id: 2,
        name: "Michael Reeves, LMFT",
        title: "Licensed Marriage & Family Therapist",
        specialty: ["Relationship Issues", "Grief", "Life Transitions"],
        rating: 4.7,
        reviews: 93,
        price: 120,
        image: "/assets/doc2.jpg",
        location: "Austin, TX",
        acceptingNewPatients: true,
        onlineOnly: true,
        nextAvailable: "Today",
        insuranceAccepted: true,
        bio: "Michael creates a safe space for individuals and couples to explore relationship dynamics, process grief, and navigate life transitions. His approach is compassionate and practical.",
        experience: "10 years of practice specializing in couples therapy and relationship counseling. Masters from University of Texas.",
        approach: "Emotionally-Focused Therapy (EFT), Narrative Therapy, Systemic Approaches"
      },
      {
        id: 3,
        name: "Dr. Amara Patel",
        title: "Psychiatrist, MD",
        specialty: ["ADHD", "Anxiety", "Depression"],
        rating: 4.8,
        reviews: 156,
        price: 200,
        image: "/assets/kapoor.jpg",
        location: "San Francisco, CA",
        acceptingNewPatients: false,
        onlineOnly: false,
        nextAvailable: "Next week",
        insuranceAccepted: true,
        bio: "Dr. Patel combines medication management with holistic approaches to mental health. She believes in addressing both the biological and psychological aspects of mental health conditions.",
        experience: "Board certified psychiatrist with 12 years of practice. MD from Stanford University School of Medicine.",
        approach: "Integrative Psychiatry, Medication Management, Holistic Wellness"
      },
      {
        id: 4,
        name: "James Wilson, LCSW",
        title: "Licensed Clinical Social Worker",
        specialty: ["Addiction", "Trauma", "Stress Management"],
        rating: 4.6,
        reviews: 78,
        price: 95,
        image: "/assets/johnson.jpg",
        location: "Chicago, IL",
        acceptingNewPatients: true,
        onlineOnly: false,
        nextAvailable: "This week",
        insuranceAccepted: false,
        bio: "James specializes in addiction recovery and trauma healing. He uses a strengths-based approach to help clients build coping skills and develop healthier relationships with themselves and others.",
        experience: "8 years working in addiction recovery centers before starting private practice. MSW from University of Chicago.",
        approach: "Motivational Interviewing, Trauma-Informed Care, Harm Reduction"
      },
      {
        id: 5,
        name: "Elena Rodriguez, PhD",
        title: "Clinical Psychologist",
        specialty: ["Eating Disorders", "Body Image", "Depression"],
        rating: 4.9,
        reviews: 112,
        price: 160,
        image: "/assets/doc2.webp",
        location: "Los Angeles, CA",
        acceptingNewPatients: true,
        onlineOnly: true,
        nextAvailable: "Today",
        insuranceAccepted: true,
        bio: "Dr. Rodriguez specializes in eating disorder recovery and body image concerns. She creates a non-judgmental space for clients to explore their relationship with food, body, and self-worth.",
        experience: "12 years of specialized practice in eating disorders. PhD from UCLA with research focus on body image interventions.",
        approach: "Health At Every Size (HAES), Intuitive Eating, CBT for Eating Disorders"
      },
      {
        id: 6,
        name: "Marcus Lee, LPC",
        title: "Licensed Professional Counselor",
        specialty: ["LGBTQ+ Issues", "Life Transitions", "Anxiety"],
        rating: 4.8,
        reviews: 86,
        price: 110,
        image: "/assets/doc.webp",
        location: "Seattle, WA",
        acceptingNewPatients: true,
        onlineOnly: false,
        nextAvailable: "Tomorrow",
        insuranceAccepted: false,
        bio: "Marcus provides affirming therapy for LGBTQ+ individuals and anyone navigating life transitions. He focuses on helping clients develop authentic self-expression and resilience.",
        experience: "9 years of experience working with diverse populations. MSc in Counseling Psychology from Seattle University.",
        approach: "Person-Centered Therapy, Affirmative Therapy, Existential Approaches"
      }
    ];
    
    setTherapists(mockTherapists);
    setFilteredTherapists(mockTherapists);
  }, []);

  // Apply filters and search query to therapists
  useEffect(() => {
    let results = [...therapists];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(therapist => 
        therapist.name.toLowerCase().includes(query) || 
        therapist.specialty.some(s => s.toLowerCase().includes(query)) ||
        therapist.title.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (filters.acceptingNewPatients) {
      results = results.filter(therapist => therapist.acceptingNewPatients);
    }
    
    if (filters.onlineOnly) {
      results = results.filter(therapist => therapist.onlineOnly);
    }
    
    if (filters.insuranceAccepted) {
      results = results.filter(therapist => therapist.insuranceAccepted);
    }
    
    if (filters.rating > 0) {
      results = results.filter(therapist => therapist.rating >= filters.rating);
    }
    
    if (filters.specialties.length > 0) {
      results = results.filter(therapist => 
        filters.specialties.some(s => therapist.specialty.includes(s))
      );
    }
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
      results = results.filter(therapist => 
        therapist.price >= filters.priceRange[0] && 
        therapist.price <= filters.priceRange[1]
      );
    }
    
    setFilteredTherapists(results);
  }, [therapists, searchQuery, filters]);

  // Toggle specialty in filters
  const toggleSpecialty = (specialty) => {
    if (filters.specialties.includes(specialty)) {
      setFilters({
        ...filters,
        specialties: filters.specialties.filter(s => s !== specialty)
      });
    } else {
      setFilters({
        ...filters,
        specialties: [...filters.specialties, specialty]
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      specialties: [],
      acceptingNewPatients: false,
      priceRange: [0, 200],
      rating: 0,
      onlineOnly: false,
      availability: 'any',
      insuranceAccepted: false
    });
    setSearchQuery('');
  };

  // Open therapist profile
  const openTherapistProfile = (therapist) => {
    setSelectedTherapist(therapist);
    setBookingState({
      isBooking: false,
      step: 1,
      selectedDate: null,
      selectedTime: null,
      selectedType: null,
      notes: '',
      confirmed: false
    });
  };

  // Close therapist profile
  const closeTherapistProfile = () => {
    setSelectedTherapist(null);
  };

  // Start booking process
  const startBooking = () => {
    setBookingState({
      ...bookingState,
      isBooking: true,
      step: 1,
      selectedDate: null,
      selectedTime: null,
      selectedType: null,
      notes: '',
      confirmed: false
    });
  };

  // Handle date selection
  const selectDate = (date) => {
    setBookingState({
      ...bookingState,
      selectedDate: date
    });
  };

  // Handle time selection
  const selectTime = (time) => {
    setBookingState({
      ...bookingState,
      selectedTime: time
    });
  };

  // Handle appointment type selection
  const selectAppointmentType = (type) => {
    setBookingState({
      ...bookingState,
      selectedType: type
    });
  };

  // Move to next booking step
  const nextBookingStep = () => {
    if (bookingState.step < 3) {
      setBookingState({
        ...bookingState,
        step: bookingState.step + 1
      });
    }
  };

  // Move to previous booking step
  const prevBookingStep = () => {
    if (bookingState.step > 1) {
      setBookingState({
        ...bookingState,
        step: bookingState.step - 1
      });
    } else {
      setBookingState({
        ...bookingState,
        isBooking: false
      });
    }
  };

  // Confirm booking
  const confirmBooking = () => {
    setBookingState({
      ...bookingState,
      confirmed: true
    });
    
    // In a real app, you would send the booking data to your API here
    console.log('Booking confirmed:', {
      therapistId: selectedTherapist.id,
      date: bookingState.selectedDate,
      time: bookingState.selectedTime,
      type: bookingState.selectedType,
      notes: bookingState.notes
    });
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  // Get mock available times for selected date
  const getAvailableTimes = () => {
    const times = [];
    // Generate different times based on day of week for variety
    const dayOfWeek = bookingState.selectedDate ? bookingState.selectedDate.getDay() : 0;
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend hours
      const startHour = 10;
      for (let i = 0; i < 4; i++) {
        times.push(`${startHour + i}:00`);
      }
    } else {
      // Weekday hours
      const startHour = 9;
      for (let i = 0; i < 7; i++) {
        if (i !== 2) { // Skip lunch hour
          times.push(`${startHour + i}:00`);
        }
      }
    }
    
    return times;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
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

  const slideInVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-400" />);
      }
    }
    
    return stars;
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
            <h1 className="text-xl font-semibold text-slate-100">Therapist Connection</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-1" /> 
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button 
              className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
            >
              <BookOpen className="w-4 h-4 mr-1" /> 
              My Appointments
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="relative flex flex-1 overflow-hidden bg-slate-800">
          <AnimatePresence>
            {selectedTherapist && (
              <motion.div 
                className="absolute top-0 right-0 z-30 w-full h-full overflow-y-auto bg-slate-800 md:w-2/3 lg:w-1/2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInVariants}
              >
                {bookingState.isBooking ? (
                  <div className="h-full">
                    {/* Booking Flow */}
                    <div className="flex flex-col h-full">
                      {/* Booking Header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <button 
                          className="flex items-center text-slate-300 hover:text-white"
                          onClick={prevBookingStep}
                        >
                          <ArrowLeft className="w-5 h-5 mr-1" />
                          {bookingState.step > 1 ? 'Back' : 'Cancel'}
                        </button>
                        <div className="text-lg font-semibold text-white">
                          {bookingState.confirmed ? 'Appointment Confirmed' : `Book with ${selectedTherapist.name}`}
                        </div>
                        <div className="w-6"></div> {/* Spacer for alignment */}
                      </div>

                      {/* Booking Content */}
                      <div className="flex-1 p-4 overflow-y-auto">
                        {bookingState.confirmed ? (
                          <motion.div 
                            className="flex flex-col items-center justify-center h-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          >
                            <div className="p-3 mb-6 rounded-full bg-emerald-600">
                              <Check className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-white">Appointment Confirmed!</h2>
                            <p className="mb-6 text-center text-slate-300">
                              You're scheduled with {selectedTherapist.name} on {format(bookingState.selectedDate, 'EEEE, MMMM d, yyyy')} at {bookingState.selectedTime}.
                            </p>
                            <div className="p-4 mb-6 rounded-lg bg-slate-700">
                              <div className="flex items-center mb-3">
                                <div className="p-2 mr-3 rounded-full bg-slate-600">
                                  {appointmentTypes.find(t => t.id === bookingState.selectedType)?.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-white">
                                    {appointmentTypes.find(t => t.id === bookingState.selectedType)?.label} with {selectedTherapist.name}
                                  </div>
                                  <div className="text-sm text-slate-400">
                                    {format(bookingState.selectedDate, 'EEE, MMM d')} • {bookingState.selectedTime}
                                  </div>
                                </div>
                              </div>
                              <div className="px-3 py-2 text-sm rounded bg-slate-600 text-slate-300">
                                <div className="mb-1 font-medium text-white">How to prepare:</div>
                                <p>Find a quiet, private space for your session. Have a notebook ready to write down insights. Think about what you'd like to focus on during your time together.</p>
                              </div>
                            </div>
                            <div className="flex space-x-3">
                              <button className="px-4 py-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600">
                                Add to Calendar
                              </button>
                              <button 
                                className="px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                                onClick={closeTherapistProfile}
                              >
                                Done
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            {/* Step indicator */}
                            <div className="flex items-center justify-center mb-6">
                              <div className={`flex items-center justify-center w-8 h-8 font-medium rounded-full ${bookingState.step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}>1</div>
                              <div className={`w-12 h-1 ${bookingState.step >= 2 ? 'bg-emerald-600' : 'bg-slate-700'}`}></div>
                              <div className={`flex items-center justify-center w-8 h-8 font-medium rounded-full ${bookingState.step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}>2</div>
                              <div className={`w-12 h-1 ${bookingState.step >= 3 ? 'bg-emerald-600' : 'bg-slate-700'}`}></div>
                              <div className={`flex items-center justify-center w-8 h-8 font-medium rounded-full ${bookingState.step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}>3</div>
                            </div>

                            {bookingState.step === 1 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <h2 className="mb-4 text-lg font-semibold text-white">Select a date</h2>
                                <div className="flex flex-wrap gap-3 mb-8">
                                  {getAvailableDates().map((date, index) => (
                                    <motion.button
                                      key={index}
                                      className={`p-3 rounded-lg transition-colors ${
                                        bookingState.selectedDate && isSameDay(bookingState.selectedDate, date)
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                      }`}
                                      onClick={() => selectDate(date)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <div className="text-sm font-medium">
                                        {format(date, 'EEE')}
                                      </div>
                                      <div className="text-xl font-semibold">
                                        {format(date, 'd')}
                                      </div>
                                      <div className="text-xs">
                                        {format(date, 'MMM')}
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>

                                <div className="flex justify-end mt-8">
                                  <motion.button
                                    className={`px-6 py-2 text-white rounded-md ${
                                      bookingState.selectedDate 
                                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                                        : 'bg-slate-700 cursor-not-allowed'
                                    }`}
                                    onClick={bookingState.selectedDate ? nextBookingStep : undefined}
                                    whileHover={bookingState.selectedDate ? { scale: 1.05 } : {}}
                                    whileTap={bookingState.selectedDate ? { scale: 0.95 } : {}}
                                  >
                                    Continue
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}

                            {bookingState.step === 2 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <h2 className="mb-4 text-lg font-semibold text-white">Select a time slot</h2>
                                <p className="mb-4 text-slate-300">
                                  {format(bookingState.selectedDate, 'EEEE, MMMM d, yyyy')}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-3">
                                  {getAvailableTimes().map((time, index) => (
                                    <motion.button
                                      key={index}
                                      className={`p-3 text-center rounded-lg transition-colors ${
                                        bookingState.selectedTime === time
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                      }`}
                                      onClick={() => selectTime(time)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {time}
                                    </motion.button>
                                  ))}
                                </div>

                                <div className="flex justify-end mt-8">
                                  <motion.button
                                    className={`px-6 py-2 text-white rounded-md ${
                                      bookingState.selectedTime 
                                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                                        : 'bg-slate-700 cursor-not-allowed'
                                    }`}
                                    onClick={bookingState.selectedTime ? nextBookingStep : undefined}
                                    whileHover={bookingState.selectedTime ? { scale: 1.05 } : {}}
                                    whileTap={bookingState.selectedTime ? { scale: 0.95 } : {}}
                                  >
                                    Continue
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}

                            {bookingState.step === 3 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <h2 className="mb-4 text-lg font-semibold text-white">Appointment Details</h2>
                                
                                <div className="p-4 mb-6 rounded-lg bg-slate-700">
                                  <h3 className="mb-3 text-white">Select appointment type</h3>
                                  <div className="flex flex-wrap gap-3 mb-4">
                                    {appointmentTypes.map((type) => (
                                      <motion.button
                                        key={type.id}
                                        className={`flex items-center px-4 py-2 rounded-lg ${
                                          bookingState.selectedType === type.id
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                                        }`}
                                        onClick={() => selectAppointmentType(type.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <span className="mr-2">{type.icon}</span>
                                        {type.label}
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-4 mb-6 rounded-lg bg-slate-700">
                                  <h3 className="mb-3 text-white">Appointment summary</h3>
                                  <div className="p-3 mb-3 rounded bg-slate-600">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="font-medium text-white">Date & Time</div>
                                      <div className="text-slate-300">
                                        {format(bookingState.selectedDate, 'EEE, MMM d')} • {bookingState.selectedTime}
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-white">Fee</div>
                                      <div className="text-slate-300">${selectedTherapist.price}</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 mb-6 rounded-lg bg-slate-700">
                                  <h3 className="mb-3 text-white">Notes for therapist (optional)</h3>
                                  <textarea
                                    className="w-full p-3 rounded bg-slate-600 text-slate-100 placeholder:text-slate-400"
                                    placeholder="Let your therapist know what you'd like to discuss..."
                                    rows={4}
                                    value={bookingState.notes}
                                    onChange={(e) => setBookingState({...bookingState, notes: e.target.value})}
                                  />
                                </div>

                                <div className="flex justify-end mt-8">
                                  <motion.button
                                    className={`px-6 py-2 text-white rounded-md ${
                                      bookingState.selectedType 
                                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                                        : 'bg-slate-700 cursor-not-allowed'
                                    }`}
                                    onClick={bookingState.selectedType ? confirmBooking : undefined}
                                    whileHover={bookingState.selectedType ? { scale: 1.05 } : {}}
                                    whileTap={bookingState.selectedType ? { scale: 0.95 } : {}}
                                  >
                                    Confirm Booking
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    {/* Therapist Profile */}
                    <div className="flex flex-col h-full">
                      {/* Profile Header */}
                      <div className="relative p-6 bg-slate-700">
                        <button 
                          className="absolute p-1 rounded-full top-4 right-4 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                          onClick={closeTherapistProfile}
                        >
                          <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex flex-col items-center mb-4 md:flex-row md:items-start">
                          <img 
                            src={selectedTherapist.image} 
                            alt={selectedTherapist.name}
                            className="object-cover w-24 h-24 mb-4 rounded-full md:mb-0 md:mr-6"
                          />
                          <div className="text-center md:text-left">
                            <h2 className="text-xl font-semibold text-white">{selectedTherapist.name}</h2>
                            <p className="text-slate-300">{selectedTherapist.title}</p>
                            <div className="flex items-center justify-center mt-2 mb-1 md:justify-start">
                              {renderStars(selectedTherapist.rating)}
                              <span className="ml-2 text-slate-300">{selectedTherapist.rating} ({selectedTherapist.reviews} reviews)</span>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                              <div className="flex items-center px-2 py-1 text-sm rounded-full bg-slate-600 text-slate-300">
                                <MapPin className="w-3 h-3 mr-1" /> {selectedTherapist.location}
                              </div>
                              <div className="flex items-center px-2 py-1 text-sm rounded-full bg-slate-600 text-slate-300">
                                <Clock className="w-3 h-3 mr-1" /> Available {selectedTherapist.nextAvailable}
                              </div>
                              {selectedTherapist.insuranceAccepted && (
                                <div className="flex items-center px-2 py-1 text-sm rounded-full bg-slate-600 text-slate-300">
                                  <Shield className="w-3 h-3 mr-1" /> Insurance accepted
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button 
                            className="flex-1 px-4 py-2 text-white rounded-md bg-emerald-600 hover:bg-emerald-700"
                            onClick={startBooking}
                          >
                            Book Appointment
                          </button>
                          <button className="flex items-center justify-center flex-1 px-4 py-2 rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500">
                            <MessageSquare className="w-4 h-4 mr-2" /> Message
                          </button>
                          <button className="flex items-center justify-center flex-1 px-4 py-2 rounded-md bg-slate-600 text-slate-300 hover:bg-slate-500">
                            <Bookmark className="w-4 h-4 mr-2" /> Save
                          </button>
                        </div>
                      </div>

                      {/* Profile Content */}
                      <div className="flex-1 p-6 overflow-y-auto">
                        <div className="mb-6">
                          <h3 className="mb-3 text-lg font-semibold text-white">About</h3>
                          <p className="text-slate-300">{selectedTherapist.bio}</p>
                        </div>
                        
                        <div className="p-4 mb-6 rounded-lg bg-slate-700">
                          <h3 className="mb-3 text-white">Specialties</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedTherapist.specialty.map((specialty, index) => (
                              <div 
                                key={index} 
                                className="px-3 py-1 text-sm rounded-full bg-slate-600 text-slate-300"
                              >
                                {specialty}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="mb-3 text-lg font-semibold text-white">Experience</h3>
                          <p className="text-slate-300">{selectedTherapist.experience}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="mb-3 text-lg font-semibold text-white">Approach</h3>
                          <p className="text-slate-300">{selectedTherapist.approach}</p>
                        </div>
                        
                        <div className="p-4 mb-6 rounded-lg bg-slate-700">
                          <h3 className="mb-3 text-white">Session Information</h3>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="p-3 rounded bg-slate-600">
                              <div className="mb-1 font-medium text-white">Session Fee</div>
                              <div className="text-slate-300">${selectedTherapist.price} per session</div>
                            </div>
                            <div className="p-3 rounded bg-slate-600">
                              <div className="mb-1 font-medium text-white">Session Length</div>
                              <div className="text-slate-300">50 minutes</div>
                            </div>
                            <div className="p-3 rounded bg-slate-600">
                              <div className="mb-1 font-medium text-white">Languages</div>
                              <div className="text-slate-300">English</div>
                            </div>
                            <div className="p-3 rounded bg-slate-600">
                              <div className="mb-1 font-medium text-white">Age Groups</div>
                              <div className="text-slate-300">Adults (18+)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Therapist Listings */}
          <div className={`relative flex-1 h-full overflow-hidden ${selectedTherapist ? 'hidden md:block md:flex-1' : 'flex-1'}`}>
            {/* Search and Filters */}
            <div className="sticky top-0 z-10 p-4 shadow-md bg-slate-800">
              <div className="relative">
                <Search className="absolute w-5 h-5 translate-y-1/2 left-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search therapists, specialties..."
                  className="w-full py-2 pl-10 pr-4 rounded-md bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-white">Filters</h3>
                        <button 
                          className="text-sm text-slate-400 hover:text-white"
                          onClick={resetFilters}
                        >
                          Reset all
                        </button>
                      </div>
                      
                      {/* Filter options */}
                      <div className="space-y-4">
                        {/* Specialties */}
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-slate-300">Specialties</h4>
                          <div className="flex flex-wrap gap-2">
                            {specialtyOptions.map((specialty, index) => (
                              <button
                                key={index}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                  filters.specialties.includes(specialty)
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                                }`}
                                onClick={() => toggleSpecialty(specialty)}
                              >
                                {specialty}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Quick filters */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          <label className="flex items-center p-2 rounded cursor-pointer bg-slate-600 hover:bg-slate-500">
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-emerald-500"
                              checked={filters.acceptingNewPatients}
                              onChange={(e) => setFilters({...filters, acceptingNewPatients: e.target.checked})}
                            />
                            <span className="ml-2 text-sm text-slate-300">Accepting new patients</span>
                          </label>
                          <label className="flex items-center p-2 rounded cursor-pointer bg-slate-600 hover:bg-slate-500">
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-emerald-500"
                              checked={filters.onlineOnly}
                              onChange={(e) => setFilters({...filters, onlineOnly: e.target.checked})}
                            />
                            <span className="ml-2 text-sm text-slate-300">Online only</span>
                          </label>
                          <label className="flex items-center p-2 rounded cursor-pointer bg-slate-600 hover:bg-slate-500">
                            <input
                              type="checkbox"
                              className="w-4 h-4 accent-emerald-500"
                              checked={filters.insuranceAccepted}
                              onChange={(e) => setFilters({...filters, insuranceAccepted: e.target.checked})}
                            />
                            <span className="ml-2 text-sm text-slate-300">Insurance accepted</span>
                          </label>
                        </div>
                        
                        {/* Price Range */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-slate-300">Price Range</h4>
                            <span className="text-sm text-slate-400">
                              ${filters.priceRange[0]} - ${filters.priceRange[1]}
                            </span>
                          </div>
                          {/* Note: In a real app, you would implement a proper range slider here */}
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="0" 
                              max="200" 
                              value={filters.priceRange[1]} 
                              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 bg-slate-600" 
                              onChange={(e) => setFilters({
                                ...filters, 
                                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Therapist List */}
            <div className="h-full p-4 overflow-y-auto">
              {filteredTherapists.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Search className="w-12 h-12 mb-4 text-slate-500" />
                  <h3 className="mb-2 text-lg font-medium text-white">No therapists found</h3>
                  <p className="text-center text-slate-400">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <motion.div
                  className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredTherapists.map((therapist) => (
                    <motion.div
                      key={therapist.id}
                      className="overflow-hidden transition-shadow rounded-lg cursor-pointer bg-slate-700 hover:shadow-lg"
                      variants={itemVariants}
                      onClick={() => openTherapistProfile(therapist)}
                    >
                      <div className="relative">
                        <img 
                          src={therapist.image} 
                          alt={therapist.name}
                          className="object-cover w-full h-48"
                        />
                        <div className="absolute bottom-0 w-full p-2 text-white bg-gradient-to-t from-slate-900/90 to-transparent">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {renderStars(therapist.rating)}
                              <span className="ml-1 text-sm">{therapist.rating}</span>
                            </div>
                            <div className="flex">
                              {therapist.acceptingNewPatients && (
                                <div className="px-2 py-0.5 text-xs rounded-full bg-emerald-600">
                                  Accepting
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 text-lg font-semibold text-white">{therapist.name}</h3>
                        <p className="text-sm text-slate-400">{therapist.title}</p>
                        <div className="flex flex-wrap gap-1 mt-2 mb-3">
                          {therapist.specialty.slice(0, 3).map((specialty, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-0.5 text-xs rounded-full bg-slate-600 text-slate-300"
                            >
                              {specialty}
                            </span>
                          ))}
                          {therapist.specialty.length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-600 text-slate-300">
                              +{therapist.specialty.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center text-slate-400">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{therapist.location}</span>
                          </div>
                          <div className="font-medium text-white">${therapist.price}</div>
                        </div>
                        <div className="flex items-center mt-2 text-slate-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">Available {therapist.nextAvailable}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TherapistsPage;