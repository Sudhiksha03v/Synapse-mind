'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  location: string;
  availability: string[];
}

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch('/api/therapists');
        if (!response.ok) throw new Error('Failed to fetch therapists');
        const data: Therapist[] = await response.json();
        setTherapists(data);
      } catch (error) {
        console.error('Error fetching therapists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">Find a Therapist</h1>

      {loading ? (
        <p className="text-gray-300">Loading therapists...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-gray-800/80 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-white">
                {therapist.name}
              </h2>
              <p className="text-gray-300">Specialty: {therapist.specialty}</p>
              <p className="text-gray-300">Location: {therapist.location}</p>
              <p className="text-gray-300">
                Availability: {therapist.availability.join(', ')}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </main>
  );
}