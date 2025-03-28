'use client';

import React, { JSX, useState } from 'react';
import PostAnalyzer from '@/app/components/PostAnalyzer';
import MockFeed from '@/app/components/MockFeed';
import { motion } from 'framer-motion';
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  ChartOptions,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, RadialLinearScale);

const sageTheme = { light: '#A9BA9D', medium: '#8A9A7E', dark: '#6B7A5F' };

interface AnalysisData {
  sentiment: { positive: number; negative: number; neutral: number };
  keywords: { word: string; frequency: number; concern?: string }[];
  severity: { level: string; score: number };
  emotionalIntensity: number;
  categories: { name: string; confidence: number }[];
  modelInsights: {
    modelType: string;
    tokenUsage: number;
    processingTime: number;
    modelConfidence: number;
    latencyBreakdown: { preprocessing: number; inference: number; postprocessing: number };
    tokenEfficiency: number;
  };
}

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
    borderRadius?: number;
  }[];
}

const mockAnalysis: AnalysisData = {
  sentiment: { positive: 10, negative: 60, neutral: 30 },
  keywords: [
    { word: 'empty', frequency: 3, concern: 'Depression' },
    { word: 'can’t', frequency: 2, concern: 'Anxiety' },
    { word: 'skipped', frequency: 1, concern: 'Anorexia' },
  ],
  severity: { level: 'Moderate', score: 65 },
  emotionalIntensity: 75,
  categories: [
    { name: 'Depression', confidence: 85 },
    { name: 'Anxiety', confidence: 70 },
    { name: 'Anorexia', confidence: 40 },
  ],
  modelInsights: {
    modelType: 'Claude',
    tokenUsage: 120,
    processingTime: 1.8,
    modelConfidence: 92,
    latencyBreakdown: { preprocessing: 0.3, inference: 1.2, postprocessing: 0.3 },
    tokenEfficiency: 66.67,
  },
};

export default function AnalyzePage(): JSX.Element {
  const [selectedPost, setSelectedPost] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState<boolean>(false);

  const handleSelectPost = (content: string): void => {
    setSelectedPost(content);
    setShowDetailedAnalysis(false);
    const analyzerElement = document.getElementById('analyzer');
    if (analyzerElement) analyzerElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyzePost = (): void => {
    setAnalysisData(mockAnalysis);
    setShowDetailedAnalysis(true);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  const sentimentData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: analysisData
          ? [analysisData.sentiment.positive, analysisData.sentiment.negative, analysisData.sentiment.neutral]
          : [0, 0, 0],
        backgroundColor: ['#34d399', '#f87171', '#9ca3af'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const sentimentOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#d1d5db', font: { size: 14 } } },
      tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#fff' },
    },
    cutout: '60%',
  };

  const keywordsData: BarChartData = {
    labels: analysisData?.keywords.map(kw => kw.word) || [],
    datasets: [
      {
        label: 'Frequency',
        data: analysisData?.keywords.map(kw => kw.frequency) || [],
        backgroundColor: 'rgba(52, 211, 153, 0.8)',
        borderColor: '#34d399',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  const emotionalProfileData = {
    labels: ['Sadness', 'Anger', 'Fear', 'Joy', 'Surprise'],
    datasets: [
      {
        data: [60, 20, 30, 10, 15],
        backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(52, 211, 153, 0.7)', 'rgba(139, 92, 246, 0.7)'],
        borderColor: ['#3b82f6', '#ef4444', '#f59e0b', '#34d399', '#8b5cf6'],
        borderWidth: 1,
      },
    ],
  };

  const polarOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: '#d1d5db' } }, tooltip: { enabled: true } },
    scales: { r: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.2)' } } },
  };

  const confidenceMatrixData: BarChartData = {
    labels: analysisData?.categories.map(cat => cat.name) || [],
    datasets: [
      {
        label: 'Confidence Score',
        data: analysisData?.categories.map(cat => cat.confidence) || [],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const modelLabels = ['Claude', 'OpenAI', 'Deepseek', 'Gemini'];
  const modelPerformanceData: BarChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'Model Confidence',
        data: [92, 88, 85, 87].map((val, idx) =>
          analysisData?.modelInsights.modelType === modelLabels[idx] ? val : val - Math.floor(Math.random() * 5)
        ),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: '#22c55e',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${sageTheme.light}20, ${sageTheme.dark}20 50%, transparent 80%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-10 pt-40 md:pt-48 lg:pt-56 relative z-10">
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          >
            Your Feed, Our Analysis
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Harness cutting-edge AI to uncover mental health insights from social media. Make mental healthcare accessible to all to live a sound mindspace.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center mb-6">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}80, ${sageTheme.dark}80)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Social Media Feed</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
              <MockFeed onSelectPost={handleSelectPost} />
            </motion.div>
          </motion.div>

          <motion.div id="analyzer" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center mb-6">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}80, ${sageTheme.dark}80)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">LLM-Powered Analysis</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Decode mental health signals with state-of-the-art language models.
              </p>
              <PostAnalyzer initialText={selectedPost} onAnalyze={handleAnalyzePost} />
            </motion.div>
          </motion.div>
        </div>

        {showDetailedAnalysis && analysisData && (
          <>
            <section className="mt-20">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item} className="flex items-center justify-center mb-10">
                  <div
                    className="p-3 rounded-full"
                    style={{ background: `linear-gradient(to right, ${sageTheme.light}80, ${sageTheme.dark}80)` }}
                  >
                    <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2
                    className="text-4xl font-bold text-white bg-clip-text ml-4"
                    style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
                  >
                    Detailed Insights
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Sentiment Breakdown</h3>
                    <div className="relative h-72">
                      <Doughnut data={sentimentData} options={sentimentOptions} />
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Key Phrases Detected</h3>
                    <div className="space-y-4 mb-6">
                      {analysisData.keywords.map((kw, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg shadow-inner border border-gray-600/50 hover:bg-gray-600/50 transition-all"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{kw.word}</span>
                            <span className="text-sm text-gray-400">({kw.frequency})</span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              kw.concern ? 'bg-red-500/30 text-red-300' : `${sageTheme.light}33 text-sage-300`
                            }`}
                            style={{ backgroundColor: kw.concern ? '' : `${sageTheme.light}33`, color: kw.concern ? '' : sageTheme.light }}
                          >
                            {kw.concern || 'Neutral'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="h-72">
                      <Bar data={keywordsData} options={barOptions} />
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Concern Severity</h3>
                    <div className="flex items-center gap-6">
                      <div className="relative w-28 h-28">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#4b5563"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            strokeDasharray={`${analysisData.severity.score}, 100`}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#34d399" />
                              <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                          {analysisData.severity.score}%
                        </div>
                      </div>
                      <div>
                        <p className="text-xl text-white">{analysisData.severity.level}</p>
                        <p className="text-sm text-gray-400">Based on detected indicators</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Emotional Intensity</h3>
                    <div className="flex items-center gap-6">
                      <div className="relative w-28 h-28">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#4b5563"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#intensityGradient)"
                            strokeWidth="3"
                            strokeDasharray={`${analysisData.emotionalIntensity}, 100`}
                          />
                          <defs>
                            <linearGradient id="intensityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f87171" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                          {analysisData.emotionalIntensity}%
                        </div>
                      </div>
                      <div>
                        <p className="text-xl text-white">{analysisData.emotionalIntensity > 70 ? 'High' : 'Moderate'}</p>
                        <p className="text-sm text-gray-400">Emotional weight of the post</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-semibold text-white mb-4">Emotional Profile</h3>
                    <div className="relative h-96">
                      <PolarArea data={emotionalProfileData} options={polarOptions} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>

            <section className="mt-20">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item} className="flex items-center justify-center mb-10">
                  <div
                    className="p-3 rounded-full"
                    style={{ background: `linear-gradient(to right, ${sageTheme.light}80, ${sageTheme.dark}80)` }}
                  >
                    <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2
                    className="text-4xl font-bold text-white bg-clip-text ml-4"
                    style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
                  >
                    Model Insights
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-semibold text-white mb-6">Model Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Model Used</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.modelType}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Token Usage</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.tokenUsage} tokens</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Total Processing Time</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.processingTime}s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Token Efficiency</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.tokenEfficiency.toFixed(2)} tokens/s</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Model Confidence</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.modelConfidence}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Preprocessing Latency</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.latencyBreakdown.preprocessing}s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Inference Latency</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.latencyBreakdown.inference}s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Postprocessing Latency</span>
                          <span className="text-white font-semibold">{analysisData.modelInsights.latencyBreakdown.postprocessing}s</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-6">Metrics reflect the model\'s efficiency and accuracy in analyzing the post.</p>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Confidence Matrix</h3>
                    <div className="relative h-72">
                      <Bar data={confidenceMatrixData} options={barOptions} />
                    </div>
                    <p className="text-sm text-gray-400 mt-4">Confidence scores for the post\'s detected mental health categories.</p>
                  </motion.div>

                  <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4">Model Performance</h3>
                    <div className="relative h-64">
                      <Bar data={modelPerformanceData} options={barOptions} />
                    </div>
                    <p className="text-sm text-gray-400 mt-4">Comparison of confidence across available models.</p>
                  </motion.div>
                </div>
              </motion.div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}