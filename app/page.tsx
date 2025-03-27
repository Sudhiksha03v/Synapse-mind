'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: 'Advanced ML Analysis',
      description: 'State-of-the-art machine learning models trained on extensive mental health datasets for accurate content analysis.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'LLM-Powered Insights',
      description: 'Leveraging GPT-4 and advanced language models to provide nuanced understanding of mental health indicators.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Privacy-First Analysis',
      description: 'Enterprise-grade security with encrypted analysis and HIPAA-compliant data handling protocols.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const stats = [
    {
      number: '95%',
      label: 'Analysis Accuracy',
      description: 'Validated through clinical studies'
    },
    {
      number: '24/7',
      label: 'Real-time Processing',
      description: 'Instant analysis available'
    },
    {
      number: '100K+',
      label: 'Analyzed Posts',
      description: 'Growing knowledge base'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Header />
      
      <main className={`flex-grow transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-accent/10 pt-36 pb-12 md:pt-44 lg:pt-48 md:pb-20 lg:pb-32">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 md:mb-8"
              >
                <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold bg-gradient-to-r from-primary/20 to-accent/20 text-primary rounded-full">
                  Next-Generation Mental Health Analysis
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight whitespace-nowrap">
                  <span className="text-primary font-extrabold">Synapse</span>
                  <span className="text-foreground mx-2">-</span>
                  <span className="text-foreground">Mind over Matter</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 mt-3 md:mt-4 font-medium"
              >
                LLM-Powered mental health analysis
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl text-foreground/80 my-6 md:my-8 lg:my-12 max-w-3xl mx-auto font-light px-4"
              >
                Harness the power of advanced machine learning and large language models to detect early signs of mental health concerns. 
                Enable proactive support through data-driven insights.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 px-4"
              >
                <Link
                  href="/analyze"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white shadow-lg gradient-button font-medium transition-all hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base"
                >
                  Start Analysis
                </Link>
                <a 
                  href="#features" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-background text-foreground border border-border hover:bg-secondary/10 font-medium transition-all text-sm sm:text-base"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                  <div className="text-xs md:text-sm text-foreground/70">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                Powered by Advanced Technology
              </h2>
              <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
                Our platform combines state-of-the-art machine learning models with advanced language processing 
                to provide accurate mental health insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="p-6 md:p-8 rounded-2xl bg-background shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 mb-4 md:mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-primary/30 to-accent/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-sm md:text-base text-foreground/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto px-4"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Destigmatize mental health issues & get a better mindspace?
              </h2>
              <p className="text-base md:text-lg text-foreground/70 mb-6 md:mb-8">
                Join the future of mental health analysis with our advanced analysis and in-advance help from trained professionals.
              </p>
              <Link
                href="/analyze"
                className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white shadow-lg gradient-button font-medium transition-all hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base"
              >
                Start Free Analysis
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-primary/20 to-accent/20 py-6 md:py-8 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <div className="flex items-center justify-center mb-3">
              <svg className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                Synapse
              </h2>
            </div>
            <p className="text-xs md:text-sm text-foreground/70">
              Synapse &copy; {new Date().getFullYear()} | Mind over Matter
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-xs text-foreground/50 mb-4">
              This tool is for educational and research purposes only and should not be used for medical diagnosis.
              If you or someone you know is experiencing a mental health crisis, please contact a healthcare professional.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs text-foreground/70">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors">Research</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 