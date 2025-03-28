'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Sage green theme colors
const sageTheme = {
  light: '#A9BA9D', // Sage 400
  medium: '#8A9A7E', // Sage 500
  dark: '#6B7A5F', // Sage 600
};

// Define Therapist interface
interface Therapist {
  name: string;
  location: string;
  specialty: string;
  bio: string;
  contact: string;
  credentials: string;
}

// Therapist data structured by region
const therapistsData: Record<string, Therapist[]> = {
  hyderabad: [
    {
      name: 'Dr. Priya Sharma, PhD',
      location: 'Hyderabad, Telangana',
      specialty: 'Cognitive Behavioral Therapy (CBT), Anxiety Management',
      bio: 'With over 10 years of experience, Dr. Sharma provides evidence-based therapy to address anxiety and stress for Hyderabad residents.',
      contact: 'priya.sharma@example.com',
      credentials: 'PhD in Clinical Psychology, Licensed Therapist',
    },
    {
      name: 'Ms. Anjali Rao, MA',
      location: 'Hyderabad, Telangana',
      specialty: 'Mindfulness-Based Therapy, Couples Counseling',
      bio: 'Ms. Rao specializes in mindfulness techniques and relationship counseling, serving clients in Hyderabad’s professional community.',
      contact: 'anjali.rao@example.com',
      credentials: 'MA in Counseling Psychology, Certified Mindfulness Practitioner',
    },
  ],
  surrounding: [
    {
      name: 'Dr. Vikram Patel, MD',
      location: 'Secunderabad, Telangana',
      specialty: 'Trauma-Informed Care, PTSD Treatment',
      bio: 'Dr. Patel offers specialized care for trauma and PTSD, supporting clients in Secunderabad and nearby areas.',
      contact: 'vikram.patel@example.com',
      credentials: 'MD in Psychiatry, Trauma Specialist Certification',
    },
    {
      name: 'Ms. Lakshmi Nair, MSW',
      location: 'Warangal, Telangana',
      specialty: 'Depression Treatment, Family Therapy',
      bio: 'Ms. Nair provides compassionate therapy for depression and family issues to the Warangal community.',
      contact: 'lakshmi.nair@example.com',
      credentials: 'Master of Social Work, Licensed Family Therapist',
    },
    {
      name: 'Mr. Ravi Kumar, MSc',
      location: 'Nizamabad, Telangana',
      specialty: 'Stress Management, Workplace Wellness',
      bio: 'Mr. Kumar focuses on stress reduction and workplace mental health for clients in Nizamabad and surrounding regions.',
      contact: 'ravi.kumar@example.com',
      credentials: 'MSc in Psychology, Workplace Wellness Consultant',
    },
  ],
  india: [
    {
      name: 'Dr. Sanjay Gupta, MD',
      location: 'Bengaluru, Karnataka',
      specialty: 'Addiction Therapy, Behavioral Health',
      bio: 'Dr. Gupta offers virtual and in-person addiction therapy, extending services to clients across India.',
      contact: 'sanjay.gupta@example.com',
      credentials: 'MD in Psychiatry, Addiction Specialist',
    },
    {
      name: 'Ms. Aisha Khan, MA',
      location: 'Delhi, India',
      specialty: 'Child and Adolescent Therapy',
      bio: 'Ms. Khan provides expert care for children and teens, available online to clients nationwide.',
      contact: 'aisha.khan@example.com',
      credentials: 'MA in Child Psychology, Certified Adolescent Counselor',
    },
  ],
  global: [
    {
      name: 'Dr. Emily Chen, PsyD',
      location: 'Singapore (Online)',
      specialty: 'Cross-Cultural Therapy, Expatriate Support',
      bio: 'Dr. Chen delivers online therapy tailored to expatriates and diverse populations, accessible globally.',
      contact: 'emily.chen@example.com',
      credentials: 'PsyD in Clinical Psychology, Cross-Cultural Specialist',
    },
    {
      name: 'Mr. James Carter, LPC',
      location: 'London, UK (Online)',
      specialty: 'Grief Counseling, Life Transitions',
      bio: 'Mr. Carter offers virtual grief counseling and support for life changes to clients worldwide.',
      contact: 'james.carter@example.com',
      credentials: 'Licensed Professional Counselor, Grief Therapy Certification',
    },
  ],
};

const Therapists = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<{ region: string; index: number } | null>(null);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  const renderTherapistCard = (therapist: Therapist, region: string, index: number) => (
    <motion.div
      key={`${region}-${index}`}
      variants={item}
      className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={() => setSelectedTherapist(selectedTherapist?.region === region && selectedTherapist?.index === index ? null : { region, index })}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{therapist.name}</h3>
      <p className="text-gray-300 text-sm mb-1">{therapist.location}</p>
      <p className="text-gray-400 text-sm mb-2">{therapist.specialty}</p>
      <p className="text-gray-300 text-sm mb-4">{therapist.bio}</p>
      {selectedTherapist?.region === region && selectedTherapist?.index === index && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-400 text-sm mb-2">Credentials: {therapist.credentials}</p>
          <p className="text-gray-400 text-sm">
            Contact: <a href={`mailto:${therapist.contact}`} className="text-[#A9BA9D] hover:underline" style={{ color: sageTheme.light }}>{therapist.contact}</a>
          </p>
        </motion.div>
      )}
      <button
        className="w-full py-2 mt-2 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-opacity-90"
        style={{ backgroundColor: sageTheme.medium }}
      >
        {selectedTherapist?.region === region && selectedTherapist?.index === index ? 'Close Details' : 'View Details'}
      </button>
    </motion.div>
  );

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
            Our Therapists
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Connect with qualified therapists in Hyderabad, surrounding regions, across India, and globally to support your mental health needs.
          </p>
        </section>

        <motion.div variants={container} initial="hidden" animate="show">
          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-8">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-6 h-6" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white ml-3">Therapists Near You</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {therapistsData.hyderabad.map((therapist, index) => renderTherapistCard(therapist, 'hyderabad', index))}
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-8">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-6 h-6" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white ml-3">Surrounding Regions</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {therapistsData.surrounding.map((therapist, index) => renderTherapistCard(therapist, 'surrounding', index))}
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-8">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-6 h-6" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white ml-3">Across India</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {therapistsData.india.map((therapist, index) => renderTherapistCard(therapist, 'india', index))}
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div variants={item} className="flex items-center justify-center mb-8">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${sageTheme.light}33` }}>
                <svg className="w-6 h-6" style={{ color: sageTheme.light }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium text-white ml-3">Global Network</h2>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {therapistsData.global.map((therapist, index) => renderTherapistCard(therapist, 'global', index))}
            </motion.div>
          </section>

          <section className="text-center mb-20">
            <motion.div variants={item}>
              <h3 className="text-2xl font-medium text-white mb-4">Get Started Today</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Our network of licensed therapists is here to provide professional support tailored to your needs, whether you’re in Hyderabad or anywhere in the world.
              </p>
              <button
                className="py-3 px-6 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-opacity-90"
                style={{ backgroundColor: sageTheme.medium }}
              >
                Contact a Therapist
              </button>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default Therapists;