'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define sage green theme colors
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.6 },
    },
  };

  const navItems = [
    { name: 'Analyze', path: '/analyze' },
    { name: 'Insights', path: '/insights' },
    { name: 'Journal', path: '/journal' },
    { name: 'Research', path: '/research' },
    { name: 'Therapists', path: '/therapists' },
  ];

  const gradientStyle = {
    background: `linear-gradient(135deg, ${sageTheme.light}, ${sageTheme.dark})`, // Sage green gradient
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-poppins ${
        isScrolled ? 'py-3 shadow-lg backdrop-blur-md bg-gray-900/80' : 'py-5 bg-gray-900/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover="hover"
            variants={logoVariants}
          >
            <div className="absolute inset-0 bg-white rounded-full opacity-20 glow"></div>
            <svg className="h-8 w-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={sageTheme.light} />
                  <stop offset="100%" stopColor={sageTheme.dark} />
                </linearGradient>
              </defs>
              <path
                fill="url(#headerGradient)"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40"
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.h1
            className="text-2xl md:text-3xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Synapse
          </motion.h1>
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={item.path}
                  className={`text-sm font-medium relative text-white ${
                    pathname === item.path ? 'font-semibold' : ''
                  }`}
                >
                  {item.name}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-${sageTheme.light} to-${sageTheme.dark} rounded-full ${
                      pathname === item.path ? 'w-full' : 'w-0'
                    }`}
                    initial={{ width: pathname === item.path ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </motion.button>

          <motion.a
            href="/help"
            className="hidden md:inline-flex px-4 py-1.5 rounded-full text-sm text-white items-center shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            style={gradientStyle}
          >
            <span className="mr-1.5">Help</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
      </div>

      <motion.div
        className="md:hidden absolute w-full bg-gray-900/95 backdrop-blur-md shadow-lg rounded-b-lg overflow-hidden z-30"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="px-4 py-3 flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-white px-4 py-2 rounded-md hover:bg-gray-700/30 transition-colors ${
                pathname === item.path ? 'bg-gray-700/20 font-semibold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex space-x-2">
            <a
              href="/help"
              className="flex-1 text-center px-4 py-2 rounded-full text-sm text-white shadow-md"
              style={gradientStyle}
            >
              Help
            </a>
          </div>
        </nav>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{ background: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />
      </div>
    </header>
  );
}