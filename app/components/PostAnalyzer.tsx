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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error analyzing post: ${errorMessage}`);
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
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
                    type="radio"
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
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-foreground text-lg">Processing your post...</span>
          </div>
        </motion.div>
      )}

      {analysis && (
        <motion.div
          className="relative p-6 bg-card/85 rounded-xl shadow-lg border-2 border-gradient-to-r from-primary/50 to-accent/50"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="absolute inset-0 rounded-xl opacity-10 bg-gradient-to-br from-primary to-accent pointer-events-none" />
          <h3 className="text-2xl font-bold mb-6 text-white bg-clip-text bg-gradient-to-r from-primary to-accent">
            Analysis Results
          </h3>
          <div className="space-y-6">
            {analysis.categories.map((category, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-lg bg-gray-700/30 shadow-md"
                variants={item}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-white">{category.name}</h4>
                  <span className="text-sm font-medium text-gray-300 bg-white/20 px-2 py-1 rounded-full">
                    {category.confidence}%
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{category.explanation}</p>
              </motion.div>
            ))}
            <motion.div className="p-5 bg-gray-700/30 rounded-lg shadow-inner" variants={item}>
              <h4 className="text-lg font-semibold text-white mb-2">Summary</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{analysis.summary}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}