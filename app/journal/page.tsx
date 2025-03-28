'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface JournalEntry {
  id: number;
  date: string;
  content: string;
  mood: string;
}

interface ProgressData {
  moodTrend: { date: string; score: number }[];
  journalCount: number;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('');
  const [progress] = useState<ProgressData>({
    moodTrend: [],
    journalCount: 0,
  });

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim() || !mood) return;

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newEntry, mood }),
      });

      if (!response.ok) throw new Error('Failed to save entry');

      const savedEntry: JournalEntry = await response.json();
      setEntries((prev) => [...prev, savedEntry]);
      setNewEntry('');
      setMood('');
    } catch (error: unknown) {
      console.error('Error adding journal entry:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to save entry: ${errorMessage}`);
    }
  };

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">Your Journal</h1>

      <motion.div
        className="bg-gray-800/80 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <form onSubmit={handleAddEntry} className="space-y-6">
          <div>
            <label htmlFor="entry" className="text-white font-medium">
              New Entry
            </label>
            <textarea
              id="entry"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-700 text-white rounded-lg"
              rows={5}
            />
          </div>
          <div>
            <label htmlFor="mood" className="text-white font-medium">
              Mood
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-700 text-white rounded-lg"
            >
              <option value="">Select Mood</option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Anxious">Anxious</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-full"
          >
            Add Entry
          </button>
        </form>
      </motion.div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Recent Entries</h2>
        {entries.map((entry) => (
          <div key={entry.id} className="bg-gray-700/50 p-4 rounded-lg mb-4">
            <p className="text-gray-300">{entry.date}</p>
            <p className="text-white">{entry.content}</p>
            <p className="text-gray-400">Mood: {entry.mood}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Progress</h2>
        <p className="text-gray-300">Total Journals: {progress.journalCount}</p>
      </div>
    </main>
  );
}