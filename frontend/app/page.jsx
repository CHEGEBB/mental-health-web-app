"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "./components/footer";
import "./sass/_fonts.scss";

const heroImage = "/assets/2.jpg";
const logoIcon = "/assets/fluent--brain-circuit-20-filled.svg";
const aboutImage = "/assets/Image-3.png";
const facebookIcon = "/assets/line-md--facebook.svg";
const twitterIcon = "/assets/line-md--twitter-x.svg";
const instagramIcon = "/assets/line-md--instagram.svg";
const linkedInIcon = "/assets/line-md--linkedin.svg";
const emailIcon = "/assets/line-md--email-twotone-alt.svg";
const phoneIcon = "/assets/line-md--phone-add-twotone.svg";

// Icons for services
const therapyIcon = "/assets/therapy.svg";
const meditationIcon = "/assets/mentalexe.svg";
const WorkshopsIcon = "/assets/groupcon.svg";
const supportIcon = "/assets/groups.svg";

// Service data
const services = [
  {
    id: 1,
    title: "Individual Therapy",
    details: "Personalized sessions focused on your unique needs and goals for mental wellness.",
    icon: therapyIcon,
    imageAlt: "Therapy Icon"
  },
  {
    id: 2,
    title: "Meditation & Mindfulness",
    details: "Learn techniques to calm your mind and develop greater awareness of your thoughts and emotions.",
    icon: meditationIcon,
    imageAlt: "Meditation Icon"
  },
  {
    id: 3,
    title: "Wellness Workshops",
    details: "Group sessions exploring mental health topics and providing practical coping strategies.",
    icon: WorkshopsIcon,
    imageAlt: "Workshops Icon"
  },
  {
    id: 4,
    title: "Support Groups",
    details: "Connect with others facing similar challenges in a safe, supportive environment.",
    icon: supportIcon,
    imageAlt: "Support Icon"
  }
];

// Custom Card Component
const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-xl font-bold text-slate-800 ${className}`}>{children}</h3>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
};

// Custom Button Component
const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-medium rounded-md focus:outline-none transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ChevronDown Icon Component
const ChevronDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ParallaxSection = ({ children, backgroundUrl, speed = 0.5, height = "100vh", overlay = "bg-gradient-to-r from-slate-900/80 to-emerald-900/60", className = "" }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, height * speed]);
  
  return (
    <div className={`relative overflow-hidden ${height} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          y,
          backgroundAttachment: "fixed"
        }}
      />
      <div className={`absolute inset-0 ${overlay}`}></div>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// Glass Card Component
const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef(null);
  
  // For sections parallax effect
  const servicesY = useTransform(scrollY, [0, 1000], [0, -150]);
  const aboutY = useTransform(scrollY, [500, 1500], [0, -150]);
  const contactY = useTransform(scrollY, [1000, 2000], [0, -150]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headerBgY = useTransform(scrollY, [0, 500], [0, 200]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Floating particles for hero section
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: Math.random() * 20 + 10
  }));

  return (
    <main ref={mainRef} className="w-full space-y-0 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header/Hero Section with Advanced Parallax Effect */}
      <div className="relative h-screen overflow-hidden" ref={heroRef}>
        <motion.div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${heroImage})`,
            y: headerBgY,
            backgroundAttachment: "fixed",
            scale: 1.2
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-emerald-900/50"
          style={{ opacity: headerOpacity }}
        ></motion.div>
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [
                0,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                0
              ],
              y: [
                0,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                0
              ],
              opacity: [0.4, 0.8, 0.4, 0.8, 0.4]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="container flex items-center justify-between px-4 py-5 mx-auto"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <GlassCard className="p-2">
                <Image
                  src={logoIcon}
                  alt="MindHarmony Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </GlassCard>
              <h3 className="text-2xl font-bold text-white">MindHarmony</h3>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden space-x-8 md:flex">
              {["Home", "About", "Services", "Contact", "Sign In | Sign Up"].map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === "Home"
                      ? "/"
                      : item === "Sign In | Sign Up"
                      ? "/auth"
                      : `#${item.toLowerCase()}`
                  }
                  className="relative font-medium text-white group"
                >
                  <span className="block transition-colors duration-300 group-hover:text-emerald-400">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <GlassCard className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </GlassCard>
            </button>
          </motion.div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden backdrop-blur-lg bg-slate-900/80"
              >
                <div className="container px-4 py-3 mx-auto">
                  <nav className="flex flex-col space-y-4">
                    {["Home", "About", "Services", "Contact", "Sign In | Sign Up"].map((item, index) => (
                      <Link
                        key={index}
                        href={
                          item === "Home"
                            ? "/"
                            : item === "Sign In | Sign Up"
                            ? "/auth"
                            : `#${item.toLowerCase()}`
                        }
                        className="py-2 text-white border-b border-white/20"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ y: contentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-3xl px-4 mx-auto text-center"
          >
            <div className="p-8 mb-8">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl ">
                MindHarmony
              </h1>
              <h2 className="mb-8 text-xl text-slate-100 md:text-2xl">
                Embark on a journey to mental well-being
              </h2>
              
              <div className="relative w-full h-1 max-w-md mx-auto mb-8 rounded-full bg-emerald-400">
                <motion.div
                  animate={{
                    scaleX: [0, 1, 0.5, 1],
                    x: ['-100%', '0%', '50%', '0%']
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 5, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 rounded-full bg-sky-400"
                />
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlassCard className="inline-block">
                <Button className="flex items-center px-8 py-3 space-x-2 text-lg font-bold text-white transition-all duration-300 rounded-full hover:bg-white/20">
                  <span>Learn More</span>
                  <ChevronDownIcon />
                </Button>
              </GlassCard>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
        </motion.div>
      </div>

      {/* Services Section with Parallax Elements */}
      <section 
        id="services" 
        ref={servicesRef}
        className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50"
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: servicesY
          }}
        />
        
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <GlassCard className="inline-block px-8 py-4 mb-4">
              <h2 className="text-3xl font-bold md:text-4xl text-slate-800">
                Core Services
              </h2>
            </GlassCard>
            <div className="w-24 h-1 mx-auto rounded-full bg-emerald-400"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full transition-all duration-300 border-l-4 backdrop-blur-sm bg-white/90 hover:shadow-xl border-emerald-400 hover:border-sky-500">
                  <div className="relative overflow-hidden">
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardHeader>
                        <div className="inline-block p-3 mb-4 rounded-lg bg-slate-100">
                          <Image
                            src={service.icon}
                            alt={service.imageAlt}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <CardTitle className="transition-colors duration-300 group-hover:text-emerald-600">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">{service.details}</p>
                      </CardContent>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Parallax Elements */}
      <section 
        id="about" 
        ref={aboutRef}
        className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100"
      >
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: aboutY
          }}
        />
        
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <GlassCard className="inline-block px-8 py-4 mb-4">
              <h2 className="text-3xl font-bold md:text-4xl text-slate-800">
                About Us
              </h2>
            </GlassCard>
            <div className="w-24 h-1 mx-auto rounded-full bg-emerald-400"></div>
          </motion.div>
          
          <div className="flex flex-col items-center justify-between gap-8 mb-16 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center md:w-1/3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="absolute rounded-full -inset-4 bg-emerald-400/20 blur-lg animate-pulse"></div>
                <GlassCard className="p-2 rounded-full backdrop-blur-lg">
                  <div className="relative p-2 overflow-hidden bg-white rounded-full shadow-xl">
                    <Image
                      src={aboutImage}
                      alt="About Us"
                      width={250}
                      height={250}
                      className="object-contain rounded-full"
                    />
                  </div>
                </GlassCard>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:w-2/3"
            >
              <GlassCard className="p-8 backdrop-blur-md bg-white/60">
                <p className="mb-6 text-lg text-slate-700">
                  At MindHarmony, we are dedicated to transforming lives through
                  care and compassion. Our mission is to promote mental wellness,
                  empower individuals, and support personal growth.
                </p>
                <div className="p-6 border shadow-md bg-gradient-to-r from-emerald-400/20 to-sky-400/20 rounded-xl border-emerald-400/30">
                  <p className="italic font-medium text-slate-700">
                    Welcome to a place where your well-being is our priority
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
            {[
              {
                title: "Empowering Mental Wellness",
                description: "At MindHarmony, we strive to empower mental wellness by providing personalized care and support tailored to your unique needs."
              },
              {
                title: "Nurturing Personal Growth",
                description: "We nurture personal growth through compassionate guidance and evidence-based practices that enhance your mental well-being."
              },
              {
                title: "Caring for Mental Health",
                description: "Our dedicated team is committed to caring for your mental health, offering support and resources to help you thrive in life."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <GlassCard className="h-full transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-800">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <GlassCard className="p-8 backdrop-blur-md bg-white/60">
              <h3 className="mb-6 text-2xl font-bold md:text-3xl text-slate-800">
                Our Commitment
              </h3>
              <p className="text-lg text-slate-700">
                At MindHarmony, we are committed to creating a safe and supportive
                environment where you can find healing and hope. Together, we can
                achieve mental wellness and resilience.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Enhanced Parallax */}
      <section 
        id="contact" 
        ref={contactRef}
        className="relative py-20 overflow-hidden text-white bg-gradient-to-b from-slate-800 to-slate-900"
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: contactY,
            backgroundAttachment: "fixed"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/80 to-slate-900/80"></div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <GlassCard className="inline-block px-8 py-4 mb-4 bg-white/10">
              <h2 className="text-3xl font-bold md:text-4xl">
                Contact Us
              </h2>
            </GlassCard>
            <div className="w-24 h-1 mx-auto rounded-full bg-emerald-400"></div>
          </motion.div>
          
          <div className="flex flex-col gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <GlassCard className="p-8 backdrop-blur-md bg-white/5">
                <form>
                  <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 text-white border rounded-lg bg-white/5 border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 text-white border rounded-lg bg-white/5 border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 text-white border rounded-lg bg-white/5 border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 hover:shadow-xl"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col justify-between lg:w-1/2"
            >
              <GlassCard className="p-8 mb-8 backdrop-blur-md bg-white/5">
                <h3 className="mb-6 text-2xl font-bold">Get in Touch</h3>
                <div className="space-y-4">
                  <motion.a 
                    href="tel:123-456-7890" 
                    className="flex items-center space-x-4 transition-colors duration-300 text-slate-300 hover:text-emerald-400"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <Image 
                        src={phoneIcon} 
                        alt="Phone" 
                        width={24} 
                        height={24} 
                        className="object-contain"
                      />
                    </div>
                    <span>(123) 456-7890</span>
                  </motion.a>
                  
                  <motion.a 
                    href="mailto:contact@mindharmony.com" 
                    className="flex items-center space-x-4 transition-colors duration-300 text-slate-300 hover:text-emerald-400"
                    whileHover={{ x: 10 }}
                  >
                   <div className="p-3 rounded-full bg-white/10">
                      <Image 
                        src={emailIcon} 
                        alt="Email" 
                        width={24} 
                        height={24} 
                        className="object-contain"
                      />
                    </div>
                    <span>contact@mindharmony.com</span>
                  </motion.a>
                  
                  <motion.a 
                    href="#" 
                    className="flex items-center space-x-4 transition-colors duration-300 text-slate-300 hover:text-emerald-400"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span>123 Healing Way, Mindful City, MC 12345</span>
                  </motion.a>
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 backdrop-blur-md bg-white/5">
                <h3 className="mb-6 text-2xl font-bold">Connect With Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: facebookIcon, alt: "Facebook", url: "#" },
                    { icon: twitterIcon, alt: "Twitter", url: "#" },
                    { icon: instagramIcon, alt: "Instagram", url: "#" },
                    { icon: linkedInIcon, alt: "LinkedIn", url: "#" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 transition-all duration-300 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <Image 
                        src={social.icon} 
                        alt={social.alt} 
                        width={24} 
                        height={24} 
                        className="object-contain"
                      />
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}