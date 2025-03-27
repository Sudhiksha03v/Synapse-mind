'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  confidence: number;
  explanation: string;
}

interface AnalysisResult {
  categories: Category[];
  summary: string;
}

interface PostAnalyzerProps {
  initialText?: string;
  onAnalyze?: () => void;
}

export default function PostAnalyzer({ initialText = '', onAnalyze }: PostAnalyzerProps) {
  const [postText, setPostText] = useState(initialText);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [model, setModel] = useState<'openai' | 'claude' | 'deepseek-r1' | 'gemini-flash-2.5'>('claude');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (initialText) {
      setPostText(initialText);
      setCharacterCount(initialText.length);
      setAnalysis(null);
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

    console.log('Analyzing post:', { model, text: postText });

    try {
      const endpoint = model === 'openai' ? '/api/analyze' : '/api/analyze/claude';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: postText, model }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysis(data);
      console.log('Analysis received:', data);

      if (onAnalyze) {
        onAnalyze();
      }
    } catch (err: any) {
      setError(`Error analyzing post: ${err.message}`);
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string): { gradientFrom: string; gradientTo: string; text: string } => {
    const categoryColors: Record<string, { gradientFrom: string; gradientTo: string; text: string }> = {
      Anxiety: { gradientFrom: 'from-yellow-400', gradientTo: 'to-orange-500', text: 'text-yellow-800 dark:text-yellow-300' },
      Depression: { gradientFrom: 'from-blue-500', gradientTo: 'to-purple-600', text: 'text-blue-800 dark:text-blue-300' },
      Stress: { gradientFrom: 'from-orange-400', gradientTo: 'to-red-500', text: 'text-orange-800 dark:text-orange-300' },
      'Self-Harm': { gradientFrom: 'from-red-400', gradientTo: 'to-pink-600', text: 'text-red-800 dark:text-red-300' },
      'Sleep Issues': { gradientFrom: 'from-indigo-400', gradientTo: 'to-blue-500', text: 'text-indigo-800 dark:text-indigo-300' },
      'Emotional Distress': { gradientFrom: 'from-pink-400', gradientTo: 'to-purple-600', text: 'text-pink-800 dark:text-pink-300' },
      None: { gradientFrom: 'from-green-400', gradientTo: 'to-teal-500', text: 'text-green-800 dark:text-green-300' },
    };
    return categoryColors[category] || { gradientFrom: 'from-gray-400', gradientTo: 'to-gray-600', text: 'text-gray-800 dark:text-gray-300' };
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <div className="space-y-10 p-6 max-w-3xl mx-auto">
      <motion.div className="relative rounded-xl bg-card/85 p-6 shadow-lg border-2 border-gradient-to-r from-primary/50 to-accent/50">
        <div className="absolute inset-0 rounded-xl opacity-10 bg-gradient-to-br from-primary to-accent pointer-events-none" />
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="pb-6 border-b border-foreground/10">
            <h3 className="text-xl font-bold mb-4 text-white bg-clip-text bg-gradient-to-r from-primary to-accent">
              Select Analysis Model
            </h3>
            <div className="bg-background/30 backdrop-blur-sm p-4 rounded-xl shadow-sm flex flex-wrap gap-4">
              {(['openai', 'claude', 'deepseek-r1', 'gemini-flash-2.5'] as const).map((m) => (
                <motion.label
                  key={m}
                  className="flex items-center space-x-3 cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <input
                    type="radio" // Changed to radio for single selection
                    name="model"
                    checked={model === m}
                    onChange={() => setModel(m)}
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                      model === m
                        ? 'bg-gradient-to-r from-primary to-accent border-transparent shadow-md'
                        : 'border-foreground/30 bg-background/50 group-hover:border-foreground/50'
                    }`}
                  >
                    {model === m && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-base font-medium ${model === m ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground/90'}`}>
                    {m === 'openai' ? 'OpenAI GPT-4o' : m === 'claude' ? 'Anthropic Claude' : m === 'deepseek-r1' ? 'Deepseek R1' : 'Gemini Flash 2.5'}
                  </span>
                </motion.label>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-foreground/90">Enter Social Media Post</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  characterCount > 1500 ? 'bg-red-100 text-red-600' : 'bg-secondary/40 text-foreground/70'
                }`}
              >
                {characterCount}/2000
              </span>
            </div>
            <textarea
              id="postText"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Enter a social media post to analyze for mental health indicators..."
              className="w-full px-4 py-3 bg-background/60 text-foreground rounded-lg border-2 border-white/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300 transition-all h-40 resize-none"
              maxLength={2000}
              required
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={isLoading || !postText.trim()}
              className={`px-8 py-3 rounded-full font-semibold text-lg text-white shadow-2xl flex items-center gap-3 ${
                isLoading || !postText.trim()
                  ? 'bg-green-400/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-[length:200%_100%] hover:bg-[length:100%_100%] hover:from-green-400 hover:to-green-500 transition-all duration-300'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0, 128, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h6m-6 4h6m-6 4h6" />
                  </svg>
                  Analyze Post
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {error && (
        <motion.div
          className="relative p-5 bg-card/85 rounded-xl shadow-lg border-2 border-gradient-to-r from-red-400/50 to-pink-600/50"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <div className="absolute inset-0 rounded-xl opacity-15 bg-gradient-to-br from-red-400 to-pink-600 pointer-events-none" />
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 dark:text-red-300 text-base">{error}</span>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          className="relative p-6 bg-card/85 rounded-xl shadow-lg border-2 border-gradient-to-r from-primary/50 to-accent/50"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <div className="absolute inset-0 rounded-xl opacity-15 bg-gradient-to-br from-primary to-accent pointer-events-none" />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="text-foreground/80 font-semibold text-base">
              Analyzing with {model === 'openai' ? 'OpenAI GPT-4o' : model === 'claude' ? 'Anthropic Claude' : model === 'deepseek-r1' ? 'Deepseek R1' : 'Gemini Flash 2.5'}
            </p>
            <p className="text-sm text-foreground/60">Processing sentiment and mental health indicators...</p>
          </div>
        </motion.div>
      )}

      {analysis && !isLoading && (
        <motion.div
          className="relative rounded-xl bg-card/85 p-6 shadow-lg border-2 border-gradient-to-r from-primary/50 to-accent/50"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="absolute inset-0 rounded-xl opacity-15 bg-gradient-to-br from-primary to-accent pointer-events-none" />
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Analysis Results</h3>
          <p className="text-sm text-foreground/70 mb-6 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
            </svg>
            Analyzed with {model === 'openai' ? 'OpenAI GPT-4o' : model === 'claude' ? 'Anthropic Claude' : model === 'deepseek-r1' ? 'Deepseek R1' : 'Gemini Flash 2.5'}
          </p>
          <motion.div className="space-y-8" variants={container}>
            <motion.div variants={item}>
              <h4 className="text-base font-semibold mb-3 flex items-center text-foreground/80 bg-background/10 p-2 rounded-md">
                <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 102 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Summary Assessment
              </h4>
              <p className="text-foreground/90 leading-relaxed">{analysis.summary}</p>
            </motion.div>
            <motion.div variants={item}>
              <h4 className="flex items-center text-base font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent bg-background/10 p-2 rounded-md">
                <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0v-4zM9 9a1 1 0 000 2v3a1 1 0 102 0V6a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Detected Categories
              </h4>
              {analysis.categories.length > 0 ? (
                <div className="space-y-5">
                  {analysis.categories.map((category, index) => {
                    const style = getCategoryColor(category.name);
                    return (
                      <motion.div key={index} className="relative rounded-xl bg-card/95 shadow-md" variants={item}>
                        <div className={`absolute inset-0 rounded-xl opacity-25 bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo} pointer-events-none`} />
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className={`font-semibold ${style.text} flex items-center`}>
                              <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                              {category.name}
                            </h5>
                            <span className={`text-sm ${style.text}`}>{category.confidence}% Confidence</span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2 mb-3">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${style.gradientFrom} ${style.gradientTo}`}
                              style={{ width: `${category.confidence}%` }}
                            />
                          </div>
                          <p className="text-sm text-foreground/80">{category.explanation}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div className="relative p-5 rounded-xl bg-card/95 shadow-md flex items-center" variants={item}>
                  <div className="absolute inset-0 rounded-xl opacity-25 bg-gradient-to-br from-green-400 to-teal-500 pointer-events-none" />
                  <svg className="w-10 h-10 mr-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground/90">No Mental Health Concerns Detected</p>
                    <p className="text-sm text-foreground/70 mt-1">{analysis.summary}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}