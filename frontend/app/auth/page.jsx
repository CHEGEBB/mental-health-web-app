"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "../services/api";
import Head from "next/head";

export default function AuthScreen() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const mentalHealthQuotes = [
    "Your mental health is a priority. Your happiness is essential.",
    "Self-care isn't selfish, it's necessary.",
    "Healing takes time, and asking for help is a strength.",
    "Mind Harmony - Your partner in mental wellness.",
    "Every day is a new opportunity to grow and heal.",
  ];

  const bgImages = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=1000",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000",
    "https://images.unsplash.com/photo-1499810631641-541e76d678a2?q=80&w=1000",
  ];

  // Memoize the quote cycling to prevent unnecessary rerenders
  const cycleQuotes = useCallback(() => {
    setCurrentQuote((prev) => (prev + 1) % mentalHealthQuotes.length);
  }, [mentalHealthQuotes.length]);

  useEffect(() => {
    // Pre-load images for smoother transitions
    bgImages.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    const quoteInterval = setInterval(cycleQuotes, 5000);
    return () => clearInterval(quoteInterval);
  }, [bgImages, cycleQuotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading || disableButton) return;
    
    setIsLoading(true);
    setDisableButton(true);
    setError("");

    try {
      let response;
      
      if (authMode === "signup") {
        response = await authService.register({
          name: username,
          email,
          password
        });
        
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setAuthMode("signin");
          setPassword("");
        }, 2000);
        
      } else {
        // Optimize login by using a promise with timeout to prevent UI freeze
        const loginPromise = authService.login({
          email: username,
          password
        });
        
        // Add timeout to handle potential API issues
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out. Please try again.")), 10000);
        });
        
        response = await Promise.race([loginPromise, timeoutPromise]);
        
        // Store token and user info - use sessionStorage for better security
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify({
          id: response._id,
          name: response.name,
          email: response.email
        }));

        // Use shallow routing for faster navigation
        router.push("/dashboard", { shallow: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
      // Add slight delay before re-enabling button to prevent accidental double-clicks
      setTimeout(() => setDisableButton(false), 500);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signup" ? "signin" : "signup");
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="flex flex-col w-full h-screen overflow-hidden md:flex-row bg-slate-800 font-[Poppins]">
        {/* Left Side - Auth Form */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center w-full p-4 sm:p-6 md:w-1/2 lg:p-8"
        >
          <div className="w-full max-w-md">
            <div className="mb-6 text-center md:mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"  
                }}
              >
                <h1 className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text">
                  Mind<span className="font-light">Harmony</span>
                </h1>
              </motion.div>
              <p className="mt-2 text-slate-300">Your journey to mental wellness begins here</p>
            </div>

            <motion.div 
              className="p-6 shadow-xl sm:p-8 bg-slate-700 rounded-xl backdrop-blur-sm bg-opacity-95"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex mb-6">
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`w-1/2 py-2 text-center transition-all duration-300 ${
                    authMode === "signup"
                      ? "text-emerald-300 border-b-2 border-emerald-400 font-medium"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setAuthMode("signin")}
                  className={`w-1/2 py-2 text-center transition-all duration-300 ${
                    authMode === "signin"
                      ? "text-emerald-300 border-b-2 border-emerald-400 font-medium"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center p-3 mb-4 text-sm rounded-lg text-emerald-800 bg-emerald-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Account created successfully!
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.form
                  key={authMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {authMode === "signup" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block mb-1 text-sm font-medium text-slate-300">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 transition-all duration-300 border rounded-lg bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  )}

                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">
                      {authMode === "signup" ? "Username" : "Email or Username"}
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 transition-all duration-300 border rounded-lg bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
                      placeholder={authMode === "signup" ? "johndoe" : "your@email.com"}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 transition-all duration-300 border rounded-lg bg-slate-800 text-slate-200 border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors text-slate-400 hover:text-slate-300"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || disableButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center w-full px-4 py-3 text-white transition-all duration-300 rounded-lg shadow-md ${
                      isLoading || disableButton 
                        ? "bg-slate-500 cursor-not-allowed" 
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg"
                    }`}
                  >
                    {isLoading ? (
                      <svg className="w-5 h-5 mr-2 text-white animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {authMode === "signup" ? "Create Account" : "Sign In"}
                  </motion.button>

                  <div className="mt-4 text-sm text-center text-slate-300">
                    {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="font-medium transition-colors text-emerald-300 hover:text-emerald-400"
                    >
                      {authMode === "signup" ? "Sign In" : "Sign Up"}
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </motion.div>

            <div className="mt-4 text-xs text-center sm:mt-6 sm:text-sm text-slate-500">
              © 2025 MindHarmony. All rights reserved.
            </div>
          </div>
        </motion.div>

        {/* Right Side - Background Image and Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden w-1/2 overflow-hidden md:block"
        >
          {bgImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-center bg-cover"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentQuote % bgImages.length ? 1 : 0 
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ backgroundImage: `url(${img})` }}
            ></motion.div>
          ))}
          
          <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h2 
                  className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl"
                  initial={{ scale: 0.95 }}
                  animate={{ 
                    scale: 1,
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                >
                  {mentalHealthQuotes[currentQuote]}
                </motion.h2>
                <p className="max-w-md mx-auto text-lg text-emerald-100">
                  Join thousands of people who have found peace and balance with MindHarmony.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12">
              <div className="flex justify-center space-x-2">
                {mentalHealthQuotes.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      currentQuote === index ? "bg-white w-6" : "bg-white/40 w-2"
                    }`}
                    onClick={() => setCurrentQuote(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`View quote ${index + 1}`}
                  ></motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}