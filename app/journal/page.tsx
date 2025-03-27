'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Define sage green theme colors
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

interface MoodEntry {
  date: string;
  mood: number; // 1-10 scale
  notes: string;
  triggers?: string[];
}

interface TreatmentProgress {
  type: string;
  duration: string;
  effectiveness: number; // 0-100
  notes: string;
}

interface HealingGoal {
  goal: string;
  completed: boolean;
  dateSet: string;
}

const mockMoodEntries: MoodEntry[] = [
  { date: '2025-03-20', mood: 4, notes: 'Felt low after a tough day.', triggers: ['Work stress'] },
  { date: '2025-03-21', mood: 5, notes: 'Slightly better, tried meditation.', triggers: ['Fatigue'] },
  { date: '2025-03-22', mood: 7, notes: 'Good day, therapy helped.', triggers: [] },
  { date: '2025-03-23', mood: 6, notes: 'Stable, exercised.', triggers: ['Social anxiety'] },
  { date: '2025-03-24', mood: 8, notes: 'Positive, connected with friends.', triggers: [] },
];

const mockTreatmentProgress: TreatmentProgress[] = [
  { type: 'Cognitive Behavioral Therapy (CBT)', duration: '3 months', effectiveness: 75, notes: 'Improved thought patterns.' },
  { type: 'Medication (SSRI)', duration: '2 months', effectiveness: 60, notes: 'Reduced anxiety slightly.' },
  { type: 'Mindfulness Practice', duration: '1 month', effectiveness: 50, notes: 'Helped with focus.' },
];

const mockHealingGoals: HealingGoal[] = [
  { goal: 'Meditate 10 minutes daily', completed: false, dateSet: '2025-03-20' },
  { goal: 'Exercise 3 times this week', completed: true, dateSet: '2025-03-21' },
];

export default function Journal(): JSX.Element {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [newMood, setNewMood] = useState<number>(5);
  const [newNotes, setNewNotes] = useState<string>('');
  const [newTriggers, setNewTriggers] = useState<string[]>([]);
  const [treatmentProgress, setTreatmentProgress] = useState<TreatmentProgress[]>(mockTreatmentProgress);
  const [healingGoals, setHealingGoals] = useState<HealingGoal[]>(mockHealingGoals);
  const [newGoal, setNewGoal] = useState<string>('');
  const [reflection, setReflection] = useState<string>('');
  const [showAllTriggers, setShowAllTriggers] = useState<boolean>(false);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  // Mood Trend Line Chart (unchanged colors)
  const moodTrendData = {
    labels: moodEntries.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Score',
        data: moodEntries.map(entry => entry.mood),
        fill: false,
        borderColor: '#34d399',
        backgroundColor: '#34d399',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const moodTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#d1d5db' } },
      tooltip: { enabled: true, callbacks: { label: (context: any) => `Mood: ${context.raw} - ${moodEntries[context.dataIndex].notes}` } },
    },
    scales: {
      y: { min: 1, max: 10, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  // Improved Triggers Bar Chart (sage green colors)
  const allTriggers = Array.from(
    new Set(moodEntries.flatMap(entry => entry.triggers || []))
  ).map(trigger => ({
    trigger,
    frequency: moodEntries.filter(e => e.triggers?.includes(trigger)).length,
  })).sort((a, b) => b.frequency - a.frequency);

  const topTriggers = allTriggers.slice(0, 5); // Top 5 triggers

  const triggerData = {
    labels: topTriggers.map(t => t.trigger),
    datasets: [
      {
        label: 'Trigger Frequency',
        data: topTriggers.map(t => t.frequency),
        backgroundColor: sageTheme.medium, // Sage green medium
        borderColor: sageTheme.dark, // Sage green dark
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: sageTheme.dark, // Darker sage green on hover
      },
    ],
  };

  const triggerOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const totalEntries = moodEntries.length;
            const frequency = context.raw;
            const percentage = ((frequency / totalEntries) * 100).toFixed(1);
            return `${context.label}: ${frequency} times (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#d1d5db' }, grid: { color: 'rgba(209, 213, 219, 0.1)' } },
      x: { ticks: { color: '#d1d5db' }, grid: { display: false } },
    },
  };

  // Insight Summary
  const mostFrequentTrigger = allTriggers[0];
  const lowMoodEntries = moodEntries.filter(e => e.mood < 4).length;
  const lowMoodWithTopTrigger = moodEntries.filter(e => e.mood < 4 && e.triggers?.includes(mostFrequentTrigger?.trigger)).length;
  const topTriggerImpact = lowMoodEntries > 0 ? ((lowMoodWithTopTrigger / lowMoodEntries) * 100).toFixed(1) : 0;

  const handleAddMood = () => {
    const today = new Date().toISOString().split('T')[0];
    setMoodEntries([...moodEntries, { date: today, mood: newMood, notes: newNotes, triggers: newTriggers }]);
    setNewMood(5);
    setNewNotes('');
    setNewTriggers([]);
  };

  const handleToggleTrigger = (trigger: string) => {
    setNewTriggers(prev =>
      prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
    );
  };

  const handleAddGoal = () => {
    const today = new Date().toISOString().split('T')[0];
    setHealingGoals([...healingGoals, { goal: newGoal, completed: false, dateSet: today }]);
    setNewGoal('');
  };

  const handleToggleGoal = (index: number) => {
    const updatedGoals = [...healingGoals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setHealingGoals(updatedGoals);
  };

  return (
    <main className="relative min-h-screen">
      {/* Seamless Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${sageTheme.light}20, ${sageTheme.dark}20 50%, transparent 80%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-10 pt-40 md:pt-48 lg:pt-56 relative z-10">
        {/* Header */}
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white bg-clip-text"
            style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.light}, ${sageTheme.dark})` }}
          >
            Your Healing Journal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            A sanctuary for tracking your moods, treatments, goals, and reflections to foster healing and resilience.
          </p>
        </section>

        {/* Journal Sections */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Mood Tracker */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Mood Tracker</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Mood Trend</h3>
                  <div className="h-72">
                    <Line data={moodTrendData} options={moodTrendOptions} />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Log Your Mood</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300">Mood (1-10):</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newMood}
                        onChange={(e) => setNewMood(parseInt(e.target.value))}
                        className="w-full mt-2 accent-sage-500"
                        style={{ accentColor: sageTheme.medium }}
                      />
                      <p className="text-gray-400 text-sm">{newMood} - {newMood < 4 ? 'Low' : newMood < 7 ? 'Moderate' : 'High'}</p>
                    </div>
                    <div>
                      <label className="text-gray-300">Triggers:</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Work Stress', 'Fatigue', 'Social Anxiety', 'Other'].map(trigger => (
                          <button
                            key={trigger}
                            onClick={() => handleToggleTrigger(trigger)}
                            className={`px-3 py-1 rounded-full text-sm ${newTriggers.includes(trigger) ? `bg-[${sageTheme.medium}] text-white` : 'bg-gray-700/50 text-gray-300'} hover:bg-[${sageTheme.dark}] transition-all`}
                            style={{
                              backgroundColor: newTriggers.includes(trigger) ? sageTheme.medium : undefined,
                              color: newTriggers.includes(trigger) ? '#fff' : undefined,
                            }}
                          >
                            {trigger}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-300">Notes:</label>
                      <textarea
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                        className="w-full mt-2 p-2 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-[#A9BA9D]"
                        rows={3}
                        placeholder="What happened today?"
                      />
                    </div>
                    <button
                      onClick={handleAddMood}
                      className="w-full py-2 text-white font-semibold rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all"
                      style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.medium}, ${sageTheme.dark})` }}
                    >
                      Add Entry
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Entries</h3>
                  <div className="space-y-4 max-h-40 overflow-y-auto">
                    {moodEntries.slice(-3).reverse().map((entry, idx) => (
                      <div key={idx} className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-gray-300"><strong>{entry.date}:</strong> Mood {entry.mood}/10</p>
                        <p className="text-gray-400 text-sm">{entry.notes}</p>
                        {entry.triggers && entry.triggers.length > 0 && (
                          <p className="text-gray-400 text-sm">Triggers: {entry.triggers.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Trigger Insights</h3>
                  <div className="h-48">
                    <Bar data={triggerData} options={triggerOptions} />
                  </div>
                  {allTriggers.length > 0 && (
                    <p className="text-gray-300 text-sm mt-4">
                      {`"${mostFrequentTrigger.trigger}" is your most frequent trigger, appearing ${mostFrequentTrigger.frequency} time(s) and linked to ${topTriggerImpact}% of low-mood days (<4/10).`}
                    </p>
                  )}
                  {allTriggers.length > 5 && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowAllTriggers(!showAllTriggers)}
                        className="text-[#A9BA9D] text-sm hover:underline"
                        style={{ color: sageTheme.light }}
                      >
                        {showAllTriggers ? 'Hide All Triggers' : 'Show All Triggers'}
                      </button>
                      {showAllTriggers && (
                        <ul className="mt-2 space-y-2 text-gray-300 text-sm max-h-32 overflow-y-auto">
                          {allTriggers.map((t, idx) => (
                            <li key={idx}>{`${t.trigger}: ${t.frequency} time(s)`}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Treatment Progress */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Treatment Progress</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Your Treatment Journey</h3>
              <div className="space-y-6">
                {treatmentProgress.map((treatment, idx) => (
                  <div key={idx} className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{treatment.type}</span>
                      <span className="text-gray-400 text-sm">{treatment.duration}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{ width: `${treatment.effectiveness}%`, backgroundColor: sageTheme.medium }}
                      ></div>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">Effectiveness: {treatment.effectiveness}%</p>
                    <p className="text-gray-400 text-sm mt-1">{treatment.notes}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-6">
                Evidence-based treatments like CBT show 60-80% success rates for anxiety and depression (NIMH). Track your progress to optimize your healing.
              </p>
            </motion.div>
          </section>

          {/* Healing Goals */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Healing Goals</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Set a New Goal</h3>
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="w-full p-2 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-[#A9BA9D]"
                    placeholder="e.g., Meditate daily"
                  />
                  <button
                    onClick={handleAddGoal}
                    className="w-full mt-4 py-2 text-white font-semibold rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all"
                    style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.medium}, ${sageTheme.dark})` }}
                  >
                    Add Goal
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Your Goals</h3>
                  <div className="space-y-4 max-h-40 overflow-y-auto">
                    {healingGoals.map((goal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <span className={`text-white ${goal.completed ? 'line-through text-gray-400' : ''}`}>{goal.goal}</span>
                        <button
                          onClick={() => handleToggleGoal(idx)}
                          className={`px-2 py-1 rounded-full text-sm ${goal.completed ? 'bg-green-500' : 'bg-gray-600'} text-white`}
                        >
                          {goal.completed ? 'Undo' : 'Done'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-6">Setting small, achievable goals boosts recovery rates by 20% (APA).</p>
            </motion.div>
          </section>

          {/* Healing Strategies */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 9.143l-5.714 2.714L13 21l-2.286-6.857L5 11.143l5.714-2.714L13 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Healing Strategies</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Mindfulness</h3>
                <p className="text-gray-300">Daily meditation reduces cortisol levels by 30%, easing stress (APA, 2020).</p>
                <a href="https://www.headspace.com" className="text-[#A9BA9D] text-sm mt-2 block hover:underline" style={{ color: sageTheme.light }}>Try Headspace</a>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Physical Activity</h3>
                <p className="text-gray-300">30 minutes of exercise 3x/week lifts mood in 75% of cases (Mayo Clinic).</p>
                <a href="https://www.nhs.uk/live-well/exercise" className="text-[#A9BA9D] text-sm mt-2 block hover:underline" style={{ color: sageTheme.light }}>NHS Guide</a>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Social Support</h3>
                <p className="text-gray-300">Regular connection cuts depression risk by 20% (NIMH).</p>
                <a href="https://www.mind.org.uk" className="text-[#A9BA9D] text-sm mt-2 block hover:underline" style={{ color: sageTheme.light }}>Mind UK</a>
              </div>
            </motion.div>
            <p className="text-gray-400 text-sm mt-6 text-center">Integrate these strategies into your routine for holistic healing.</p>
          </section>

          {/* Reflection & Growth */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Reflection & Growth</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Your Weekly Reflection</h3>
              <p className="text-gray-300">Reflect on your progress. Journaling boosts mental clarity by 25% and aids emotional processing (APA, 2019).</p>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full mt-4 p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-[#A9BA9D]"
                rows={6}
                placeholder="What worked this week? What can you improve?"
              />
              <button
                onClick={() => alert('Reflection saved! (Implement storage here)') }
                className="mt-4 py-2 px-4 text-white font-semibold rounded-lg hover:from-sage-600 hover:to-sage-700 transition-all"
                style={{ backgroundImage: `linear-gradient(to right, ${sageTheme.medium}, ${sageTheme.dark})` }}
              >
                Save Reflection
              </button>
              <p className="text-gray-400 text-sm mt-4">Saved reflections can guide your next steps in therapy or self-care.</p>
            </motion.div>
          </section>

          {/* Quick Tips */}
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-10">
              <div
                className="p-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${sageTheme.light}4D, ${sageTheme.dark}4D)` }}
              >
                <svg className="w-7 h-7" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-white ml-4">Quick Tips</h2>
            </motion.div>
            <motion.div variants={item} className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <ul className="space-y-4 text-gray-300">
                <li><strong>Breathe Deeply:</strong> 4-7-8 breathing reduces anxiety in minutes (Harvard Health).</li>
                <li><strong>Hydrate:</strong> Dehydration worsens mood; aim for 8 cups daily (Mayo Clinic).</li>
                <li><strong>Sleep Well:</strong> 7-9 hours nightly improves resilience by 30% (NIMH).</li>
                <li><strong>Limit Screen Time:</strong> Less than 2 hours daily boosts focus (APA).</li>
              </ul>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}