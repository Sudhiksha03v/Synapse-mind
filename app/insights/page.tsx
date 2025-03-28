'use client';

import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { Bar, Doughnut, PolarArea, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, RadialLinearScale, LineElement, PointElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, RadialLinearScale, LineElement, PointElement);

// Sage green theme colors (for background consistency)
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

interface MentalHealthStats {
  condition: string;
  prevalence: number; // Percentage
  severity: number; // 0-100
  trend: number[]; // Monthly trend data
}

const mockUserAnalysis: MentalHealthStats[] = [
  { condition: 'Depression', prevalence: 18, severity: 65, trend: [10, 12, 15, 18, 16, 18] },
  { condition: 'Anxiety', prevalence: 22, severity: 55, trend: [15, 18, 20, 22, 21, 22] },
  { condition: 'PTSD', prevalence: 8, severity: 75, trend: [5, 6, 7, 8, 7, 8] },
];

export default function Insights(): JSX.Element {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  // User Analysis - Prevalence Doughnut Chart
  const userPrevalenceData = {
    labels: mockUserAnalysis.map(stat => stat.condition),
    datasets: [
      {
        label: 'Prevalence (%)',
        data: mockUserAnalysis.map(stat => stat.prevalence),
        backgroundColor: ['#34d399', '#f87171', '#fbbf24'], // Original colors preserved
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const prevalenceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: '#d1d5db' } }, tooltip: { enabled: true } },
    cutout: '50%',
  };

  // Global Prevalence Data (WHO Mental Health Atlas 2020 & Our World in Data)
  const globalStats = {
    totalAffected: 970, // million (WHO, 2019)
    depressionPrevalence: 3.8, // % globally (WHO)
    anxietyPrevalence: 3.9, // % globally (WHO)
    suicideRate: 9, // per 100,000 (WHO, 2022)
    disabilityYears: 13, // % of total DALYs (Our World in Data)
  };

  // Severity Bar Chart (User Analysis)
  const severityData = {
    labels: mockUserAnalysis.map(stat => stat.condition),
    datasets: [
      {
        label: 'Severity Score',
        data: mockUserAnalysis.map(stat => stat.severity),
        backgroundColor: 'rgba(99, 102, 241, 0.8)', // Original color preserved
        borderColor: '#6366f1', // Original color preserved
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const severityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  // Trend Line Chart (User Analysis)
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: mockUserAnalysis.map(stat => ({
      label: stat.condition,
      data: stat.trend,
      fill: false,
      borderColor: stat.condition === 'Depression' ? '#34d399' : stat.condition === 'Anxiety' ? '#f87171' : '#fbbf24', // Original colors preserved
      tension: 0.4,
    })),
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const, labels: { color: '#d1d5db' } }, tooltip: { enabled: true } },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  // Personalized Insights Polar Area Chart (replacing Model Confidence)
  const personalizedInsightsData = {
    labels: ['Mood Stability', 'Stress Triggers', 'Sleep Impact', 'Social Connection'],
    datasets: [
      {
        data: [85, 70, 60, 90], // Example user-specific scores
        backgroundColor: ['rgba(34, 211, 153, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(139, 92, 246, 0.7)'], // Original colors preserved
        borderColor: ['#34d399', '#3b82f6', '#f59e0b', '#8b5cf6'], // Original colors preserved
        borderWidth: 1,
      },
    ],
  };

  const polarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: '#d1d5db' } }, tooltip: { enabled: true } },
    scales: { r: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.2)' } } },
  };

  return (
    <main className="relative min-h-screen">
      {/* Seamless Background matching Therapists page */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${sageTheme.light}20, ${sageTheme.dark}20 50%, transparent 80%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-10 pt-40 md:pt-48 lg:pt-56 relative z-10">
        {/* Mental Health Insights Hub */}
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          >
            Reports & Insights
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            A personalized continuation of your mental health analysis, integrating your data with broader trends and insights.
          </p>
          <motion.div variants={container} initial="hidden" animate="show" className="mt-12">
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Your Prevalence</h3>
                <div className="h-64">
                  <Doughnut data={userPrevalenceData} options={prevalenceOptions} />
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Your Severity</h3>
                <div className="h-64">
                  <Bar data={severityData} options={severityOptions} />
                </div>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Your Trends</h3>
                <div className="h-64">
                  <Line data={trendData} options={trendOptions} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Global Stats Currently */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M12 14v.01" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Global Stats Currently</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Global Figures</h3>
                  <p className="text-gray-300">Based on WHO Mental Health Atlas 2020 and Our World in Data (2019-2022):</p>
                  <ul className="space-y-4 text-gray-300">
                    <li><strong>{globalStats.totalAffected} million</strong> people globally live with a mental disorder.</li>
                    <li><strong>{globalStats.depressionPrevalence}%</strong> of the world population has depression.</li>
                    <li><strong>{globalStats.anxietyPrevalence}%</strong> experience anxiety disorders.</li>
                    <li><strong>{globalStats.suicideRate}</strong> suicides per 100,000 people annually.</li>
                    <li><strong>{globalStats.disabilityYears}%</strong> of global disability-adjusted life years (DALYs) due to mental health.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Data Sources</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li><a href="https://www.who.int/data" className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>WHO Data Portal</a> - Global health statistics.</li>
                    <li><a href="https://ourworldindata.org/mental-health" className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>Our World in Data</a> - Mental health trends.</li>
                    <li><a href="https://www.nhs.uk/mental-health" className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>NHS Mental Health Hub</a> - UK data and resources.</li>
                    <li><a href="https://www.samhsa.gov/data" className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>SAMHSA</a> - U.S. mental health data.</li>
                    <li><a href="https://mentalstateoftheworld.report" className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>Sapien Labs</a> - Mental State Report.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Condition Distribution (Replaced Prevalence Overview) */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Condition Distribution</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Your Condition Breakdown</h3>
                  <div className="h-72">
                    <Doughnut data={userPrevalenceData} options={prevalenceOptions} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Analysis</h3>
                  <p className="text-gray-300">Your data shows a higher distribution of anxiety (22%) compared to global averages (3.9%), suggesting localized stressors. Depression aligns more closely with global norms, while PTSD is less prevalent but notable.</p>
                  <p className="text-gray-400 text-sm">Source: WHO Mental Health Atlas 2020</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Severity & Trends */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Severity & Trends</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Average Severity</h3>
                <div className="h-72">
                  <Bar data={severityData} options={severityOptions} />
                </div>
                <p className="text-gray-400 text-sm mt-4">PTSD shows higher severity, often linked to trauma exposure.</p>
              </motion.div>
              <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">6-Month Trends</h3>
                <div className="h-72">
                  <Line data={trendData} options={trendOptions} />
                </div>
                <p className="text-gray-400 text-sm mt-4">Anxiety trends upward, possibly tied to recent stressors.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Personalized Insights (Replaced AI Model Insights) */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Personalized Insights</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Your Wellness Factors</h3>
                  <div className="h-72">
                    <PolarArea data={personalizedInsightsData} options={polarOptions} />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Takeaways</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li><strong>Mood Stability (85%):</strong> Consistent mood patterns suggest effective coping strategies.</li>
                    <li><strong>Stress Triggers (70%):</strong> Moderate impact; consider identifying specific triggers.</li>
                    <li><strong>Sleep Impact (60%):</strong> Sleep may be a weak point—explore rest improvement.</li>
                    <li><strong>Social Connection (90%):</strong> Strong social ties support your resilience.</li>
                  </ul>
                  <p className="text-gray-400 text-sm">Based on your tracked data over 6 months.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Knowledge Hub */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Knowledge Hub</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Understanding Depression</h3>
                <p className="text-gray-300">Affects 280 million people globally. Symptoms include persistent sadness and loss of interest.</p>
                <p className="text-gray-400 text-sm mt-2">Source: WHO</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Managing Anxiety</h3>
                <p className="text-gray-300">Impacts 301 million worldwide. Coping includes mindfulness and therapy.</p>
                <p className="text-gray-400 text-sm mt-2">Source: WHO</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">PTSD Awareness</h3>
                <p className="text-gray-300">Severe cases linked to trauma; affects 3.9% of people at some point.</p>
                <p className="text-gray-400 text-sm mt-2">Source: Our World in Data</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Risk Factors */}
        <section className="mb-20">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938-5.978A9 9 0 1112 21a9 9 0 01-6.938-15.978z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-3">Risk Factors</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Key Contributors</h3>
              <p className="text-gray-300">Poverty, violence, and inequality increase mental health risks by up to 40% in vulnerable populations.</p>
              <p className="text-gray-300 mt-2">Globally, severe conditions reduce life expectancy by 10-20 years due to comorbidities and suicide risk.</p>
              <p className="text-gray-400 text-sm mt-4">Source: WHO Mental Health Action Plan 2013–2030</p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}