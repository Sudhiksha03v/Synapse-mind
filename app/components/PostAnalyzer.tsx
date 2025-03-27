'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';

interface PostAnalyzerProps {
  initialText?: string;
}

export default function PostAnalyzer({ initialText = '' }: PostAnalyzerProps) {
  const [postText, setPostText] = useState(initialText);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [model, setModel] = useState<'openai' | 'claude' | 'deepseek-r1' | 'gemini-flash-2.5'>('openai');
  const [characterCount, setCharacterCount] = useState(0);

  // Update postText when initialText prop changes
  useEffect(() => {
    if (initialText) {
      setPostText(initialText);
      setCharacterCount(initialText.length);
      setAnalysis(null); // Reset previous analysis
    }
  }, [initialText]);

  useEffect(() => {
    setCharacterCount(postText.length);
  }, [postText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postText.trim()) {
      setError('Please enter a social media post to analyze.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);
    
    try {
      // Choose API endpoint based on selected model
      const endpoint = model === 'openai' ? '/api/analyze' : '/api/analyze/claude';
      
      // Fetch the API key from the environment variables
      const apiKey = process.env.NEXT_PUBLIC_CLAUDE_API_KEY; // Ensure this is set in your .env file

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // Use the Claude API key
        },
        body: JSON.stringify({ text: postText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(`Error analyzing post: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to determine color based on category and confidence
  const getCategoryColor = (category: string, confidence: number) => {
    // Different colors for different categories
    const categoryColors: Record<string, {bg: string, border: string, text: string}> = {
      'Anxiety': {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-300 dark:border-yellow-700',
        text: 'text-yellow-800 dark:text-yellow-300'
      },
      'Depression': {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-300 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-300'
      },
      'Stress': {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-300 dark:border-orange-700',
        text: 'text-orange-800 dark:text-orange-300'
      },
      'Self-Harm': {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-400 dark:border-red-700',
        text: 'text-red-800 dark:text-red-300'
      },
      'Sleep Issues': {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-300 dark:border-purple-700',
        text: 'text-purple-800 dark:text-purple-300'
      },
      'Emotional Distress': {
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        border: 'border-pink-300 dark:border-pink-700',
        text: 'text-pink-800 dark:text-pink-300'
      },
      'None': {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-300 dark:border-green-700',
        text: 'text-green-800 dark:text-green-300'
      }
    };

    // Default fallback
    const defaultStyle = {
      bg: 'bg-gray-50 dark:bg-gray-800/30',
      border: 'border-gray-300 dark:border-gray-700',
      text: 'text-gray-800 dark:text-gray-300'
    };

    return categoryColors[category] || defaultStyle;
  };

  return (
    <div className="w-full glass rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-white">
          Your Feed, <span className="text-white">Our Analysis</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="model" className="block text-sm md:text-base font-medium mb-2 text-black">
              Select the LLM model of your choice
            </label>
            <div className="flex flex-col md:flex-row md:space-x-4 p-3 bg-secondary/20 rounded-lg border border-border/60 h-auto">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <label className="relative flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="openai"
                    checked={model === 'openai'}
                    onChange={() => setModel('openai')}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${model === 'openai' ? 'bg-gradient-to-r from-primary to-accent shadow-md' : 'bg-secondary border border-border'}`}>
                    {model === 'openai' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </span>
                  <span className={`flex items-center text-sm ${model === 'openai' ? 'font-medium text-black' : 'text-black/90'}`}>
                    OpenAI GPT-4o
                  </span>
                </label>
                <label className="relative flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="claude"
                    checked={model === 'claude'}
                    onChange={() => setModel('claude')}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${model === 'claude' ? 'bg-gradient-to-r from-primary to-accent shadow-md' : 'bg-secondary border border-border'}`}>
                    {model === 'claude' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </span>
                  <span className={`flex items-center text-sm ${model === 'claude' ? 'font-medium text-black' : 'text-black/90'}`}>
                    Anthropic Claude
                  </span>
                </label>
                <label className="relative flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="deepseek-r1"
                    checked={model === 'deepseek-r1'}
                    onChange={() => setModel('deepseek-r1')}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${model === 'deepseek-r1' ? 'bg-gradient-to-r from-primary to-accent shadow-md' : 'bg-secondary border border-border'}`}>
                    {model === 'deepseek-r1' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </span>
                  <span className={`flex items-center text-sm ${model === 'deepseek-r1' ? 'font-medium text-black' : 'text-black/90'}`}>
                    Deepseek R1
                  </span>
                </label>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0">
                <label className="relative flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="gemini-flash-2.5"
                    checked={model === 'gemini-flash-2.5'}
                    onChange={() => setModel('gemini-flash-2.5')}
                    className="sr-only"
                  />
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${model === 'gemini-flash-2.5' ? 'bg-gradient-to-r from-primary to-accent shadow-md' : 'bg-secondary border border-border'}`}>
                    {model === 'gemini-flash-2.5' && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </span>
                  <span className={`flex items-center text-sm ${model === 'gemini-flash-2.5' ? 'font-medium text-black' : 'text-black/90'}`}>
                    Gemini Flash 2.5
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="postText" className="block text-sm md:text-base font-medium text-black">
                Enter Social Media Post
              </label>
              <span className={`text-xs px-2 py-1 rounded-full ${characterCount > 1500 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-secondary/40 text-black'}`}>
                {characterCount}/2000
              </span>
            </div>
            <div className="relative">
              <textarea
                id="postText"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Enter a social media post to analyze for mental health indicators..."
                className="w-full px-4 py-3 border border-border/60 bg-background/60 text-foreground rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all h-36 resize-none"
                maxLength={2000}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-foreground/50">
                {isLoading ? 'Analyzing...' : 'AI-powered analysis'}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !postText.trim()}
              className={`relative px-6 py-2.5 rounded-lg font-medium text-white shadow-md flex items-center justify-center transition-all transform active:scale-95 ${
                isLoading || !postText.trim() 
                  ? 'bg-primary/60 cursor-not-allowed' 
                  : 'gradient-button hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Post...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  Analyze Post
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-5 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-sm rounded-md slide-up">
            <div className="flex">
              <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 p-8 flex flex-col items-center justify-center space-y-4 slide-up">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/10 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
              <div className="absolute top-3 left-3 w-14 h-14 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="text-center">
              <p className="text-foreground/70 font-medium mb-1">
                Analyzing with {model === 'openai' ? 'OpenAI GPT-4o' : model === 'claude' ? 'Anthropic Claude' : model === 'deepseek-r1' ? 'Deepseek R1' : 'Gemini Flash 2.5'}
              </p>
              <p className="text-xs text-foreground/50">Processing sentiment and mental health indicators</p>
            </div>
          </div>
        )}

        {analysis && !isLoading && (
          <div className="mt-8 rounded-xl overflow-hidden bg-transparent shadow-md slide-up">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border/40">
              <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Analysis Results</h3>
              <div className="text-xs text-foreground/70 mt-1 flex items-center">
                {model === 'openai' ? (
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
                  </svg>
                ) : model === 'claude' ? (
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.91 4.09C3.91 2.9363 4.8463 2 6 2C7.1537 2 8.09 2.9363 8.09 4.09C8.09 5.2437 7.1537 6.18 6 6.18C4.8463 6.18 3.91 5.2437 3.91 4.09Z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.91 4.09C3.91 2.9363 4.8463 2 6 2C7.1537 2 8.09 2.9363 8.09 4.09C8.09 5.2437 7.1537 6.18 6 6.18C4.8463 6.18 3.91 5.2437 3.91 4.09Z" />
                  </svg>
                )}
                Analyzed with {model === 'openai' ? 'OpenAI GPT-4o' : model === 'claude' ? 'Anthropic Claude' : model === 'deepseek-r1' ? 'Deepseek R1' : 'Gemini Flash 2.5'}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-transparent">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 102 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/80">Summary Assessment</span>
                </h4>
                <p className="text-foreground leading-relaxed">{analysis.summary}</p>
              </div>

              <div>
                <h4 className="flex items-center font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0v-4zM9 9a1 1 0 000 2v3a1 1 0 102 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Detected Categories
                </h4>
                
                {analysis.categories.length > 0 ? (
                  <div className="space-y-4">
                    {analysis.categories.map((category, index) => {
                      const style = getCategoryColor(category.name, category.confidence);
                      return (
                        <div 
                          key={index} 
                          className={`border ${style.border} rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className={`${style.bg} p-4 flex justify-between items-center`}>
                            <h5 className={`font-medium ${style.text} flex items-center`}>
                              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                              {category.name}
                            </h5>
                            <div className="flex items-center space-x-3">
                              <div className="progress-bar w-32">
                                <div 
                                  className="progress-bar-fill bg-gradient-to-r from-primary to-accent" 
                                  style={{ width: `${category.confidence}%` }}
                                ></div>
                              </div>
                              <span className={`category-tag ${style.text}`}>
                                {category.confidence}%
                              </span>
                            </div>
                          </div>
                          <div className="p-4 bg-transparent">
                            <p className="text-sm text-foreground/80">{category.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-5 glass border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 flex items-center">
                    <svg className="w-10 h-10 mr-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium">No Mental Health Concerns Detected</p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">This content doesn't show indicators of mental health issues.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 