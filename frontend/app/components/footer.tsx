"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Import or define your icons and images
const logoIcon = "/assets/fluent--brain-circuit-20-filled.svg";
const facebookIcon = "/assets/line-md--facebook.svg";
const twitterIcon = "/assets/line-md--twitter-x.svg";
const instagramIcon = "/assets/line-md--instagram.svg";
const linkedInIcon = "/assets/line-md--linkedin.svg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate subscription process
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Individual Therapy", href: "#" },
        { name: "Group Sessions", href: "#" },
        { name: "Mindfulness Training", href: "#" },
        { name: "Wellness Programs", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Research", href: "#" },
        { name: "Mental Health Tips", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="text-white bg-emerald-600">
      <div className="container px-4 py-12 mx-auto">
        {/* Newsletter section - made more compact */}
        <div className="relative z-10 p-6 mb-10 rounded-lg bg-emerald-500">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="lg:w-1/2">
              <h3 className="mb-2 text-xl font-bold text-white">Subscribe to Our Newsletter</h3>
              <p className="mb-0 text-white/90">
                Get the latest news, mental health tips, and exclusive offers.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubscribe} className="flex flex-col w-full gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 text-white border rounded-lg bg-white/20 border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 py-2 font-medium transition-colors duration-300 bg-white rounded-lg text-emerald-700 hover:bg-white/90"
                >
                  Subscribe
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-white/90"
                >
                  Thank you for subscribing! 🎉
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo and about section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/20">
                <Image
                  src={logoIcon}
                  alt="MindHarmony Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h3 className="ml-3 text-xl font-bold">MindHarmony</h3>
            </div>
            <p className="mb-4 text-white/90">
              Dedicated to transforming lives through mental wellness in a safe and compassionate environment.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: facebookIcon, alt: "Facebook", href: "https://www.facebook.com/mindharmonycounseling/" },
                { icon: instagramIcon, alt: "Instagram", href: "https://www.instagram.com/mindharmonycounseling/" },
                { icon: twitterIcon, alt: "Twitter", href: "https://www.twitter.com/mindharmonycounseling/" },
                { icon: linkedInIcon, alt: "LinkedIn", href: "https://www.linkedin.com/company/mindharmonycounseling/" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 transition-colors duration-300 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.alt} 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-3">
              <h4 className="pb-2 mb-3 text-base font-bold text-white border-b border-white/20">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="flex items-center transition-colors duration-300 text-white/80 hover:text-white"
                    >
                      <span className="mr-1 text-emerald-300">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-4 text-center border-t border-white/20 text-white/70">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p>©Copyright 2024 MindHarmony. All rights reserved.</p>
            <div className="mt-3 md:mt-0">
              <Link href="/privacy" className="mx-2 transition-colors duration-300 hover:text-white">Privacy</Link>
              <span className="mx-1">|</span>
              <Link href="/terms" className="mx-2 transition-colors duration-300 hover:text-white">Terms</Link>
              <span className="mx-1">|</span>
              <Link href="/sitemap" className="mx-2 transition-colors duration-300 hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed z-50 p-2 transition-colors duration-300 bg-white rounded-full shadow-lg bottom-4 right-4 hover:bg-emerald-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </footer>
  );
}