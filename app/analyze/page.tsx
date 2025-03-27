'use client';

import React, { useState } from 'react';
import PostAnalyzer from '../components/PostAnalyzer';
import MockFeed from '../components/MockFeed';

export default function AnalyzePage() {
  const [selectedPost, setSelectedPost] = useState('');

  const handleSelectPost = (content: string) => {
    setSelectedPost(content);
    const analyzerElement = document.getElementById('analyzer');
    if (analyzerElement) {
      analyzerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 pt-36 md:pt-44 lg:pt-48 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="text-center mb-16 md:mb-20 relative">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 relative">
          <span className="inline-block">
            Your Feed, Our Analysis.
          </span>{" "}
          
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Use our AI-powered tools to analyze social media content for potential mental health indicators.
          Select from sample posts or input your own text for analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Social Media Posts Feed
            </h2>
          </div>
          <div className="bg-card border border-border/60 rounded-xl p-6 shadow-md">
            <MockFeed onSelectPost={handleSelectPost} />
          </div>
        </div>

        <div id="analyzer" className="space-y-6">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              LLM Powered Analysis
            </h2>
          </div>
          <div className="bg-card/50 border border-border/60 rounded-xl p-6 shadow-md">
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Our advanced AI models analyze social media posts to detect potential mental health concerns, providing insights and support recommendations.
            </p>
            <PostAnalyzer initialText={selectedPost} />
          </div>
        </div>
      </div>
    </main>
  );
} 