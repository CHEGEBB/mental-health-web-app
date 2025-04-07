"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "../services/api";
import Head from "next/head";

export default function AuthScreen() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState("signup");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  });

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

  // Add effect to check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const adminToken = localStorage.getItem('adminToken');
    
    if (token && user) {
      router.push("/dashboard");
    } else if (adminToken) {
      router.push("/admin");
    }
  }, [router]);

  // Password strength checker
  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength({ score: 0, feedback: "" });
      return;
    }

    // Basic strength checks
    let score = 0;
    let feedback = "";

    if (pass.length < 8) {
      feedback = "Password is too short";
    } else {
      score += 1;
    }

    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 3 && !feedback) {
      feedback = "Consider adding numbers, symbols, or mixed case letters";
    } else if (score >= 3 && score < 5) {
      feedback = "Good password";
    } else if (score === 5) {
      feedback = "Strong password";
    }

    setPasswordStrength({ score, feedback });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading || disableButton) return;
    
    setIsLoading(true);
    setDisableButton(true);
    setError("");

    try {
      let response;
      
      // Handle admin login
      if (isAdminLogin) {
        // Admin credentials check - hardcoded for this example
        if (email === "admin@mindharmony.com" && password === "admin1234") {
          // Set admin token in localStorage
          localStorage.setItem('adminToken', 'admin-jwt-token-example');
          localStorage.setItem('adminUser', JSON.stringify({
            id: "admin_1",
            name: "Admin",
            email: "admin@mindharmony.com"
          }));
          
          router.push("/admin");
          return;
        } else {
          throw new Error("Invalid admin credentials");
        }
      }
      
      // Regular user flow
      if (authMode === "signup") {
        // Password strength validation
        if (passwordStrength.score < 3) {
          throw new Error("Please create a stronger password: " + passwordStrength.feedback);
        }
        
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
        // Fix login params - use email field as API expects
        const loginPromise = authService.login({
          email: username, // This field should accept either email or username
          password
        });
        
        // Add timeout to handle potential API issues
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out. Please try again.")), 100000);
        });
        
        response = await Promise.race([loginPromise, timeoutPromise]);
        
        if (!response || !response.token) {
          throw new Error("Invalid response from server");
        }
        
        // Store token and user info - use localStorage for persistence between sessions
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response._id,
          name: response.name,
          email: response.email
        }));

        // Use router.push without shallow for complete page refresh
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
      // Add slight delay before re-enabling button to prevent accidental double-clicks
      setTimeout(() => setDisableButton(false), 500);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signup" ? "signin" : "signup");
    setIsAdminLogin(false);
    setError("");
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setAuthMode("signin");
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getStrengthColor = () => {
    const { score } = passwordStrength;
    if (score <= 1) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    return "bg-green-500";
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
              className={`p-6 shadow-xl sm:p-8 ${isAdminLogin ? 'bg-slate-800' : 'bg-slate-700'} rounded-xl backdrop-blur-sm bg-opacity-95`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {isAdminLogin ? (
                <div className="mb-6">
                  <div className="flex items-center justify-center p-2 mb-4 border border-purple-500 border-dashed rounded-md bg-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-purple-300">Admin Portal</span>
                  </div>
                  <h2 className="mb-1 text-2xl font-bold text-center text-white">Administrator Login</h2>
                  <p className="text-sm text-center text-slate-400">Access the admin control panel</p>
                </div>
              ) : (
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
              )}

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
                  key={`${authMode}-${isAdminLogin}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {authMode === "signup" && !isAdminLogin && (
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
                      {isAdminLogin 
                        ? "Admin Email" 
                        : (authMode === "signup" ? "Username" : "Email")}
                    </label>
                    <input
                      type={isAdminLogin || authMode === "signin" ? "email" : "text"}
                      required
                      value={isAdminLogin ? email : username}
                      onChange={(e) => isAdminLogin ? setEmail(e.target.value) : setUsername(e.target.value)}
                      className={`w-full px-4 py-3 transition-all duration-300 border rounded-lg 
                        ${isAdminLogin 
                          ? "bg-slate-900 border-purple-600 focus:ring-purple-500" 
                          : "bg-slate-800 border-slate-600 focus:ring-emerald-500"
                        } 
                        text-slate-200 focus:outline-none focus:ring-2 focus:border-transparent placeholder-slate-500`}
                      placeholder={isAdminLogin 
                        ? "admin@mindharmony.com" 
                        : (authMode === "signup" ? "johndoe" : "your@email.com")}
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
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-3 transition-all duration-300 border rounded-lg 
                          ${isAdminLogin 
                            ? "bg-slate-900 border-purple-600 focus:ring-purple-500" 
                            : "bg-slate-800 border-slate-600 focus:ring-emerald-500"
                          } 
                          text-slate-200 focus:outline-none focus:ring-2 focus:border-transparent placeholder-slate-500`}
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

                    {/* Password strength meter (only display during signup) */}
                    {authMode === "signup" && !isAdminLogin && password && (
                      <div className="mt-2">
                        <div className="flex h-1 overflow-hidden rounded bg-slate-600">
                          <div 
                            className={`${getStrengthColor()} transition-all duration-300`} 
                            style={{ width: `${passwordStrength.score * 20}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                          {passwordStrength.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || disableButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center w-full px-4 py-3 text-white transition-all duration-300 rounded-lg shadow-md ${
                      isLoading || disableButton 
                        ? "bg-slate-500 cursor-not-allowed" 
                        : isAdminLogin
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg"
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
                    {isAdminLogin 
                      ? "Admin Login" 
                      : (authMode === "signup" ? "Create Account" : "Sign In")}
                  </motion.button>

                  <div className="mt-4 text-sm text-center text-slate-300">
                    {isAdminLogin ? (
                      <button
                        type="button"
                        onClick={toggleAdminLogin}
                        className="font-medium text-purple-300 transition-colors hover:text-purple-400"
                      >
                        Back to User Login
                      </button>
                    ) : (
                      <>
                        {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                          type="button"
                          onClick={toggleAuthMode}
                          className="font-medium transition-colors text-emerald-300 hover:text-emerald-400"
                        >
                          {authMode === "signup" ? "Sign In" : "Sign Up"}
                        </button>
                      </>
                    )}
                  </div>
                </motion.form>
              </AnimatePresence>

              {/* Admin login toggle (only show on signin screen) */}
              {!isAdminLogin && authMode === "signin" && (
                <div className="pt-4 mt-4 text-xs text-center border-t border-slate-600">
                  <button
                    onClick={toggleAdminLogin}
                    className="inline-flex items-center font-medium transition-colors text-slate-400 hover:text-purple-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Administrator Access
                  </button>
                </div>
              )}
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